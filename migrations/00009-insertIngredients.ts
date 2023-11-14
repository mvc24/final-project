import { Sql } from 'postgres';
import { ingredients } from '../app/data/ingredientsData';

export async function up(sql: Sql) {
  for (const ingredient of ingredients) {
    await sql`
      INSERT INTO
        ingredients (
          name,
          slug,
          image,
          description,
          recipe
        )
      VALUES
        (
          ${ingredient.name},
          ${ingredient.slug},
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
      DELETE FROM ingredients
      WHERE
        id = ${ingredient.id}
    `;
  }
}
