import {
  deleteCurrentWebauthnSession,
  getCurrentWebauthnSession,
  getWebauthnSession,
  setWebauthnSession,
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
  const expectedRandomNumber = 0.6;

  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(expectedRandomNumber);
  });

  afterAll(() => {
    (Math.random as jest.Mock).mockRestore();
  });

  describe('getWebauthnSession', () => {
    test('no session', async () => {
      // Arrange
      const expectedSession = null;
      const expectedSessionString = null;
      const expectedSessionId = '1234567890';
      const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
      (mockRedis.get as jest.Mock).mockResolvedValue(expectedSessionString);

      // Act
      const actualSession = await getWebauthnSession(expectedSessionId);

      // Assert
      expect(actualSession).toEqual(expectedSession);
      expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
    });


    test('session exists on redis', async () => {
      // Arrange
      const expectedUsername = 'test';
      const expectedChallenge = 'challenge';
      const expectedSessionId = '1234567890';
      const expectedSession: WebauthnSessionData = { username: expectedUsername, currentChallenge: expectedChallenge };
      const expectedSessionString = JSON.stringify(expectedSession);
      const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
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
    const expectedUsername = 'test';
    const expectedChallenge = 'challenge';
    const expectedSessionId = '1234567890';
    const expectedSessionData: WebauthnSessionData = { username: expectedUsername, currentChallenge: expectedChallenge };
    const expectedSessionString = JSON.stringify(expectedSessionData);
    const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
    const expectedExpirationArgument = 'EX';


    // Act
    await setWebauthnSession(expectedSessionId, expectedSessionData);

    // Assert
    expect(mockRedis.set).toHaveBeenCalledWith(expectedRedisKey, expectedSessionString, expectedExpirationArgument, WEBAUTHN_SESSION_TTL);
  });

  describe('getCurrentWebauthnSession', () => {
    test('no cookie present', async () => {
      // Arrange
      const expectedChallenge = undefined;
      const expectedSessionId = 'lllllllllle';
      const expectedSessionData: WebauthnSessionData = { currentChallenge: expectedChallenge };
      const expectedSession = { sessionId: expectedSessionId, data: expectedSessionData };
      const expectedSessionString = JSON.stringify(expectedSessionData);
      const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
      const expectedExpirationArgument = 'EX';
      const expectedCookieValue: RequestCookie | undefined = undefined;
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(expectedCookieValue),
        set: jest.fn(),
      };
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
      const expectedChallenge = undefined;
      const expectedSessionId = 'lllllllllle';
      const expectedSessionData: WebauthnSessionData = { currentChallenge: expectedChallenge };
      const expectedSession = { sessionId: expectedSessionId, data: expectedSessionData };
      const expectedSessionString = JSON.stringify(expectedSessionData);
      const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
      const expectedExpirationArgument = 'EX';
      const expectedCookieValue: RequestCookie | undefined = {
        name: WEBAUTHN_SESSION_ID_COOKIE_NAME,
        value: expectedSessionId,
      };
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(expectedCookieValue),
        set: jest.fn(),
      };
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
      const expectedChallenge = 'challenge';
      const expectedUsername = 'test';
      const expectedSessionId = 'lllllllllle';
      const expectedSessionData: WebauthnSessionData = { username: expectedUsername, currentChallenge: expectedChallenge };
      const expectedSession = { sessionId: expectedSessionId, data: expectedSessionData };
      const expectedSessionString = JSON.stringify(expectedSessionData);
      const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
      const expectedCookieValue: RequestCookie | undefined = {
        name: WEBAUTHN_SESSION_ID_COOKIE_NAME,
        value: expectedSessionId,
      };
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(expectedCookieValue),
        set: jest.fn(),
      };
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
      const expectedChallenge = undefined;
      const expectedSessionId = 'lllllllllle';
      const expectedSessionData: WebauthnSessionData = { currentChallenge: expectedChallenge };
      const expectedSessionString = JSON.stringify(expectedSessionData);
      const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
      const expectedExpirationArgument = 'EX';
      const expectedCookieValue: RequestCookie | undefined = undefined;
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(expectedCookieValue),
        set: jest.fn(),
      };
      (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);

      // Act
      await deleteCurrentWebauthnSession();

      // Assert
      expect(mockCookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
      expect(mockCookieStore.set).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME, expectedSessionId);
      expect(mockRedis.set).toHaveBeenCalledWith(expectedRedisKey, expectedSessionString, expectedExpirationArgument, WEBAUTHN_SESSION_TTL);
      expect(mockRedis.del).toHaveBeenCalledWith(expectedRedisKey);
    });

    test('cookie exists but session is missing/expired on redis', async () => {
      // Arrange
      const expectedChallenge = undefined;
      const expectedSessionId = 'lllllllllle';
      const expectedSessionData: WebauthnSessionData = { currentChallenge: expectedChallenge };
      const expectedSessionString = JSON.stringify(expectedSessionData);
      const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
      const expectedExpirationArgument = 'EX';
      const expectedCookieValue: RequestCookie | undefined = {
        name: WEBAUTHN_SESSION_ID_COOKIE_NAME,
        value: expectedSessionId,
      };
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(expectedCookieValue),
        set: jest.fn(),
      };
      (mockCookies as jest.Mock).mockResolvedValue(mockCookieStore);
      (mockRedis.get as jest.Mock).mockResolvedValue(null);


      // Act
      await deleteCurrentWebauthnSession();

      // Assert
      expect(mockCookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME);
      expect(mockRedis.get).toHaveBeenCalledWith(expectedRedisKey);
      expect(mockCookieStore.set).toHaveBeenCalledWith(WEBAUTHN_SESSION_ID_COOKIE_NAME, expectedSessionId);
      expect(mockRedis.set).toHaveBeenCalledWith(expectedRedisKey, expectedSessionString, expectedExpirationArgument, WEBAUTHN_SESSION_TTL);
      expect(mockRedis.del).toHaveBeenCalledWith(expectedRedisKey);
    });

    test('cookie exists and session is present on redis', async () => {
      // Arrange
      const expectedChallenge = 'challenge';
      const expectedUsername = 'test';
      const expectedSessionId = 'lllllllllle';
      const expectedSessionData: WebauthnSessionData = { username: expectedUsername, currentChallenge: expectedChallenge };
      const expectedSessionString = JSON.stringify(expectedSessionData);
      const expectedRedisKey = WEBAUTHN_SESSION_PREFIX + expectedSessionId;
      const expectedCookieValue: RequestCookie | undefined = {
        name: WEBAUTHN_SESSION_ID_COOKIE_NAME,
        value: expectedSessionId,
      };
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(expectedCookieValue),
        set: jest.fn(),
      };
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
});
