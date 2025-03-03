import {
  deleteCurrentWebauthnSession,
  getCurrentWebauthnSession,
  getWebauthnSession,
  setWebauthnSession, updateCurrentWebauthnSession,
  WebauthnSessionData,
} from './session';

import mockRedis from './redis';
import { cookies as mockCookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { WEBAUTHN_SESSION_ID_COOKIE_NAME, WEBAUTHN_SESSION_PREFIX, WEBAUTHN_SESSION_TTL } from './constants';

jest.mock('./redis', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
}));
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('session', () => {
  const expectedUsername = 'test';
  const expectedChallenge = 'challenge';
  const expectedSessionId = 'lllllllllle';
  const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
  const expectedExpirationArgument = 'EX';


  const expectedRandomNumber = 0.6;

  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(expectedRandomNumber);
  });

  afterAll(() => {
    (Math.random as jest.Mock).mockRestore();
  });

  describe('getWebauthnSession', () => {
    const expectedSession = null;
    const expectedSessionString = null;

    test('no session', async () => {
      // Arrange
      (mockRedis.get as jest.Mock).mockResolvedValue(expectedSessionString);

      // Act
      const actualSession = await getWebauthnSession(expectedSessionId);

      // Assert
      expect(actualSession).toEqual(expectedSession);
      expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
    });


    test('session exists on redis', async () => {
      // Arrange
      const expectedSession: WebauthnSessionData = { username: expectedUsername, currentChallenge: expectedChallenge };
      const expectedSessionString = JSON.stringify(expectedSession);
      (mockRedis.get as jest.Mock).mockResolvedValue(expectedSessionString);

      // Act
      const actualSession = await getWebauthnSession(expectedSessionId);

      // Assert
      expect(actualSession).toEqual(expectedSession);
      expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
    });

  });

  test('setWebauthnSession', async () => {
    // Arrange
    const expectedSessionData: WebauthnSessionData = { username: expectedUsername, currentChallenge: expectedChallenge };
    const expectedSessionString = JSON.stringify(expectedSessionData);


    // Act
    await setWebauthnSession(expectedSessionId, expectedSessionData);

    // Assert
    expect(mockRedis.set).toHaveBeenCalledWith(expectedRedisKey, expectedSessionString, expectedExpirationArgument, WEBAUTHN_SESSION_TTL);
  });

  describe('complex checks involving cookies', () => {
    const expectedCookieValue: RequestCookie = {
      name: WEBAUTHN_SESSION_ID_COOKIE_NAME,
      value: expectedSessionId,
    };
    const mockCookieStore = {
      get: jest.fn(),
      set: jest.fn(),
    };

    describe('getCurrentWebauthnSession', () => {
      test('no cookie present', async () => {
        // Arrange
        const expectedSessionData: WebauthnSessionData = {};
        const expectedSession = { sessionId: expectedSessionId, data: expectedSessionData };
        const expectedSessionString = JSON.stringify(expectedSessionData);
        mockCookieStore.get.mockReturnValue(undefined);
        (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);

        // Act
        const actualSession = await getCurrentWebauthnSession();

        // Assert
        expect(actualSession).toEqual(expectedSession);
        expect(mockCookies).toHaveBeenCalled();
        expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
        expect(mockCookieStore.set).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME, expectedSessionId);
        expect(mockRedis.set).toHaveBeenCalledWith(expectedRedisKey, expectedSessionString, expectedExpirationArgument, WEBAUTHN_SESSION_TTL);
      });

      test('cookie exists but session is missing/expired on redis', async () => {
        // Arrange
        const expectedSessionData: WebauthnSessionData = {};
        const expectedSession = { sessionId: expectedSessionId, data: expectedSessionData };
        const expectedSessionString = JSON.stringify(expectedSessionData);

        mockCookieStore.get.mockReturnValue(expectedCookieValue);
        (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);
        (mockRedis.get as jest.Mock).mockResolvedValue(null);


        // Act
        const actualSession = await getCurrentWebauthnSession();

        // Assert
        expect(actualSession).toEqual(expectedSession);
        expect(mockCookies).toHaveBeenCalled();
        expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
        expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
        expect(mockCookieStore.set).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME, expectedSessionId);
        expect(mockRedis.set).toHaveBeenCalledWith(expectedRedisKey, expectedSessionString, expectedExpirationArgument, WEBAUTHN_SESSION_TTL);
      });

      test('cookie exists and session is present on redis', async () => {
        // Arrange
        const expectedSessionData: WebauthnSessionData = { username: expectedUsername, currentChallenge: expectedChallenge };
        const expectedSession = { sessionId: expectedSessionId, data: expectedSessionData };
        const expectedSessionString = JSON.stringify(expectedSessionData);

        mockCookieStore.get.mockReturnValue(expectedCookieValue);
        (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);
        (mockRedis.get as jest.Mock).mockResolvedValue(expectedSessionString);


        // Act
        const actualSession = await getCurrentWebauthnSession();

        // Assert
        expect(actualSession).toEqual(expectedSession);
        expect(mockCookies).toHaveBeenCalled();
        expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
        expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
      });
    });


    describe('deleteSession', () => {
      test('no cookie present', async () => {
        // Arrange
        mockCookieStore.get.mockReturnValue(undefined);
        (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);

        // Act
        await deleteCurrentWebauthnSession();

        // Assert
        expect(mockCookies).toHaveBeenCalled();
        expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
        expect(mockCookieStore.set).not.toHaveBeenCalled();
        expect(mockRedis.set).not.toHaveBeenCalled();
        expect(mockRedis.del).not.toHaveBeenCalled();
      });

      test('cookie exists but session is missing/expired on redis', async () => {
        // Arrange
        mockCookieStore.get.mockReturnValue(expectedCookieValue);
        (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);
        (mockRedis.get as jest.Mock).mockResolvedValue(null);


        // Act
        await deleteCurrentWebauthnSession();

        // Assert
        expect(mockCookies).toHaveBeenCalled();
        expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
        expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
        expect(mockCookieStore.set).not.toHaveBeenCalled();
        expect(mockRedis.set).not.toHaveBeenCalled();
        expect(mockRedis.del).not.toHaveBeenCalled();
      });

      test('cookie exists and session is present on redis', async () => {
        // Arrange
        const expectedSessionData: WebauthnSessionData = { username: expectedUsername, currentChallenge: expectedChallenge };
        const expectedSessionString = JSON.stringify(expectedSessionData);

        mockCookieStore.get.mockReturnValue(expectedCookieValue);
        (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);
        (mockRedis.get as jest.Mock).mockResolvedValue(expectedSessionString);


        // Act
        await deleteCurrentWebauthnSession();

        // Assert
        expect(mockCookies).toHaveBeenCalled();
        expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
        expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
        expect(mockRedis.del).toHaveBeenCalledWith(expectedRedisKey);
      });
    });

    describe('updateCurrentWebauthnSession', () => {
      test('no cookie present', async () => {
        // Arrange
        const expectedNewChallenge = 'newChallenge';
        const expectedNewSessionData: WebauthnSessionData = { currentChallenge: expectedNewChallenge };

        mockCookieStore.get.mockReturnValue(undefined);
        (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);

        // Act
        await updateCurrentWebauthnSession(expectedNewSessionData);

        // Assert
        expect(mockCookies).toHaveBeenCalled();
        expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
        expect(mockCookieStore.set).not.toHaveBeenCalled();
        expect(mockRedis.set).not.toHaveBeenCalled();
        expect(mockRedis.set).not.toHaveBeenCalled();
      });

      test('cookie exists but session is missing/expired on redis', async () => {
        // Arrange
        const expectedNewChallenge = 'newChallenge';
        const expectedSessionData: WebauthnSessionData = {};
        const expectedNewSessionData: WebauthnSessionData = { currentChallenge: expectedNewChallenge };
        const expectedSessionString = JSON.stringify(expectedSessionData);
        const expectedNewSessionString = JSON.stringify(expectedNewSessionData);

        mockCookieStore.get.mockReturnValue(expectedCookieValue);
        (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);
        (mockRedis.get as jest.Mock).mockResolvedValue(null);


        // Act
        await updateCurrentWebauthnSession(expectedNewSessionData);

        // Assert
        expect(mockCookies).toHaveBeenCalled();
        expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
        expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
        expect(mockCookieStore.set).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME, expectedSessionId);
        expect(mockRedis.set).not.toHaveBeenCalledWith(expectedRedisKey, expectedSessionString, expectedExpirationArgument, WEBAUTHN_SESSION_TTL);
        expect(mockRedis.set).toHaveBeenCalledWith(expectedRedisKey, expectedNewSessionString, expectedExpirationArgument, WEBAUTHN_SESSION_TTL);
      });

      test('cookie exists and session is present on redis', async () => {
        // Arrange
        const expectedSessionData: WebauthnSessionData = { username: expectedUsername, currentChallenge: expectedChallenge };
        const expectedNewSessionData: WebauthnSessionData = { username: expectedUsername, currentChallenge: '1' };
        const expectedSessionString = JSON.stringify(expectedSessionData);
        const expectedNewSessionString = JSON.stringify(expectedNewSessionData);

        mockCookieStore.get.mockReturnValue(expectedCookieValue);
        (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);
        (mockRedis.get as jest.Mock).mockResolvedValue(expectedSessionString);

        // Act
        await updateCurrentWebauthnSession(expectedNewSessionData);

        // Assert
        expect(mockCookies).toHaveBeenCalled();
        expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
        expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
        expect(mockRedis.set).toHaveBeenCalledWith(expectedRedisKey, expectedNewSessionString, expectedExpirationArgument, WEBAUTHN_SESSION_TTL);
      });
    });
  });
});
