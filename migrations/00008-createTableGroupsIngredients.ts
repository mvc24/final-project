import { Sql } from 'postgres';

export type GroupIngredientPairs = {
  groupId: number;
  ingredientId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      groups_ingredients (
        group_id INTEGER NOT NULL,
        ingredient_id INTEGER NOT NULL REFERENCES ingredients (id),
        PRIMARY KEY (
          group_id,
          ingredient_id
        )
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE groups_ingredients `;
}
