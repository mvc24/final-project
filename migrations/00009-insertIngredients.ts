import { Sql } from 'postgres';
import { ingredients } from '../database/(content)/data/ingredients';

export async function up(sql: Sql) {
  for (const ingredient of ingredients) {
    await sql`
      INSERT INTO
        ingredients (
          name,
          image,
          description,
          recipe
        )
      VALUES
        (
          ${ingredient.name},
          ${ingredient.image},
          ${ingredient.description},
          ${ingredient.recipe}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const ingredient of ingredients) {
    await sql`
      DELETE FROM how_to
      WHERE
        id = ${ingredient.id}
    `;
  }
}
