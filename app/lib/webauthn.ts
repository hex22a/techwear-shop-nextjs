'use server';

import {
    AuthenticationResponseJSON, AuthenticatorTransportFuture,
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
import {
    deleteCurrentWebauthnSession,
    getCurrentWebauthnSession,
    updateCurrentWebauthnSession
} from './session';
import {isoBase64URL} from '@simplewebauthn/server/helpers';
import {createUser, findUser, findUserWithPasskeys, getPasskeyWithUserId} from "@/app/lib/data";
import {PasskeySerialized} from "@/app/lib/definitions";

const RP_NAME = 'Techwear Shop';
const RP_ID = process.env.RP_ID || 'localhost';
const USER_VERIFICATION_MODE = 'preferred';
const ORIGIN = process.env.ORIGIN || `http://localhost:3000`;

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
            authenticatorAttachment: 'platform',
            userVerification: USER_VERIFICATION_MODE
        },
        /**
         * Ed25519, ES256, and RS256
         */
        supportedAlgorithmIDs: [6, -7, -257],
    };

    const options = await generateRegistrationOptions(opts);

    await updateCurrentWebauthnSession({ currentChallenge: options.challenge, username });

    return {
        success: true,
        data: options,
    };
};

export const verifyWebAuthnRegistration = async (data: RegistrationResponseJSON) => {
    const {
        data: { username, currentChallenge },
    } = await getCurrentWebauthnSession();

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

    const newDevice: PasskeySerialized = {
        cred_public_key: isoBase64URL.fromBuffer(credential.publicKey),
        cred_id: credential.id,
        counter: credential.counter,
        backup_status: false,
        backup_eligible: false,
        transports: data.response.transports || [],
    };

    await deleteCurrentWebauthnSession();

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

export type WebAuthnResponse = {
    success: boolean;
    message?: string;
    data?: PublicKeyCredentialRequestOptionsJSON
}

export const generateWebAuthnLoginOptions = async (username: string): Promise<WebAuthnResponse> => {
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
            transports: value.transports.map((t): AuthenticatorTransportFuture => t.toString() as 'usb' | 'nfc' | 'ble' | 'internal'),
        })),
        userVerification: USER_VERIFICATION_MODE,
        rpID: RP_ID,
    };
    const options: PublicKeyCredentialRequestOptionsJSON = await generateAuthenticationOptions(opts);

    await updateCurrentWebauthnSession({ currentChallenge: options.challenge, username });

    return {
        success: true,
        data: options,
    };
};

export const verifyWebAuthnLogin = async (data: AuthenticationResponseJSON) => {
    const {
        data: { username, currentChallenge },
    } = await getCurrentWebauthnSession();

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
        // requireUserVerification: true,
        requireUserVerification: false,
    };
    const verification = await verifyAuthenticationResponse(opts);

    await deleteCurrentWebauthnSession();

    return {
        success: verification.verified,
        userId: user.id,
    };
};
