import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Ingredient } from '../util/types';

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

export const getMainIngredients = cache(async () => {
  const mainIngredients = await sql<Ingredient[]>`
    SELECT
      *
    FROM
      ingredients
    WHERE
      id < 10
  `;
  return mainIngredients;
});

export const getMainIngredientsById = cache(async (id: number) => {
  const mainIngredientsById = await sql<Ingredient[]>`
    SELECT
      *
    FROM
      ingredients
    WHERE
      id < 10
      AND id = ${id}
  `;
  return mainIngredientsById;
});
