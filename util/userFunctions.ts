import { gql } from '@apollo/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getUserByUsername } from '../database/users';
import { getClient } from './apolloClient';

const { data } = getClient().query({
  query: gql`
    query User($username: String!) {
      user(username: $username) {
        id
        username
        email
        passwordHash
      }
    }
  `,
});

export async function setTokenCookieOnLogin(args: {
  username: string;
  password: string;
}) {
  const user = await getUserByUsername(data.username);
}
