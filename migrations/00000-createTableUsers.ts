import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(30) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(80) NOT NULL
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
