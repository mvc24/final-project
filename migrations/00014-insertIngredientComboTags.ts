import { Sql } from 'postgres';

export type ComboTagPair = {
  comboId: number;
  tagID: number;
};

export const comboTagPairs: ComboTagPair[] = [
  { comboId: 1, tagID: 11 },
  { comboId: 1, tagID: 1 },
  { comboId: 1, tagID: 14 },
  { comboId: 1, tagID: 19 },
  { comboId: 1, tagID: 20 },
  { comboId: 2, tagID: 11 },
  { comboId: 2, tagID: 1 },
  { comboId: 2, tagID: 4 },
  { comboId: 2, tagID: 15 },
  { comboId: 3, tagID: 11 },
  { comboId: 3, tagID: 1 },
  { comboId: 3, tagID: 3 },
  { comboId: 3, tagID: 4 },
  { comboId: 3, tagID: 17 },
  { comboId: 4, tagID: 11 },
  { comboId: 4, tagID: 1 },
  { comboId: 4, tagID: 12 },
  { comboId: 4, tagID: 20 },
  { comboId: 4, tagID: 21 },
  { comboId: 5, tagID: 11 },
  { comboId: 5, tagID: 1 },
  { comboId: 5, tagID: 15 },
  { comboId: 6, tagID: 11 },
  { comboId: 6, tagID: 1 },
  { comboId: 6, tagID: 3 },
  { comboId: 6, tagID: 15 },
  { comboId: 6, tagID: 12 },
  { comboId: 6, tagID: 20 },
  { comboId: 6, tagID: 19 },
  { comboId: 7, tagID: 11 },
  { comboId: 7, tagID: 1 },
  { comboId: 7, tagID: 15 },
  { comboId: 7, tagID: 18 },
  { comboId: 8, tagID: 9 },
  { comboId: 8, tagID: 10 },
  { comboId: 8, tagID: 1 },
  { comboId: 8, tagID: 15 },
  { comboId: 8, tagID: 20 },
  { comboId: 8, tagID: 19 },
  { comboId: 9, tagID: 9 },
  { comboId: 9, tagID: 10 },
  { comboId: 9, tagID: 1 },
  { comboId: 9, tagID: 3 },
  { comboId: 9, tagID: 15 },
  { comboId: 9, tagID: 19 },
  { comboId: 10, tagID: 9 },
  { comboId: 10, tagID: 10 },
  { comboId: 10, tagID: 2 },
  { comboId: 10, tagID: 18 },
  { comboId: 11, tagID: 9 },
  { comboId: 11, tagID: 10 },
  { comboId: 11, tagID: 1 },
  { comboId: 11, tagID: 5 },
  { comboId: 11, tagID: 19 },
  { comboId: 11, tagID: 18 },
  { comboId: 12, tagID: 8 },
  { comboId: 12, tagID: 9 },
  { comboId: 12, tagID: 1 },
  { comboId: 12, tagID: 3 },
  { comboId: 12, tagID: 12 },
  { comboId: 12, tagID: 19 },
  { comboId: 13, tagID: 8 },
  { comboId: 13, tagID: 9 },
  { comboId: 13, tagID: 1 },
  { comboId: 13, tagID: 3 },
  { comboId: 13, tagID: 13 },
  { comboId: 13, tagID: 12 },
  { comboId: 13, tagID: 20 },
  { comboId: 14, tagID: 8 },
  { comboId: 14, tagID: 9 },
  { comboId: 14, tagID: 1 },
  { comboId: 14, tagID: 3 },
  { comboId: 14, tagID: 16 },
  { comboId: 15, tagID: 8 },
  { comboId: 15, tagID: 1 },
  { comboId: 15, tagID: 3 },
  { comboId: 15, tagID: 16 },
  { comboId: 15, tagID: 20 },
  { comboId: 15, tagID: 19 },
  { comboId: 16, tagID: 8 },
  { comboId: 16, tagID: 11 },
  { comboId: 16, tagID: 1 },
  { comboId: 16, tagID: 6 },
  { comboId: 16, tagID: 14 },
  { comboId: 16, tagID: 20 },
  { comboId: 16, tagID: 16 },
  { comboId: 17, tagID: 8 },
  { comboId: 17, tagID: 1 },
  { comboId: 17, tagID: 6 },
  { comboId: 17, tagID: 16 },
  { comboId: 17, tagID: 20 },
  { comboId: 18, tagID: 8 },
  { comboId: 18, tagID: 1 },
  { comboId: 18, tagID: 3 },
  { comboId: 18, tagID: 16 },
  { comboId: 18, tagID: 20 },
  { comboId: 18, tagID: 19 },
  { comboId: 19, tagID: 8 },
  { comboId: 19, tagID: 1 },
  { comboId: 19, tagID: 3 },
  { comboId: 19, tagID: 13 },
  { comboId: 19, tagID: 12 },
  { comboId: 19, tagID: 20 },
];

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
  for (const comboTag of comboTagPairs) {
    await sql`
      DELETE FROM ingredient_combo_tags
      WHERE
        id = ${comboTag.comboId}
    `;
  }
}
