import 'server-only';
import { cache } from 'react';
import { Combo } from '../app/data/combosTagsPairsData';
import { IngredientComboPair } from '../app/data/ingredientComboPairsData';
import { sql } from '../database/connect';

export const getIngredientCombos = cache(async () => {
  const ingredientCombos = await sql<
    { id: number; comboId: number; ingredientId: number }[]
  >`
    SELECT
      *
    FROM
      ingredient_combos
  `;
  return ingredientCombos;
});

console.log(getIngredientCombos);

export const getIngredientComboByID = cache(async (id: number) => {
  const [combo] = await sql<Combo[]>`
    SELECT
      *
    FROM
      combos
    WHERE
      id = ${id}
  `;
  return combo;
});
