import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Tag } from '../migrations/00012-insertTags';

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

export const getTagTypes = cache(async () => {
  const tagTypes = await sql<{ type: string }[]>`
    SELECT
      type
    FROM
      tags
    GROUP BY
      type
  `;
  return tagTypes;
});
