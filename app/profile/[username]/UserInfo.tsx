import { redirect } from 'next/navigation';
import LogoutButton from '../../(auth)/logout/LogoutButton';

type Props = { data: string };

export default function UserInfoBox(props: Props) {
  if (!props.data) {
    redirect('/login');
  }

  return (
    <div className="flex-shrink-0 w-full max-w-md mx-auto shadow-2xl card bg-base-100">
      <div className="card-body">
        <p>You are logged in as</p>
        <span className="my-5 text-4xl text-primary">{props.data}</span>
        <LogoutButton />
      </div>
    </div>
  );
}
