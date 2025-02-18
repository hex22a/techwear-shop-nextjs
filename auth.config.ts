import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // console.log(auth);
      const isLoggedIn = !!auth?.user;
      const isOnCart = nextUrl.pathname.startsWith('/cart');
      return !isOnCart || isLoggedIn;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as typeof session.user;
      return session;
    }
  },
  providers: [],
  session: {
    strategy: 'jwt',
  }
} satisfies NextAuthConfig;
