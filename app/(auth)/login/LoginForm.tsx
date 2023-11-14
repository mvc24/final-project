'use client';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`;

export default function LoginForm() {
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
    },
  });

  return (
    <form
      onSubmit={async () => await loginHandler()}
      className="relative flex flex-col justify-center min-h-screen overflow-hidden"
    >
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <div>
          <label>
            username
            <input
              value={username}
              className="mt-1 p-2 block input input-bordered w-full"
              onChange={(event) => {
                setUsername(event.currentTarget.value);
              }}
            />
          </label>
          <br />
          <label>
            password
            <input
              type="password"
              className="mt-1 p-2 block input input-bordered w-full"
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>
          <button
            className="btn btn-ghost p-4 m-2 items-center"
            formAction={async () => {
              await loginHandler();
            }}
          >
            Login
          </button>
        </div>
        <div className="error">{onError}</div>
      </div>
    </form>
  );
}
