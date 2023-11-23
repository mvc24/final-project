import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import SignUpForm from '../../Components/SignupForm';

export default async function SignUpPage() {
  // task: add redirect to home if user is logged in

  // 1. check if the sessionToken cookie exists

  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. Check if sessionToken cookie is still valid

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (session) redirect('/');

  return (
    <div>
      <SignUpForm />
    </div>
  );
}
