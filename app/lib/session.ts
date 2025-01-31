import { cookies } from 'next/headers'

import redis from './redis';

const SESSION_ID_COOKIE_NAME = 'session-id';
const SESSION_PREFIX = 'techwear-shop-webauthn-session-';

type SessionData = {
    currentChallenge?: string;
    username?: string;
};

export async function getSession(sessionId: string): Promise<SessionData> {
    const sessionData = await redis.get(SESSION_PREFIX + sessionId);
    return sessionData ? JSON.parse(sessionData) : {};
}

export async function setSession(sessionId: string, sessionData: SessionData): Promise<void> {
    await redis.set(SESSION_PREFIX + sessionId, JSON.stringify(sessionData));
}

export async function getCurrentSession(): Promise< { sessionId: string, data: SessionData }> {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get(SESSION_ID_COOKIE_NAME);

    if (sessionId?.value) {
        const session = await getSession(sessionId.value);

        if (session) {
            return { sessionId: sessionId.value, data: session };
        }
    }

    const newSessionId = Math.random().toString(36).slice(2);
    const newSession = { currentChallenge: undefined };
    cookieStore.set(SESSION_ID_COOKIE_NAME, newSessionId);

    await setSession(newSessionId, newSession);

    return { sessionId: newSessionId, data: newSession };
}

export async function deleteCurrentSession(): Promise<void> {
    const { sessionId } = await getCurrentSession();
    await redis.del(sessionId)
}

export async function updateCurrentSession(data: SessionData): Promise<void> {
    const { sessionId, data: oldData } = await getCurrentSession();

    await setSession(sessionId, { ...oldData, ...data });
}
