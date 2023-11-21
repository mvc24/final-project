import { Sql } from 'postgres';
import { tags } from '../app/data/tagsData';

export async function up(sql: Sql) {
  for (const tag of tags) {
    await sql`
      INSERT INTO
        tags (
          type,
          name
        )
      VALUES
        (
          ${tag.type},
          ${tag.name}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const tag of tags) {
    await sql`
      DELETE FROM tags
      WHERE
        id = ${tag.id}
    `;
  }
}
