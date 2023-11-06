import { Sql } from 'postgres';
import { howTos } from '../database/(content)/data/howtos';

export async function up(sql: Sql) {
  for (const howTo of howTos) {
    await sql`
      INSERT INTO
        how_to (
          instruction
        )
      VALUES
        (
          ${howTo.instruction}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const howTo of howTos) {
    await sql`
      DELETE FROM how_to
      WHERE
        id = ${howTo.id}
    `;
  }
}
