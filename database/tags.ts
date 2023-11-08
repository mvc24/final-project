import 'server-only';
import { cache } from 'react';
import { Tag } from '../app/data/tagsData';
import { sql } from '../database/connect';

export const getTags = cache(async () => {
  const tags = await sql<Tag[]>`
    SELECT
      *
    FROM
      tags
  `;
  return tags;
});

export const getTagById = cache(async (id: number) => {
  const [tag] = await sql<Tag[]>`
    SELECT
      *
    FROM
      tags
    WHERE
      id = ${id}
  `;

  return tag;
});
