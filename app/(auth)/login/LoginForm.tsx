'use client';

import { gql, useMutation } from '@apollo/client';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';

type Props = { returnTo?: string | string[] };

const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`;

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [onError, setOnError] = useState('');
  const router = useRouter();

  const [loginHandler] = useMutation(loginMutation, {
    variables: {
      username,
      password,
    },

    onError: (error) => {
      setOnError(error.message);
    },

    onCompleted: () => {
      router.refresh();
      router.push(
        getSafeReturnToPath(props.returnTo) ||
          (`/profile/${username}` as Route),
      );
    },
  });

  return (
    <div className="container contentSection">
      <div className="mx-auto mt-12 py-8 px-8">
        <h1 className="mx-auto text-center text-2xl text-decoration-600 font-bold">
          log in
        </h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await loginHandler();
          }}
          className="form-control mx-auto justify-center items-center w-full max-w-xs"
        >
          <div className="">
            <div>
              <label id="username">
                username
                <input
                  value={username}
                  className="input border-decoration-600/50 shadow-decoration-200/25 shadow-inner rounded-full w-full max-w-xs"
                  onChange={(event) => {
                    setUsername(event.currentTarget.value);
                  }}
                />
              </label>
              <br />
              <label id="password">
                password
                <input
                  type="password"
                  className="input border-decoration-600/50 shadow-decoration-200/25 shadow-inner rounded-full w-full max-w-xs"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </label>
              <button
                className="mt-4 mx-auto btn px-5 rounded-full btn-outline border-t-decoration-700 text-decoration-700 hover:bg-decoration-100 hover:text-decoration-700 hover:border-decoration-100 lowercase text-lg"
                formAction={async () => {
                  await loginHandler();
                }}
              >
                login
              </button>
            </div>
            <div className="error">{onError}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
