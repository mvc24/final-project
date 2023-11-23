'use client';
import { gql, useMutation } from '@apollo/client';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { getSafeReturnToPath } from '../../util/validation';

type Props = { returnTo?: string | string[] };

const signUpMutation = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
      passwordHash
    }
  }
`;

export default function SignUpForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [onError, setOnError] = useState('');
  const router = useRouter();

  const [signUpHandler] = useMutation(signUpMutation, {
    variables: {
      username,
      email,
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
      router.refresh();
    },
  });

  // console.log('SignUp mutation: ', signUpMutation);

  return (
    <div className="container contentSection">
      <div className="mx-auto mt-12 py-8 px-8">
        <h1 className="mx-auto text-center text-2xl text-decoration-600 font-bold">
          sign up
        </h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await signUpHandler();
          }}
          className="form-control mx-auto justify-center items-center w-full max-w-xs"
        >
          <div>
            <label id="username">
              username
              <input
                className="input border-decoration-600/50 shadow-decoration-200/25 shadow-inner rounded-full w-full max-w-xs"
                value={username}
                onChange={(event) => {
                  setUsername(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <label id="email">
              email
              <input
                type="email"
                className="input border-decoration-600/50 shadow-decoration-200/25 shadow-inner rounded-full w-full max-w-xs"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </label>
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
            <button className="mt-4 mx-auto btn px-5 rounded-full btn-outline border-t-decoration-700 text-decoration-700 hover:bg-decoration-100 hover:text-decoration-700 hover:border-decoration-100 lowercase text-lg">
              sign up
            </button>
          </div>
          <div className="error">{onError}</div>
        </form>
      </div>
    </div>
  );
}
