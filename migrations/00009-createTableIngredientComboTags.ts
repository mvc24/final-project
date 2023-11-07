import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      ingredient_combo_tags (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        combo_id INTEGER NOT NULL REFERENCES combos (id),
        tag_id INTEGER NOT NULL REFERENCES tags (id)
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE ingredient_combo_tags `;
}
