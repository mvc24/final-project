import { Sql } from 'postgres';
import { seasons } from '../database/(content)/data/seasons';

export async function up(sql: Sql) {
  for (const season of seasons) {
    await sql`
      INSERT INTO
        seasons (name)
      VALUES
        (
          ${season.name}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const season of seasons) {
    await sql`
      DELETE FROM seasons
      WHERE
        id = ${seasons.id}
    `;
  }
}
