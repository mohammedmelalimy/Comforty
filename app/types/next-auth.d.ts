import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    token: string;
    user: {
      name: string;
      email: string;
      role: string;
    };
  }
  interface Session {
    user: User['user'];
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User['user'];
    token: string;
  }
}
