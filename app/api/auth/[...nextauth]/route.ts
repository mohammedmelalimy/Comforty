import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        console.log('Authorizing user with credentials:', credentials);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });

        const data = await res.json();

        if (res.ok) {
          return {
            id: '',
            user: data.user,
            token: data.token
          };
        }
      }
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
