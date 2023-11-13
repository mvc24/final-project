import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';

export type IngredientCombo = {
  comboId: number;
  ingredientNames: string[] | null;
};

export type ComboList = {
  comboId: number;
  ingredientId: number;
  name: string;
};

export type SimpleIngredient = {
  id: number;
  name: string;
};

type JsonAgg = SimpleIngredient[];

export type IngredientComboObject = {
  comboId: number;
  ingredients: JsonAgg | null;
};

export type IngredientComboWithIds = {
  comboId: number;
  ingredientIds: number[] | null;
  ingredientNames: string[] | null;
};

export const getIngredientComboPairs = cache(async () => {
  const ingredientComboPairs = await sql<
    { id: number; comboId: number; ingredientId: number }[]
  >`
    SELECT
      *
    FROM
      ingredient_combos
  `;
  return ingredientComboPairs;
});

export const getIngredientCombos = cache(async () => {
  const ingredientCombos = await sql<IngredientCombo[]>`
    SELECT
      ingredient_combos.combo_id,
      ARRAY_AGG (
        ingredients.name
      ) AS ingredient_names
    FROM
      ingredient_combos
      JOIN ingredients ON ingredient_combos.ingredient_id = ingredients.id
    GROUP BY
      ingredient_combos.combo_id
    ORDER BY
      ingredient_combos.combo_id;
  `;
  return ingredientCombos;
});

export const getIngredientComboByComboId = cache(async (id: number) => {
  const [ingredientCombo] = await sql<IngredientCombo[]>`
    SELECT
      ingredient_combos.combo_id,
      ARRAY_AGG (
        ingredients.name
      ) AS ingredient_names
    FROM
      ingredient_combos
      JOIN ingredients ON ingredient_combos.ingredient_id = ingredients.id
    WHERE
      ingredient_combos.combo_id = ${id}
    GROUP BY
      ingredient_combos.combo_id
  `;
  return ingredientCombo;
});

export const getIngredientCombosWithIngredientIds = cache(async () => {
  const ingredientComboWithIds = await sql<IngredientComboWithIds[]>`
    SELECT
      ingredient_combos.combo_id,
      ARRAY_AGG (
        ingredient_combos.ingredient_id
      ) AS ingredient_ids,
      ARRAY_AGG (
        ingredients.name
      ) AS ingredient_names
    FROM
      ingredient_combos
      JOIN ingredients ON ingredient_combos.ingredient_id = ingredients.id
    GROUP BY
      ingredient_combos.combo_id
    ORDER BY
      ingredient_combos.combo_id;
  `;
  return ingredientComboWithIds;
});

export const getComboList = cache(async () => {
  const comboList = await sql<ComboList[]>`
    SELECT
      ingredient_combos.combo_id,
      ingredient_combos.ingredient_id,
      ingredients.name
    FROM
      ingredient_combos
      JOIN ingredients ON ingredient_combos.ingredient_id = ingredients.id
    GROUP BY
      ingredient_combos.combo_id,
      ingredient_combos.ingredient_id,
      ingredients.name
    ORDER BY
      ingredient_combos.combo_id,
      ingredient_combos.ingredient_id;
  `;
  return comboList;
});

export const getIngredientComboObjects = cache(async () => {
  const ingredientComboObjects = await sql<IngredientComboObject[]>`
    SELECT
      combo_id AS "comboId",
      JSON_AGG (
        JSON_BUILD_OBJECT (
          'id',
          ingredients.id,
          'name',
          ingredients.name
        )
      ) AS "ingredients"
    FROM
      ingredient_combos
      JOIN ingredients ON ingredient_combos.ingredient_id = ingredients.id
    GROUP BY
      combo_id
    ORDER BY
      combo_id;
  `;
  return ingredientComboObjects;
});
