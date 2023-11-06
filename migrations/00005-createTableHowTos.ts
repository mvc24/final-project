import { Sql } from 'postgres';

export type HowTo = {
  id: number;
  instruction: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      how_to (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        instruction VARCHAR(200) NOT NULL
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE how_to `;
}
