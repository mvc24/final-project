import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      ingredients (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(80) UNIQUE,
        image VARCHAR(200),
        description TEXT,
        recipe TEXT
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE ingredients `;
}
