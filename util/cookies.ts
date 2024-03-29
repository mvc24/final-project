import { cookies } from 'next/headers';

// nullish coalescing operator
export function getCookie(name: string) {
  return cookies().get(name)?.value;
}

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24, // expires in 24 hours
  sameSite: 'lax', // this prevents CSRF attacks
} as const;
