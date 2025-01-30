'use server';

import {
    AuthenticationResponseJSON,
    generateAuthenticationOptions,
    GenerateAuthenticationOptionsOpts,
    generateRegistrationOptions,
    GenerateRegistrationOptionsOpts,
    RegistrationResponseJSON,
    verifyAuthenticationResponse,
    VerifyAuthenticationResponseOpts,
    verifyRegistrationResponse,
    VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import {getCurrentSession, updateCurrentSession} from './session';
import {isoBase64URL} from '@simplewebauthn/server/helpers';
import {createUser, findUser, findUserWithPasskeys, getPasskeyWithUserId} from "@/app/lib/data";
import {PasskeySerialized} from "@/app/lib/definitions";

const RP_NAME = 'Techwear Shop';
const RP_ID = process.env.NODE_ENV === 'production' ? process.env.VERCEL_URL ?? 'techwear-shop-nextjs.vercel.app' : 'localhost';
const ORIGIN = process.env.NODE_ENV === 'production' ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const generateWebAuthnRegistrationOptions = async (username: string) => {
    const user = await findUser(username);

    if (user) {
        return {
            success: false,
            message: 'User already exists',
        };
    }

    const opts: GenerateRegistrationOptionsOpts = {
        rpName: RP_NAME,
        rpID: RP_ID,
        userID: new TextEncoder().encode(username),
        userName: username,
        timeout: 60000,
        attestationType: 'none',
        excludeCredentials: [],
        authenticatorSelection: {
            residentKey: 'discouraged',
        },
        /**
         * Support the two most common algorithms: ES256, and RS256
         */
        supportedAlgorithmIDs: [-7, -257],
    };

    const options = await generateRegistrationOptions(opts);

    await updateCurrentSession({ currentChallenge: options.challenge, username });

    return {
        success: true,
        data: options,
    };
};

export const verifyWebAuthnRegistration = async (data: RegistrationResponseJSON) => {
    const {
        data: { username, currentChallenge },
    } = await getCurrentSession();

    if (!username || !currentChallenge) {
        return {
            success: false,
            message: 'Session expired',
        };
    }

    const opts: VerifyRegistrationResponseOpts = {
        response: data,
        expectedChallenge: `${currentChallenge}`,
        expectedOrigin: ORIGIN,
        expectedRPID: RP_ID,
        requireUserVerification: false,
    };
    const verification = await verifyRegistrationResponse(opts);

    const { verified, registrationInfo } = verification;

    if (!verified || !registrationInfo) {
        return {
            success: false,
            message: 'Registration failed',
        };
    }

    const { credential } = registrationInfo;

    console.log(credential);

    /**
     * Add the returned device to the user's list of devices
     */
    const newDevice: PasskeySerialized = {
        cred_public_key: isoBase64URL.fromBuffer(credential.publicKey),
        cred_id: credential.id,
        counter: credential.counter,
        backup_status: false,
        backup_eligible: false,
        transports: data.response.transports || [],
    };

    await updateCurrentSession({});

    try {
        await createUser(username, newDevice);
    } catch {
        return {
            success: false,
            message: 'User already exists',
        };
    }

    return {
        success: true,
    };
};

export const generateWebAuthnLoginOptions = async (username: string) => {
    const user = await findUserWithPasskeys(username);

    if (!user) {
        return {
            success: false,
            message: 'User does not exist',
        };
    }

    const opts: GenerateAuthenticationOptionsOpts = {
        timeout: 60000,
        allowCredentials: Array.from(user.passkeys.entries()).map(([, value]) => ({
            id: value.cred_id,
            transports: value.transports.map((t) => t.toString() as 'usb' | 'nfc' | 'ble' | 'internal'),
            type: 'public-key',
            publicKey: value.cred_public_key,
        })),
        userVerification: 'required',
        rpID: RP_ID,
    };
    const options = await generateAuthenticationOptions(opts);

    await updateCurrentSession({ currentChallenge: options.challenge, username });

    return {
        success: true,
        data: options,
    };
};

export const verifyWebAuthnLogin = async (data: AuthenticationResponseJSON) => {
    const {
        data: { username, currentChallenge },
    } = await getCurrentSession();

    if (!username || !currentChallenge) {
        return {
            success: false,
            message: 'Session expired',
        };
    }

    const user = await findUser(username);

    if (!user) {
        return {
            success: false,
            message: 'User does not exist',
        };
    }

    const dbAuthenticator = await getPasskeyWithUserId(data.rawId, user.id)

    if (!dbAuthenticator) {
        return {
            success: false,
            message: 'Authenticator is not registered with this site',
        };
    }

    const opts: VerifyAuthenticationResponseOpts = {
        response: data,
        expectedChallenge: `${currentChallenge}`,
        expectedOrigin: ORIGIN,
        expectedRPID: RP_ID,
        credential: {
            id: dbAuthenticator.cred_id,
            publicKey: isoBase64URL.toBuffer(dbAuthenticator.cred_public_key),
            counter: dbAuthenticator.counter
        },
        requireUserVerification: true,
    };
    const verification = await verifyAuthenticationResponse(opts);

    await updateCurrentSession({});

    return {
        success: verification.verified,
    };
};
