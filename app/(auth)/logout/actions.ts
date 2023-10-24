'use server';

import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../database/sessions';

export async function logout() {
  // get session token from cookie

  const cookieStore = cookies();

  const token = cookies().get('sessionToken');

  // delete session from the database based on the token

  if (token) await deleteSessionByToken(token.value);

  // delete session cookie from the browser

  cookieStore.set('sessionToken', '', {
    maxAge: -1,
  });
}
