import {
  generateWebAuthnLoginOptions,
  generateWebAuthnRegistrationOptions, verifyWebAuthnLogin,
  verifyWebAuthnRegistration, WebAuthnResponse,
} from './webauthn';
import {
  findUser as mockFindUser,
  findUserWithPasskeys as mockFindUserWithPasskeys,
  createUser as mockCreateUser,
  getPasskeyWithUserId as mockGetPasskeyWithUserId,
} from './data';
import {
  deleteCurrentWebauthnSession as mockDeleteCurrentWebauthnSession,
  getCurrentWebauthnSession as mockGetCurrentWebauthnSession,
  updateCurrentWebauthnSession as mockUpdateCurrentWebauthnSession,
} from './session';
import {
  generateRegistrationOptions as mockGenerateRegistrationOptions,
  generateAuthenticationOptions as mockGenerateAuthenticationOptions,
  verifyRegistrationResponse as mockVerifyRegistrationResponse,
  verifyAuthenticationResponse as mockVerifyAuthenticationResponse,
  GenerateRegistrationOptionsOpts,
  RegistrationResponseJSON,
  VerifiedRegistrationResponse,
  VerifyRegistrationResponseOpts,
  GenerateAuthenticationOptionsOpts,
  AuthenticatorTransportFuture,
  AuthenticationResponseJSON,
  VerifyAuthenticationResponseOpts,
} from '@simplewebauthn/server';
import { PasskeySerialized, User, UserWithPasskeysSerialized } from '@/app/lib/definitions';
import { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/server';
import {
  WEBAUTHN_GENERATE_AUTHENTICATION_OPTIONS,
  WEBAUTHN_GENERATE_REGISTRATION_OPTIONS,
  WEBAUTHN_VERIFY_AUTHENTICATION_RESPONSE_OPTIONS,
  WEBAUTHN_VERIFY_REGISTRATION_RESPONSE_OPTIONS,
} from '@/app/lib/config';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import {
  PASSKEY_NOT_FOUND_ERROR_MESSAGE,
  REGISTRATION_FAILED_ERROR_MESSAGE,
  SESSION_EXPIRED_ERROR_MESSAGE,
  USER_ALREADY_EXISTS_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
} from '@/app/lib/constants';

jest.mock('./data', () => ({
  findUser: jest.fn(),
  findUserWithPasskeys: jest.fn(),
  createUser: jest.fn(),
  getPasskeyWithUserId: jest.fn(),
}));
jest.mock('./session', () => ({
  deleteCurrentWebauthnSession: jest.fn(),
  getCurrentWebauthnSession: jest.fn(),
  updateCurrentWebauthnSession: jest.fn(),
}));
jest.mock('@simplewebauthn/server', () => ({
  generateRegistrationOptions: jest.fn(),
  generateAuthenticationOptions: jest.fn(),
  verifyRegistrationResponse: jest.fn(),
  verifyAuthenticationResponse: jest.fn(),
}));

describe('webauthn', () => {
  describe('generateWebAuthnRegistrationOptions', () => {
    test('user already exists', async () => {
      // Arrange
      const expectedUsername = 'test';
      const expectedUserId = 'uuid-uuid-uuid-uuid';
      const expectedUserCreatedAt = new Date();
      const expectedUser: User = {
        created_at: expectedUserCreatedAt,
        id: expectedUserId,
        username: expectedUsername
      };
      const expectedResponse = {
        success: false,
        message: USER_ALREADY_EXISTS_ERROR_MESSAGE,
      };
      (mockFindUser as jest.Mock).mockResolvedValue(expectedUser);

      // Act
      const actualResponse = await generateWebAuthnRegistrationOptions(expectedUsername);

      // Assert
      expect(actualResponse).toEqual(expectedResponse);
      expect(mockFindUser).toHaveBeenCalledWith(expectedUsername);
    });

    test('generate options', async () => {
      // Arrange
      const expectedUserId = 'uuid-uuid-uuid-uuid';
      const expectedUsername = 'test';
      const expectedChallenge = 'some-challenge';
      const expectedUser = null;
      const expectedRpId = 'localhost';
      const expectedGenerateRegistrationOptions: GenerateRegistrationOptionsOpts = {
        userID: new TextEncoder().encode(expectedUsername),
        userName: expectedUsername,
        ...WEBAUTHN_GENERATE_REGISTRATION_OPTIONS,
      };
      const expectedRegistrationOptions: PublicKeyCredentialCreationOptionsJSON = {
        challenge: expectedChallenge,
        pubKeyCredParams: [],
        user: {
          id: expectedUserId,
          name: expectedUsername,
          displayName: expectedUsername,
        },
        rp: {
          id: expectedRpId,
          name: expectedRpId,
        },
      };
      const expectedResponse = {
        success: true,
        data: expectedRegistrationOptions,
      };
      (mockFindUser as jest.Mock).mockResolvedValue(expectedUser);
      (mockGenerateRegistrationOptions as jest.Mock).mockResolvedValue(expectedRegistrationOptions);

      // Act
      const actualResponse = await generateWebAuthnRegistrationOptions(expectedUsername);

      // Assert
      expect(actualResponse).toEqual(expectedResponse);
      expect(mockFindUser).toHaveBeenCalledWith(expectedUsername);
      expect(mockGenerateRegistrationOptions).toHaveBeenCalledWith(expectedGenerateRegistrationOptions);
      expect(mockUpdateCurrentWebauthnSession).toHaveBeenCalledWith({ currentChallenge: expectedChallenge, username: expectedUsername });
    });
  });

  describe('verifyWebAuthnRegistration', () => {
    describe('session expired', () => {
      test('no username', async () => {
        // Arrange
        const expectedResponse = {
          success: false,
          message: SESSION_EXPIRED_ERROR_MESSAGE,
        };
        const expectedData: RegistrationResponseJSON = {
          clientExtensionResults: {},
          id: '',
          rawId: '',
          response: {
            clientDataJSON: '',
            attestationObject: ''
          },
          type: 'public-key'
        };
        (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { currentChallenge: 'challenge' } });

        // Act
        const actualResponse = await verifyWebAuthnRegistration(expectedData);

        // Assert
        expect(actualResponse).toEqual(expectedResponse);
      });

      test('no challenge', async () => {
        // Arrange
        const expectedResponse = {
          success: false,
          message: SESSION_EXPIRED_ERROR_MESSAGE,
        };
        const expectedData: RegistrationResponseJSON = {
          clientExtensionResults: {},
          id: '',
          rawId: '',
          response: {
            clientDataJSON: '',
            attestationObject: ''
          },
          type: 'public-key'
        };
        (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { username: 'test' } });

        // Act
        const actualResponse = await verifyWebAuthnRegistration(expectedData);

        // Assert
        expect(actualResponse).toEqual(expectedResponse);
      });
    });

    describe('registration failed', () => {
      test('not verified', async () => {
        // Arrange
        const expectedResponse = {
          success: false,
          message: REGISTRATION_FAILED_ERROR_MESSAGE,
        };
        const expectedData: RegistrationResponseJSON = {
          clientExtensionResults: {},
          id: '',
          rawId: '',
          response: {
            clientDataJSON: '',
            attestationObject: ''
          },
          type: 'public-key'
        };
        const expectedVerifiedRegistrationResponse: VerifiedRegistrationResponse = {
          verified: false,
          registrationInfo: {
            fmt: 'none',
            aaguid: '',
            credential: {
              id: '',
              publicKey: new Uint8Array(),
              counter: 0,
              transports: undefined,
            },
            credentialType: 'public-key',
            attestationObject: new Uint8Array(),
            userVerified: false,
            credentialDeviceType: 'singleDevice',
            credentialBackedUp: false,
            origin: '',
          },
        };
        const expectedChallenge = 'challenge';
        const expectedVerifyRegistrationResponseOpts: VerifyRegistrationResponseOpts = {
          response: expectedData,
          expectedChallenge: expectedChallenge,
          ...WEBAUTHN_VERIFY_REGISTRATION_RESPONSE_OPTIONS
        };
        (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { username: 'test', currentChallenge: expectedChallenge } });
        (mockVerifyRegistrationResponse as jest.Mock).mockResolvedValue(expectedVerifiedRegistrationResponse);
        // Act

        const actualResponse = await verifyWebAuthnRegistration(expectedData);

        // Assert
        expect(actualResponse).toEqual(expectedResponse);
        expect(mockVerifyRegistrationResponse).toHaveBeenCalledWith(expectedVerifyRegistrationResponseOpts);
      });

      test('registrationInfo is not present', async () => {
        // Arrange
        const expectedResponse = {
          success: false,
          message: REGISTRATION_FAILED_ERROR_MESSAGE,
        };
        const expectedData: RegistrationResponseJSON = {
          clientExtensionResults: {},
          id: '',
          rawId: '',
          response: {
            clientDataJSON: '',
            attestationObject: ''
          },
          type: 'public-key'
        };
        const expectedVerifiedRegistrationResponse: VerifiedRegistrationResponse = { verified: true };
        const expectedChallenge = 'challenge';
        const expectedVerifyRegistrationResponseOpts: VerifyRegistrationResponseOpts = {
          response: expectedData,
          expectedChallenge: expectedChallenge,
          ...WEBAUTHN_VERIFY_REGISTRATION_RESPONSE_OPTIONS
        };
        (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { username: 'test', currentChallenge: expectedChallenge } });
        (mockVerifyRegistrationResponse as jest.Mock).mockResolvedValue(expectedVerifiedRegistrationResponse);
        // Act

        const actualResponse = await verifyWebAuthnRegistration(expectedData);

        // Assert
        expect(actualResponse).toEqual(expectedResponse);
        expect(mockVerifyRegistrationResponse).toHaveBeenCalledWith(expectedVerifyRegistrationResponseOpts);
      });
    });

    test('failed to create user', async () => {
      // Arrange
      const expectedResponse = {
        success: false,
        message: USER_ALREADY_EXISTS_ERROR_MESSAGE,
      };
      const expectedData: RegistrationResponseJSON = {
        clientExtensionResults: {},
        id: '',
        rawId: '',
        response: {
          clientDataJSON: '',
          attestationObject: ''
        },
        type: 'public-key'
      };
      const expectedVerifiedRegistrationResponse: VerifiedRegistrationResponse = {
        verified: true,
        registrationInfo: {
          fmt: 'none',
          aaguid: '',
          credential: {
            id: '',
            publicKey: new Uint8Array(),
            counter: 0,
            transports: undefined,
          },
          credentialType: 'public-key',
          attestationObject: new Uint8Array(),
          userVerified: false,
          credentialDeviceType: 'singleDevice',
          credentialBackedUp: false,
          origin: '',
        },
      };
      const expectedUsername = 'test';
      const expectedChallenge = 'challenge';
      const expectedVerifyRegistrationResponseOpts: VerifyRegistrationResponseOpts = {
        response: expectedData,
        expectedChallenge: expectedChallenge,
        ...WEBAUTHN_VERIFY_REGISTRATION_RESPONSE_OPTIONS
      };
      const expectedNewDevice = {
        cred_public_key: '',
        cred_id: '',
        counter: 0,
        backup_status: false,
        backup_eligible: false,
        transports: [],
      };
      (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { username: expectedUsername, currentChallenge: expectedChallenge } });
      (mockVerifyRegistrationResponse as jest.Mock).mockResolvedValue(expectedVerifiedRegistrationResponse);

      (mockCreateUser as jest.Mock).mockRejectedValue(new Error('Failed to create user'));

      // Act
      const actualResponse = await verifyWebAuthnRegistration(expectedData);

      // Assert
      expect(actualResponse).toEqual(expectedResponse);
      expect(mockVerifyRegistrationResponse).toHaveBeenCalledWith(expectedVerifyRegistrationResponseOpts);
      expect(mockDeleteCurrentWebauthnSession).toHaveBeenCalled();
      expect(mockCreateUser).toHaveBeenCalledWith(expectedUsername, expectedNewDevice);
    });

    test('successful registration', async () => {
      // Arrange
      const expectedResponse = {
        success: true,
      };
      const expectedData: RegistrationResponseJSON = {
        clientExtensionResults: {},
        id: '',
        rawId: '',
        response: {
          clientDataJSON: '',
          attestationObject: ''
        },
        type: 'public-key'
      };
      const expectedVerifiedRegistrationResponse: VerifiedRegistrationResponse = {
        verified: true,
        registrationInfo: {
          fmt: 'none',
          aaguid: '',
          credential: {
            id: '',
            publicKey: new Uint8Array(),
            counter: 0,
            transports: undefined,
          },
          credentialType: 'public-key',
          attestationObject: new Uint8Array(),
          userVerified: false,
          credentialDeviceType: 'singleDevice',
          credentialBackedUp: false,
          origin: '',
        },
      };
      const expectedUsername = 'test';
      const expectedChallenge = 'challenge';
      const expectedVerifyRegistrationResponseOpts: VerifyRegistrationResponseOpts = {
        response: expectedData,
        expectedChallenge: expectedChallenge,
        ...WEBAUTHN_VERIFY_REGISTRATION_RESPONSE_OPTIONS
      };
      const expectedNewDevice = {
        cred_public_key: '',
        cred_id: '',
        counter: 0,
        backup_status: false,
        backup_eligible: false,
        transports: [],
      };
      (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { username: expectedUsername, currentChallenge: expectedChallenge } });
      (mockVerifyRegistrationResponse as jest.Mock).mockResolvedValue(expectedVerifiedRegistrationResponse);

      (mockCreateUser as jest.Mock).mockImplementation(() => Promise.resolve());

      // Act
      const actualResponse = await verifyWebAuthnRegistration(expectedData);

      // Assert
      expect(actualResponse).toEqual(expectedResponse);
      expect(mockVerifyRegistrationResponse).toHaveBeenCalledWith(expectedVerifyRegistrationResponseOpts);
      expect(mockDeleteCurrentWebauthnSession).toHaveBeenCalled();
      expect(mockCreateUser).toHaveBeenCalledWith(expectedUsername, expectedNewDevice);
    });
  });

  describe('generateWebAuthnLoginOptions', () => {
    test('user does not exist', async () => {
      // Arrange
      const expectedResponse: WebAuthnResponse = {
        success: false,
        message: USER_NOT_FOUND_ERROR_MESSAGE,
      };
      const expectedUsername = 'test';
      const expectedUser = null;

      (mockFindUserWithPasskeys as jest.Mock).mockResolvedValue(expectedUser);

      // Act
      const actualResponse = await generateWebAuthnLoginOptions(expectedUsername);

      // Assert
      expect(actualResponse).toEqual(expectedResponse);
      expect(mockFindUserWithPasskeys).toHaveBeenCalledWith(expectedUsername);
    });

    test('generate options', async () => {
      // Arrange
      const expectedRpId = 'localhost';
      const expectedChallenge = 'challenge';
      const expectedUsername = 'test';
      const expectedUserId = 'uuid-uuid-uuid-uuid';
      const expectedCredentialId = 'credId';
      const expectedPasskeys = new Map<string, PasskeySerialized>();
      const expectedTransports = ['hybrid'];
      expectedPasskeys.set(expectedCredentialId, {
        backup_eligible: false,
        backup_status: false,
        counter: 0,
        cred_public_key: '',
        transports: expectedTransports as AuthenticatorTransportFuture[],
        cred_id: expectedCredentialId
      });
      const expectedUser: UserWithPasskeysSerialized = {
        passkeys: expectedPasskeys,
        username: expectedUsername,
        created_at: new Date(),
        id: expectedUserId
      };
      const expectedPublicKeyCredentialRequestOptions: PublicKeyCredentialCreationOptionsJSON = {
        challenge: expectedChallenge,
        pubKeyCredParams: [],
        rp: {
          id: expectedRpId,
          name: expectedRpId,
        },
        user: {
          id: expectedUserId,
          name: expectedUsername,
          displayName: expectedUsername,
        },
      };
      const expectedResponse: WebAuthnResponse = {
        success: true,
        data: expectedPublicKeyCredentialRequestOptions,
      };
      const expectedGenerateAuthenticationOptionsOpts: GenerateAuthenticationOptionsOpts = {
        allowCredentials: [{ id: expectedCredentialId, transports: expectedTransports as AuthenticatorTransportFuture[] }],
        ...WEBAUTHN_GENERATE_AUTHENTICATION_OPTIONS,
      };

      (mockFindUserWithPasskeys as jest.Mock).mockResolvedValue(expectedUser);
      (mockGenerateAuthenticationOptions as jest.Mock).mockResolvedValue(expectedPublicKeyCredentialRequestOptions);

      // Act
      const actualResponse = await generateWebAuthnLoginOptions(expectedUsername);

      // Assert
      expect(actualResponse).toEqual(expectedResponse);
      expect(mockFindUserWithPasskeys).toHaveBeenCalledWith(expectedUsername);
      expect(mockGenerateAuthenticationOptions).toHaveBeenCalledWith(expectedGenerateAuthenticationOptionsOpts);
      expect(mockUpdateCurrentWebauthnSession).toHaveBeenCalledWith({ currentChallenge: expectedChallenge, username: expectedUsername });
    });
  });

  describe('verifyWebAuthnLogin', () => {
    describe('session expired', () => {
      test('no username', async () => {
        // Arrange
        const expectedData: AuthenticationResponseJSON = {
          clientExtensionResults: {},
          id: '',
          rawId: '',
          response: {
            clientDataJSON: '',
            authenticatorData: '',
            signature: '',
          },
          type: 'public-key',
        };
        const expectedResponse = {
          success: false,
          message: SESSION_EXPIRED_ERROR_MESSAGE,
        };
        (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { currentChallenge: 'challenge' } });


        // Act
        const actualResponse = await verifyWebAuthnLogin(expectedData);

        // Assert
        expect(actualResponse).toEqual(expectedResponse);
        expect(mockGetCurrentWebauthnSession).toHaveBeenCalled();
      });

      test('currentChallenge is not present', async () => {
        // Arrange
        const expectedData: AuthenticationResponseJSON = {
          clientExtensionResults: {},
          id: '',
          rawId: '',
          response: {
            clientDataJSON: '',
            authenticatorData: '',
            signature: '',
          },
          type: 'public-key',
        };
        const expectedResponse = {
          success: false,
          message: SESSION_EXPIRED_ERROR_MESSAGE,
        };
        (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { username: 'test' } });


        // Act
        const actualResponse = await verifyWebAuthnLogin(expectedData);

        // Assert
        expect(actualResponse).toEqual(expectedResponse);
        expect(mockGetCurrentWebauthnSession).toHaveBeenCalled();
      });
    });

    test('unable to find user', async () => {
      // Arrange
      const expectedData: AuthenticationResponseJSON = {
        clientExtensionResults: {},
        id: '',
        rawId: '',
        response: {
          clientDataJSON: '',
          authenticatorData: '',
          signature: '',
        },
        type: 'public-key',
      };
      const expectedResponse = {
        success: false,
        message: USER_NOT_FOUND_ERROR_MESSAGE,
      };
      const expectedUsername = 'test';
      const expectedChallenge = 'challenge';
      (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { username: expectedUsername, currentChallenge: expectedChallenge } });
      (mockFindUser as jest.Mock).mockResolvedValue(null);

      // Act
      const actualResponse = await verifyWebAuthnLogin(expectedData);

      // Assert
      expect(actualResponse).toEqual(expectedResponse);
      expect(mockGetCurrentWebauthnSession).toHaveBeenCalled();
      expect(mockFindUser).toHaveBeenCalledWith(expectedUsername);
    });

    test('passkey not found', async () => {
      // Arrange
      const expectedRawId = 'rawId';
      const expectedData: AuthenticationResponseJSON = {
        clientExtensionResults: {},
        id: '',
        rawId: expectedRawId,
        response: {
          clientDataJSON: '',
          authenticatorData: '',
          signature: '',
        },
        type: 'public-key',
      };
      const expectedResponse = {
        success: false,
        message: PASSKEY_NOT_FOUND_ERROR_MESSAGE,
      };
      const expectedUserId = 'uuid-uuid-uuid-uuid';
      const expectedUsername = 'test';
      const expectedChallenge = 'challenge';
      const expectedUser: User = {
        id: expectedUserId,
        username: expectedUsername,
        created_at: new Date(),
      };
      (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { username: expectedUsername, currentChallenge: expectedChallenge } });
      (mockFindUser as jest.Mock).mockResolvedValue(expectedUser);
      (mockGetPasskeyWithUserId as jest.Mock).mockResolvedValue(null);

      // Act
      const actualResponse = await verifyWebAuthnLogin(expectedData);

      // Assert
      expect(actualResponse).toEqual(expectedResponse);
      expect(mockGetCurrentWebauthnSession).toHaveBeenCalled();
      expect(mockFindUser).toHaveBeenCalledWith(expectedUsername);
      expect(mockGetPasskeyWithUserId).toHaveBeenCalledWith(expectedRawId, expectedUserId);
    });

    test('successful authentication', async () => {
      // Arrange
      const expectedRawId = 'rawId';
      const expectedData: AuthenticationResponseJSON = {
        clientExtensionResults: {},
        id: '',
        rawId: expectedRawId,
        response: {
          clientDataJSON: '',
          authenticatorData: '',
          signature: '',
        },
        type: 'public-key',
      };
      const expectedUserId = 'uuid-uuid-uuid-uuid';
      const expectedUsername = 'test';
      const expectedChallenge = 'challenge';
      const expectedCredId = 'credId';
      const expectedCredPublicKey = 'cred_public_key';
      const expectedVerified = true;
      const expectedUser: User = {
        id: expectedUserId,
        username: expectedUsername,
        created_at: new Date(),
      };
      const expectedCounter = 0;
      const expectedPasskey: PasskeySerialized = {
        backup_eligible: false,
        backup_status: false,
        counter: expectedCounter,
        cred_id: expectedCredId,
        cred_public_key: expectedCredPublicKey,
        transports: []
      };
      const expectedVerifiedAuthenticationResponse: VerifiedRegistrationResponse = { verified: expectedVerified };
      const expectedVerifyAuthenticationResponseOptions: VerifyAuthenticationResponseOpts = {
        response: expectedData,
        expectedChallenge: expectedChallenge,
        credential: {
          id: expectedCredId,
          publicKey: isoBase64URL.toBuffer(expectedCredPublicKey),
          counter: expectedCounter
        },
        ...WEBAUTHN_VERIFY_AUTHENTICATION_RESPONSE_OPTIONS,
      };
      const expectedResponse = {
        success: expectedVerified,
        userId: expectedUserId,
      };

      (mockGetCurrentWebauthnSession as jest.Mock).mockResolvedValue({ sessionId: '', data: { username: expectedUsername, currentChallenge: expectedChallenge } });
      (mockFindUser as jest.Mock).mockResolvedValue(expectedUser);
      (mockGetPasskeyWithUserId as jest.Mock).mockResolvedValue(expectedPasskey);
      (mockVerifyAuthenticationResponse as jest.Mock).mockResolvedValue(expectedVerifiedAuthenticationResponse);

      // Act
      const actualResponse = await verifyWebAuthnLogin(expectedData);

      // Assert
      expect(actualResponse).toEqual(expectedResponse);
      expect(mockGetCurrentWebauthnSession).toHaveBeenCalled();
      expect(mockFindUser).toHaveBeenCalledWith(expectedUsername);
      expect(mockGetPasskeyWithUserId).toHaveBeenCalledWith(expectedRawId, expectedUserId);
      expect(mockVerifyAuthenticationResponse).toHaveBeenCalledWith(expectedVerifyAuthenticationResponseOptions);
      expect(mockDeleteCurrentWebauthnSession).toHaveBeenCalled();
    });
  });
});
