import { cookies } from 'next/headers';

import redis from './redis';
import { Base64URLString } from '@simplewebauthn/server';
import { WEBAUTHN_SESSION_ID_COOKIE_NAME, WEBAUTHN_SESSION_PREFIX, WEBAUTHN_SESSION_TTL } from './constants';

export type WebauthnSessionData = {
    currentChallenge?: Base64URLString;
    username?: string;
};

async function getSessionData<T>(prefix: string, sessionId: string): Promise<T> {
    const sessionData = await redis.get(prefix + sessionId);
    return sessionData ? JSON.parse(sessionData) : null as T;
}

export async function getWebauthnSession(sessionId: string): Promise<WebauthnSessionData> {
    return getSessionData<WebauthnSessionData>(WEBAUTHN_SESSION_PREFIX, sessionId);
}

async function setSession<T>(prefix: string, sessionId: string, sessionData: T, ttl: number): Promise<void> {
    await redis.set(prefix + sessionId, JSON.stringify(sessionData), 'EX', ttl);
}

export async function setWebauthnSession(sessionId: string, sessionData: WebauthnSessionData): Promise<void> {
    await setSession(WEBAUTHN_SESSION_PREFIX, sessionId, sessionData, WEBAUTHN_SESSION_TTL);
}

async function fetchCurrentSession<T>(
    cookieName: string,
    fetchSession: (sessionId: string) => Promise<T>,
): Promise<{ sessionId: string; data: T } | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(cookieName);

    if (sessionCookie?.value) {
        const session = await fetchSession(sessionCookie.value);
        if (session) {
            return { sessionId: sessionCookie.value, data: session };
        }
    }
    return null;
}

async function createNewSession<T>(
  cookieName: string,
  updateSession: (sessionId: string, sessionData: T) => Promise<void>,
  newSessionData: T,
): Promise<{ sessionId: string; data: T }> {
    const cookieStore = await cookies();
    const newSessionId = Math.random().toString(36).slice(2);
    cookieStore.set(cookieName, newSessionId);
    await updateSession(newSessionId, newSessionData);
    return { sessionId: newSessionId, data: newSessionData };
}

export async function getCurrentWebauthnSession(): Promise<{ sessionId: string; data: WebauthnSessionData }> {
    const session = await fetchCurrentSession<WebauthnSessionData>(
        WEBAUTHN_SESSION_ID_COOKIE_NAME,
        getWebauthnSession,
    );
    if (session) {
        return session;
    }
    return createNewSession<WebauthnSessionData>(WEBAUTHN_SESSION_ID_COOKIE_NAME, setWebauthnSession, {
        currentChallenge: undefined,
        username: undefined,
    });
}

async function deleteSession(
    getSession: () => Promise<{ sessionId: string } | null>
): Promise<void> {
    const session = await getSession();
    if (session) {
        const { sessionId } = session;
        await redis.del(WEBAUTHN_SESSION_PREFIX + sessionId);
    }
}

export async function deleteCurrentWebauthnSession(): Promise<void> {
    const getCurSession = (fetchCurrentSession<WebauthnSessionData>).bind(null, WEBAUTHN_SESSION_ID_COOKIE_NAME, getWebauthnSession);
    await deleteSession(getCurSession);
}

async function updateSession<T>(
    cookieName: string,
    getSession: () => Promise<{ sessionId: string; data: T } | null>,
    setSession: (sessionId: string, sessionData: T) => Promise<void>,
    createSession: (sessionData: T) => Promise<{ sessionId: string; data: T }>,
    newData: T
): Promise<void> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(cookieName);
    if (sessionCookie?.value) {
        const session = await getSession();
        if (session) {
            const { sessionId, data: oldData } = session;
            await setSession(sessionId, { ...oldData, ...newData });
        } else {
            await createSession(newData);
        }
    }
}

export async function updateCurrentWebauthnSession(data: WebauthnSessionData): Promise<void> {
    const getCurSession = (fetchCurrentSession<WebauthnSessionData>).bind(null, WEBAUTHN_SESSION_ID_COOKIE_NAME, getWebauthnSession);
    const newSession = (createNewSession<WebauthnSessionData>).bind(null, WEBAUTHN_SESSION_ID_COOKIE_NAME, setWebauthnSession);
    await updateSession(WEBAUTHN_SESSION_ID_COOKIE_NAME, getCurSession, setWebauthnSession, newSession, data);
}
