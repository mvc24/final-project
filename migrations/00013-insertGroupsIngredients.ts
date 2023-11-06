import { Sql } from 'postgres';
import { groupIngredientPairs } from '../database/(content)/data/groupIngredientPairs';

export async function up(sql: Sql) {
  for (const groupIngredientPair of groupIngredientPairs) {
    await sql`
      INSERT INTO
        groups_ingredients (
          group_id,
          ingredient_id
        )
      VALUES
        (
          ${groupIngredientPair.groupId},
          ${groupIngredientPair.ingredientId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const groupIngredientPair of groupIngredientPairs) {
    await sql`
      DELETE FROM groups_ingredients
      WHERE
        group_id = ${groupIngredientPair.groupId}
    `;
  }
}
