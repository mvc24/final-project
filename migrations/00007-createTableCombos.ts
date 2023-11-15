import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      combos (
        id INTEGER PRIMARY KEY
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE combos `;
}
