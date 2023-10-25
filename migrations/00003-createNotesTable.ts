import { Sql } from 'postgres';

export type Note = {
  id: number;
  userId: number;
  textContent: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE notes (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      text_content text NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE notes
  `;
}
