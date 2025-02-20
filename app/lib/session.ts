import { cookies } from 'next/headers'

import redis from './redis';
import { Base64URLString } from '@simplewebauthn/server';

const WEBAUTHN_SESSION_ID_COOKIE_NAME = 'w-session-id';
const WEBAUTHN_SESSION_PREFIX = 'techwear-shop-webauthn-session-';
const WEBAUTHN_SESSION_TTL = 5 * 60;

type WebauthnSessionData = {
    currentChallenge?: Base64URLString;
    username?: string;
};

async function getSessionData<T>(prefix: string, sessionId: string): Promise<T> {
    const sessionData = await redis.get(prefix + sessionId);
    return sessionData ? JSON.parse(sessionData) : {} as T;
}

export async function getWebauthnSession(sessionId: string): Promise<WebauthnSessionData> {
    return getSessionData<WebauthnSessionData>(WEBAUTHN_SESSION_PREFIX, sessionId);
}

export async function setSession<T>(prefix: string, sessionId: string, sessionData: T, ttl: number): Promise<void> {
    await redis.set(prefix + sessionId, JSON.stringify(sessionData), 'EX', ttl);
}

export async function setWebauthnSession(sessionId: string, sessionData: WebauthnSessionData): Promise<void> {
    await setSession(WEBAUTHN_SESSION_PREFIX, sessionId, sessionData, WEBAUTHN_SESSION_TTL);
}

async function fetchOrCreateSession<T>(
    cookieName: string,
    fetchSession: (sessionId: string) => Promise<T>,
    newSessionData: T,
    setSessionData: (sessionId: string, sessionData: T) => Promise<void>
): Promise<{ sessionId: string; data: T }> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(cookieName);

    if (sessionCookie?.value) {
        const session = await fetchSession(sessionCookie.value);
        if (session) {
            return { sessionId: sessionCookie.value, data: session };
        }
    }
    const newSessionId = Math.random().toString(36).slice(2);
    cookieStore.set(cookieName, newSessionId);
    await setSessionData(newSessionId, newSessionData);
    return { sessionId: newSessionId, data: newSessionData };
}


export async function getCurrentWebauthnSession(): Promise<{ sessionId: string; data: WebauthnSessionData }> {
    return await fetchOrCreateSession<WebauthnSessionData>(
        WEBAUTHN_SESSION_ID_COOKIE_NAME,
        getWebauthnSession,
        { currentChallenge: undefined },
        setWebauthnSession
    );
}

export async function deleteSession(
    getSession: () => Promise<{ sessionId: string }>
): Promise<void> {
    const { sessionId } = await getSession();
    await redis.del(sessionId);
}

export async function deleteCurrentWebauthnSession(): Promise<void> {
    await deleteSession(getCurrentWebauthnSession);
}

async function updateSession<T>(
    getSession: () => Promise<{ sessionId: string; data: T }>,
    setSession: (sessionId: string, sessionData: T) => Promise<void>,
    newData: T
): Promise<void> {
    const { sessionId, data: oldData } = await getSession();
    await setSession(sessionId, { ...oldData, ...newData });
}

export async function updateCurrentWebauthnSession(data: WebauthnSessionData): Promise<void> {
    await updateSession(getCurrentWebauthnSession, setWebauthnSession, data);
}
