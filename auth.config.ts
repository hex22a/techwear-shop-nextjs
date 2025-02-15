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
  },
  providers: [],
  session: {
    strategy: 'jwt',
  }
} satisfies NextAuthConfig;
