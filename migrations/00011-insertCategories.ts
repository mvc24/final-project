import { Sql } from 'postgres';
import { categories } from '../database/(content)/data/categories';

export async function up(sql: Sql) {
  for (const category of categories) {
    await sql`
      INSERT INTO
        categories (name)
      VALUES
        (
          ${category.name}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const category of categories) {
    await sql`
      DELETE FROM categories
      WHERE
        id = ${category.id}
    `;
  }
}
