import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { User } from '@/app/lib/definitions';
import { verifyWebAuthnLogin } from '@/app/lib/webauthn';
import { AuthenticationResponseJSON } from '@simplewebauthn/server';

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // console.log('Credentials', credentials);

        const { webauthnResponse } = credentials;

        const verifyResponse = await verifyWebAuthnLogin(JSON.parse(webauthnResponse as string) as AuthenticationResponseJSON);

        if (!verifyResponse.success) {
          throw new Error(verifyResponse.message);
        }
        return { username: credentials.username } as User;
      },
    }),
  ],
});
