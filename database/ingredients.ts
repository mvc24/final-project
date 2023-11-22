import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';

export const getIngredients = cache(async () => {
  const ingredients = await sql<
    {
      id: number;
      name: string;
      slug: string | null;
      image: string | null;
      description: string | null;
      recipe: string | null;
    }[]
  >`
    SELECT
      *
    FROM
      ingredients
  `;
  return ingredients;
});

export const getIngredientByID = cache(async (id: number) => {
  const [ingredient] = await sql<
    {
      id: number;
      name: string;
      slug: string | null;
      image: string | null;
      description: string | null;
      recipe: string | null;
    }[]
  >`
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
  const mainIngredients = await sql<
    {
      id: number;
      name: string;
      slug: string | null;
      image: string | null;
      description: string | null;
      recipe: string | null;
    }[]
  >`
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
  const mainIngredientsById = await sql<
    {
      id: number;
      name: string;
      slug: string | null;
      image: string | null;
      description: string | null;
      recipe: string | null;
    }[]
  >`
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

export const getMainIngredientBySlug = cache(async (slug: string) => {
  const [mainIngredientBySlug] = await sql<
    {
      id: number;
      name: string;
      slug: string | null;
      image: string | null;
      description: string | null;
      recipe: string | null;
    }[]
  >`
    SELECT
      *
    FROM
      ingredients
    WHERE
      slug = ${slug}
  `;

  return mainIngredientBySlug;
});
