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
import {
    PASSKEY_NOT_FOUND_ERROR_MESSAGE,
    REGISTRATION_FAILED_ERROR_MESSAGE,
    SESSION_EXPIRED_ERROR_MESSAGE,
    USER_ALREADY_EXISTS_ERROR_MESSAGE,
    USER_NOT_FOUND_ERROR_MESSAGE,
} from '@/app/lib/constants';
import {
    WEBAUTHN_GENERATE_AUTHENTICATION_OPTIONS,
    WEBAUTHN_GENERATE_REGISTRATION_OPTIONS, WEBAUTHN_VERIFY_AUTHENTICATION_RESPONSE_OPTIONS,
    WEBAUTHN_VERIFY_REGISTRATION_RESPONSE_OPTIONS,
} from '@/app/lib/config';


export const generateWebAuthnRegistrationOptions = async (username: string) => {
    const user = await findUser(username);

    if (user) {
        return {
            success: false,
            message: USER_ALREADY_EXISTS_ERROR_MESSAGE,
        };
    }

    const opts: GenerateRegistrationOptionsOpts = {
        userID: new TextEncoder().encode(username),
        userName: username,
        ...WEBAUTHN_GENERATE_REGISTRATION_OPTIONS,
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
            message: SESSION_EXPIRED_ERROR_MESSAGE,
        };
    }

    const opts: VerifyRegistrationResponseOpts = {
        response: data,
        expectedChallenge: `${currentChallenge}`,
        ...WEBAUTHN_VERIFY_REGISTRATION_RESPONSE_OPTIONS,
    };
    const verification = await verifyRegistrationResponse(opts);

    const { verified, registrationInfo } = verification;

    if (!verified || !registrationInfo) {
        return {
            success: false,
            message: REGISTRATION_FAILED_ERROR_MESSAGE,
        };
    }

    const { credential } = registrationInfo;

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
            message: USER_ALREADY_EXISTS_ERROR_MESSAGE,
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
            message: USER_NOT_FOUND_ERROR_MESSAGE,
        };
    }

    const opts: GenerateAuthenticationOptionsOpts = {
        allowCredentials: Array.from(user.passkeys.entries()).map(([, value]) => ({
            id: value.cred_id,
            transports: value.transports.map((t): AuthenticatorTransportFuture => t.toString() as 'usb' | 'nfc' | 'ble' | 'internal'),
        })),
        ...WEBAUTHN_GENERATE_AUTHENTICATION_OPTIONS,
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
            message: SESSION_EXPIRED_ERROR_MESSAGE,
        };
    }

    const user = await findUser(username);

    if (!user) {
        return {
            success: false,
            message: USER_NOT_FOUND_ERROR_MESSAGE,
        };
    }

    const dbAuthenticator = await getPasskeyWithUserId(data.rawId, user.id);

    if (!dbAuthenticator) {
        return {
            success: false,
            message: PASSKEY_NOT_FOUND_ERROR_MESSAGE,
        };
    }

    const opts: VerifyAuthenticationResponseOpts = {
        response: data,
        expectedChallenge: `${currentChallenge}`,
        credential: {
            id: dbAuthenticator.cred_id,
            publicKey: isoBase64URL.toBuffer(dbAuthenticator.cred_public_key),
            counter: dbAuthenticator.counter
        },
        ...WEBAUTHN_VERIFY_AUTHENTICATION_RESPONSE_OPTIONS,
    };
    const verification = await verifyAuthenticationResponse(opts);

    await deleteCurrentWebauthnSession();

    return {
        success: verification.verified,
        userId: user.id,
    };
};
