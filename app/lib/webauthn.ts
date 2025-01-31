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
import {deleteCurrentSession, getCurrentSession, updateCurrentSession} from './session';
import {isoBase64URL} from '@simplewebauthn/server/helpers';
import {createUser, findUser, findUserWithPasskeys, getPasskeyWithUserId} from "@/app/lib/data";
import {PasskeySerialized} from "@/app/lib/definitions";

const RP_NAME = 'Techwear Shop';

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
        rpID: process.env.RP_ID || 'localhost',
        userID: new TextEncoder().encode(username),
        userName: username,
        timeout: 60000,
        attestationType: 'none',
        excludeCredentials: [],
        authenticatorSelection: {
            residentKey: 'discouraged',
            // authenticatorAttachment: 'cross-platform',
            // userVerification: 'discouraged'
        },
        /**
         * Ed25519, ES256, and RS256
         */
        supportedAlgorithmIDs: [6, -7, -257],
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
        expectedOrigin: process.env.ORIGIN || `http://localhost:3000`,
        expectedRPID: process.env.RP_ID || 'localhost',
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

    const newDevice: PasskeySerialized = {
        cred_public_key: isoBase64URL.fromBuffer(credential.publicKey),
        cred_id: credential.id,
        counter: credential.counter,
        backup_status: false,
        backup_eligible: false,
        transports: data.response.transports || [],
    };

    await deleteCurrentSession();

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
        // userVerification: 'discouraged',
        rpID: process.env.RP_ID || 'localhost',
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
        expectedOrigin: process.env.ORIGIN || `http://localhost:3000`,
        expectedRPID: process.env.RP_ID || 'localhost',
        credential: {
            id: dbAuthenticator.cred_id,
            publicKey: isoBase64URL.toBuffer(dbAuthenticator.cred_public_key),
            counter: dbAuthenticator.counter
        },
        requireUserVerification: true,
        // requireUserVerification: false,
    };
    const verification = await verifyAuthenticationResponse(opts);

    await deleteCurrentSession();

    return {
        success: verification.verified,
    };
};
