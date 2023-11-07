import { Sql } from 'postgres';

export type Ingredient = {
  id: number;
  name: string;
  image: string | null;
  description: string | null;
  recipe: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      ingredients (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100) NOT NULL,
        image VARCHAR(200),
        description TEXT,
        recipe TEXT
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE ingredients `;
}
