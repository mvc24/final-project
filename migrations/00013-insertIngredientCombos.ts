import { Sql } from 'postgres';

export type IngredientComboPair = {
  comboId: number | null;
  ingredientId: number | null;
};

export type IngredientComboPairWithId = {
  id: number;
  comboId: number | null;
  ingredientId: number | null;
};

export const ingredientComboPairs: IngredientComboPair[] = [
  { comboId: 1, ingredientId: 2 },
  { comboId: 1, ingredientId: 62 },
  { comboId: 1, ingredientId: 134 },
  { comboId: 1, ingredientId: 51 },
  { comboId: 2, ingredientId: 2 },
  { comboId: 2, ingredientId: 140 },
  { comboId: 2, ingredientId: 25 },
  { comboId: 2, ingredientId: 141 },
  { comboId: 2, ingredientId: 48 },
  { comboId: 3, ingredientId: 3 },
  { comboId: 3, ingredientId: 31 },
  { comboId: 3, ingredientId: 49 },
  { comboId: 3, ingredientId: 21 },
  { comboId: 3, ingredientId: 48 },
  { comboId: 3, ingredientId: 136 },
  { comboId: 4, ingredientId: 4 },
  { comboId: 4, ingredientId: 48 },
  { comboId: 4, ingredientId: 142 },
  { comboId: 4, ingredientId: 52 },
  { comboId: 5, ingredientId: 4 },
  { comboId: 5, ingredientId: 42 },
  { comboId: 5, ingredientId: 52 },
  { comboId: 5, ingredientId: 48 },
  { comboId: 5, ingredientId: 33 },
  { comboId: 5, ingredientId: 111 },
  { comboId: 6, ingredientId: 6 },
  { comboId: 6, ingredientId: 50 },
  { comboId: 6, ingredientId: 98 },
  { comboId: 6, ingredientId: 21 },
  { comboId: 6, ingredientId: 48 },
  { comboId: 7, ingredientId: 6 },
  { comboId: 7, ingredientId: 19 },
  { comboId: 7, ingredientId: 99 },
  { comboId: 7, ingredientId: 110 },
  { comboId: 7, ingredientId: 134 },
  { comboId: 8, ingredientId: 5 },
  { comboId: 8, ingredientId: 21 },
  { comboId: 8, ingredientId: 25 },
  { comboId: 8, ingredientId: 122 },
  { comboId: 8, ingredientId: 48 },
  { comboId: 9, ingredientId: 5 },
  { comboId: 9, ingredientId: 48 },
  { comboId: 9, ingredientId: 58 },
  { comboId: 9, ingredientId: 91 },
  { comboId: 9, ingredientId: 102 },
  { comboId: 9, ingredientId: 70 },
  { comboId: 10, ingredientId: 7 },
  { comboId: 10, ingredientId: 55 },
  { comboId: 10, ingredientId: 56 },
  { comboId: 10, ingredientId: 124 },
  { comboId: 10, ingredientId: 22 },
  { comboId: 10, ingredientId: 127 },
  { comboId: 10, ingredientId: 61 },
  { comboId: 11, ingredientId: 7 },
  { comboId: 11, ingredientId: 60 },
  { comboId: 11, ingredientId: 62 },
  { comboId: 11, ingredientId: 126 },
  { comboId: 11, ingredientId: 135 },
  { comboId: 11, ingredientId: 51 },
  { comboId: 11, ingredientId: 134 },
  { comboId: 12, ingredientId: 1 },
  { comboId: 12, ingredientId: 15 },
  { comboId: 12, ingredientId: 21 },
  { comboId: 12, ingredientId: 49 },
  { comboId: 12, ingredientId: 76 },
  { comboId: 13, ingredientId: 1 },
  { comboId: 13, ingredientId: 20 },
  { comboId: 13, ingredientId: 64 },
  { comboId: 13, ingredientId: 126 },
  { comboId: 14, ingredientId: 3 },
  { comboId: 14, ingredientId: 12 },
  { comboId: 14, ingredientId: 81 },
  { comboId: 14, ingredientId: 20 },
  { comboId: 14, ingredientId: 21 },
  { comboId: 14, ingredientId: 84 },
  { comboId: 15, ingredientId: 8 },
  { comboId: 15, ingredientId: 12 },
  { comboId: 15, ingredientId: 111 },
  { comboId: 15, ingredientId: 48 },
  { comboId: 16, ingredientId: 8 },
  { comboId: 16, ingredientId: 68 },
  { comboId: 16, ingredientId: 30 },
  { comboId: 16, ingredientId: 105 },
  { comboId: 17, ingredientId: 9 },
  { comboId: 17, ingredientId: 29 },
  { comboId: 17, ingredientId: 30 },
  { comboId: 17, ingredientId: 129 },
  { comboId: 17, ingredientId: 21 },
  { comboId: 17, ingredientId: 8 },
  { comboId: 17, ingredientId: 105 },
  { comboId: 18, ingredientId: 9 },
  { comboId: 18, ingredientId: 21 },
  { comboId: 18, ingredientId: 64 },
  { comboId: 18, ingredientId: 126 },
  { comboId: 18, ingredientId: 102 },
  { comboId: 18, ingredientId: 48 },
  { comboId: 18, ingredientId: 128 },
  { comboId: 19, ingredientId: 1 },
  { comboId: 19, ingredientId: 11 },
  { comboId: 19, ingredientId: 12 },
  { comboId: 19, ingredientId: 114 },
];

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
