import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionsByToken } from '../../../database/sessions';
import SignupForm from './SignupForm';

export default async function SignupPage() {
  // task: add redirect to home if user is logged in

  // 1. check if the sessionToken cookie exists

  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. Check if sessionToken cookie is still valid

  const session =
    sessionTokenCookie &&
    (await getValidSessionsByToken(sessionTokenCookie.value));

  if (session) redirect('/');

  return (
    <div>
      <SignupForm />
    </div>
  );
}
