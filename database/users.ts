import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../util/types';

export const createUser = cache(
  async (username: string, email: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          username,
          email,
          password_hash
        )
      VALUES
        (
          ${username},
          ${email.toLocaleLowerCase()},
          ${passwordHash}
        ) RETURNING id,
        username,
        email,
        password_hash
    `;
    return user;
  },
);

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
  `;
  return users;
});

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<User[]>`
      SELECT
        *
      FROM
        users
      WHERE
        username = ${username}
    `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<
    { id: number; username: string; email: string; passwordHash: string }[]
  >`
    SELECT
      users.id,
      users.username,
      users.email,
      users.password_hash
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return user;
});

export const deleteUserById = cache(async (id: number) => {
  await sql`
    DELETE FROM users
    WHERE
      id = ${id}
  `;
});
