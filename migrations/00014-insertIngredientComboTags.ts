import { Sql } from 'postgres';
import { comboTagPairs } from '../app/data/combosTagsPairsData';
import { ingredientComboPairs } from '../app/data/ingredientComboPairsData';

export async function up(sql: Sql) {
  for (const comboTag of comboTagPairs) {
    await sql`
      INSERT INTO
        ingredient_combo_tags (
          combo_id,
          tag_id
        )
      VALUES
        (
          ${comboTag.comboId},
          ${comboTag.tagID}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const comboTag of ingredientComboPairs) {
    await sql`
      DELETE FROM ingredient_combo_tags
      WHERE
        id = ${comboTag.comboId}
    `;
  }
}
