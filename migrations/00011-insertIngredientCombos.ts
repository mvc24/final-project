import { Sql } from 'postgres';
import { ingredientComboPairs } from '../app/data/ingredientComboPairsData';

export async function up(sql: Sql) {
  for (const ingredientCombo of ingredientComboPairs) {
    await sql`
      INSERT INTO
        ingredient_combos (
          combo_id,
          ingredient_id
        )
      VALUES
        (
          ${ingredientCombo.comboId},
          ${ingredientCombo.ingredientId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const ingredientCombo of ingredientComboPairs) {
    await sql`
      DELETE FROM ingredient_combos
      WHERE
        id = ${ingredientCombo.comboId}
    `;
  }
}
