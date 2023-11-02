'use client';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [onError, setOnError] = useState('');
  const router = useRouter();

  const [signUpHandler] = useMutation(signUpMutation, {
    variables: {
      username,
      email,
    },

    onError: (error) => {
      setOnError(error.message);
    },

    onCompleted: () => {
      router.refresh();
    },
  });

  console.log('SignUp Form: ', username, password, email);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1>Login</h1>
        <div>
          <label>
            username
            <input
              className="form-input"
              value={username}
              onChange={(event) => {
                setUsername(event.currentTarget.value);
              }}
            />
          </label>
          <br />
          <label>
            email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </label>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>
          <button
            onClick={async () => {
              await signUpHandler();
            }}
          >
            Login
          </button>
        </div>
        <div className="error">{onError}</div>
      </div>
    </div>
  );
}
