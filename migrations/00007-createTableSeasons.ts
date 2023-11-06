import { Sql } from 'postgres';

export type Season = {
  id: number;
  name: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      seasons (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(200) NOT NULL
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE seasons `;
}
