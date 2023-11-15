import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      comments (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id),
        body text NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE comments;`;
}
