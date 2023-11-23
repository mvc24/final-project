import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type } from 'os';
import { getClient } from '../../../util/apolloClient';
import CommentsFeedOnProfile from '../../Components/CommentFeedOnProfile';

export async function generateMetadata() {
  const sessionToken = cookies().get('sessionToken');

  const { data } = await getClient().query({
    query: gql`
      query LoggedInUser($token: String!) {
        loggedInUser(token: $token) {
          id
          username
          email
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
          email
        }
      }
    `,
    variables: {
      token: sessionToken?.value || '',
    },
  });
  // console.log('data on user profile page: ', data.loggedInUser);

  if (!data.loggedInUser) {
    redirect('/login');
  }

  //  console.log('typeof data user profile page', typeof data);

  return (
    <main className="p-6 w-5/6 mx-auto text-center">
      <h1 className="mx-auto pb-8 text-2xl text-decoration-600 font-bold">
        Welcome, {data.loggedInUser.username}!
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="">
          <h2 className="font-bold mx-auto mb-2  text-decoration-600 text-xl lowercase">
            You're logged in as:
            <br />
            <div className=" w-fit my-2 mx-auto bg-decoration-50 rounded-full px-4 py-2 shadow-md">
              {data.loggedInUser.username}
            </div>
          </h2>
          <p>
            your e-mail address: <br />
            {data.loggedInUser.email}
          </p>
        </div>

        <div className="">
          <h2 className="font-bold mx-auto mb-2  text-decoration-600 text-xl lowercase">
            your comments
          </h2>

          <div className="">
            <CommentsFeedOnProfile username={data.loggedInUser.username} />
          </div>
        </div>
        <div className="">
          <h2 className="font-bold mx-auto mb-2  text-decoration-600 text-xl lowercase">
            your favourite combinations
          </h2>
          <p className="text-sm font-light">
            You will be able to save your favourite combinations to your profile
            page.
          </p>
          <textarea
            className="textarea rounded-3xl mt-2"
            placeholder="coming soon!"
            disabled
          ></textarea>
        </div>
        <div className="">
          <h2 className="font-bold mx-auto mb-2  text-decoration-600 text-xl lowercase">
            your notes
          </h2>
          <p className="text-sm font-light">
            Here you can keep track of all the great ideas you don't want to
            immediately forget again.
          </p>
          <textarea
            className="textarea rounded-3xl mt-2"
            placeholder="coming soon!"
            disabled
          ></textarea>
        </div>
      </div>
    </main>
  );
}
