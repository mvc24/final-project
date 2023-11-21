import { cache } from 'react';
import { ComboTags } from '../util/types';
import { sql } from './connect';

export const getIngredientComboTags = cache(async () => {
  const ingredientComboTags = await sql<ComboTags[]>`
    SELECT
      ingredient_combo_tags.combo_id,
      tags.type,
      ARRAY_AGG (
        tags.name
      ) AS tag_names
    FROM
      ingredient_combo_tags
      JOIN tags ON ingredient_combo_tags.tag_id = tags.id
    GROUP BY
      ingredient_combo_tags.combo_id,
      tags.type
    ORDER BY
      ingredient_combo_tags.combo_id,
      tags.type;
  `;
  return ingredientComboTags;
});

export const getIngredientComboTagsById = cache(async (id: number) => {
  const [ingredientComboTag] = await sql<ComboTags[]>`
    SELECT
      ingredient_combo_tags.combo_id,
      tags.type,
      ARRAY_AGG (
        tags.name
      ) AS tag_names
    FROM
      ingredient_combo_tags
      JOIN tags ON ingredient_combo_tags.tag_id = tags.id
    WHERE
      ingredient_combo_tags.combo_id = ${id}
    GROUP BY
      ingredient_combo_tags.combo_id,
      tags.type
    ORDER BY
      ingredient_combo_tags.combo_id,
      tags.type;
  `;
  return ingredientComboTag;
});
