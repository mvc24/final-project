import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      tags (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        type VARCHAR(200) NOT NULL,
        name VARCHAR(200) NOT NULL
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE tags `;
}
