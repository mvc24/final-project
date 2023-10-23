import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  eMail: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(30) NOT NULL UNIQUE,
      password_hash varchar(80) NOT NULL,
      email: varchar(50) NOT NULL UNIQUE

    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
