import { get } from 'node:http';
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getUserToken() {
  const cookieStore = cookies();

  const encodedToken =
    (await cookieStore).get('next-auth.session-token')?.value ||
    (await cookieStore).get('__Secure-next-auth.session-token')?.value;

  if (!encodedToken) return null;

  const token = await decode({
    token: encodedToken,
    secret: process.env.NEXTAUTH_SECRET!
  });

  return token?.token;
}
