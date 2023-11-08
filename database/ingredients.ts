import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Ingredient } from '../migrations/00003-createTableIngredients';

export const getIngredients = cache(async () => {
  const ingredients = await sql<Ingredient[]>`
    SELECT
      *
    FROM
      ingredients
  `;
  return ingredients;
});

export const getIngredientByID = cache(async (id: number) => {
  const [ingredient] = await sql<Ingredient[]>`
    SELECT
      *
    FROM
      ingredients
    WHERE
      id = ${id}
  `;
  return ingredient;
});
