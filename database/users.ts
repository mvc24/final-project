// get info from repo

// getUserWithPasswordHashByUsername

// use toLowerCase() on the username when creating it so it will be case insensitive

// just copy/paste for now, correct problems later

import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00000-createTableUsers';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

// (alias) type User = {
//   id: number;
//   username: string;
//   passwordHash: string;
//   email: string;
// }
// import User

export const createUser = cache(
  async (username: string, passwordHash: string, email: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
        (username, password_hash, email)
      VALUES
        (${username.toLowerCase()}, ${passwordHash}, ${email.toLocaleLowerCase()})
      RETURNING
        id,
        username,
        email
    `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username,
      email

    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
    return user;
  },
);
