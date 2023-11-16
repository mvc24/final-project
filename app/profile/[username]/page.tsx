import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClient } from '../../../util/apolloClient';

export async function generateMetadata() {
  const sessionToken = cookies().get('sessionToken');

  const { data } = await getClient().query({
    query: gql`
      query LoggedInUser($token: String!) {
        loggedInUser(token: $token) {
          id
          username
        }
      }
    `,
    variables: {
      token: sessionToken?.value || '',
    },
  });

  if (data && data.loggedInUser && data.loggedInUser.username) {
    return {
      title: data.loggedInUser.username,
      description: `${data.loggedInUser.username}'s user profile`,
    };
  }
  return {
    title: 'Profile',
    description: `User profile`,
  };
}

export default async function UserProfilePage() {
  const sessionToken = cookies().get('sessionToken');

  const { data } = await getClient().query({
    query: gql`
      query LoggedInUser($token: String!) {
        loggedInUser(token: $token) {
          id
          username
        }
      }
    `,
    variables: {
      token: sessionToken?.value || '',
    },
  });
  console.log('data on user profile page: ', data.loggedInUser);

  if (!data.loggedInUser) {
    redirect('/login');
  }

  return (
    <main className="hero p-2 mb-16 text-center pt-9">
      <div className="flex-col">
        <h1 className="mx-auto my-5 text-3xl font-bold">User Profile</h1>
        <p>You're logged in as {data.loggedInUser.username}</p>
      </div>
    </main>
  );
}
