import { Sql } from 'postgres';

export type Combo = {
  id: number;
};
export const combos: Combo[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
  { id: 17 },
  { id: 18 },
  { id: 19 },
  { id: 39 },
  { id: 49 },
  { id: 57 },
  { id: 59 },
  { id: 68 },
  { id: 69 },
  { id: 79 },
  { id: 83 },
  { id: 84 },
  { id: 87 },
  { id: 96 },
  { id: 119 },
  { id: 120 },
  { id: 123 },
  { id: 126 },
  { id: 129 },
];

export async function up(sql: Sql) {
  for (const combo of combos) {
    await sql`
      INSERT INTO
        combos (id)
      VALUES
        (
          ${combo.id}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const combo of combos) {
    await sql`
      DELETE FROM combos
      WHERE
        id = ${combo.id}
    `;
  }
}
