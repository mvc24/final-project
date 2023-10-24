import { cache } from 'react';
import { sql } from '../database/connect';

export type User = {
  id: number;
  username: string;
  email: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

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

export const getUsers = cache(async () => {
  const users = await sql<UserWithPasswordHash[]>`
    SELECT * FROM users
  `;
  return users;
});

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

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
    INNER JOIN
      sessions ON
      (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()

      )

  `;
  return user;
});
