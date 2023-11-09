import 'server-only';
import { cache } from 'react';
import { IngredientComboPairWithId } from '../app/data/ingredientComboPairsData';
import { sql } from '../database/connect';

export type IngredientCombo = {
  comboId: number;
  ingredientNames: string[] | null;
};

export const getIngredientComboPairs = cache(async () => {
  const ingredientComboPairs = await sql<IngredientComboPairWithId[]>`
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
