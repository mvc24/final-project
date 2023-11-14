import { Sql } from 'postgres';
import { combos } from '../app/data/combosTagsPairsData';

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
