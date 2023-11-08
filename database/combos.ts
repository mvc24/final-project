import 'server-only';
import { cache } from 'react';
import { Combo } from '../app/data/combosTagsPairsData';
import { sql } from '../database/connect';

export const getCombos = cache(async () => {
  const combos = await sql<Combo[]>`
    SELECT
      *
    FROM
      combos
  `;
  return combos;
});

export const getComboByID = cache(async (id: number) => {
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
