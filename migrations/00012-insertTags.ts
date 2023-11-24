import { Sql } from 'postgres';

export type Tag = {
  id: number;
  type: string;
  name: string;
};

export const tags: Tag[] = [
  {
    id: 1,
    type: 'category',
    name: 'savoury',
  },
  {
    id: 2,
    type: 'category',
    name: 'sweet',
  },
  {
    id: 3,
    type: 'category',
    name: 'mediterranean',
  },
  {
    id: 4,
    type: 'category',
    name: 'in an emergency',
  },
  {
    id: 5,
    type: 'category',
    name: 'comfort food',
  },
  {
    id: 6,
    type: 'category',
    name: 'latin american',
  },
  {
    id: 7,
    type: 'season',
    name: 'spring',
  },
  {
    id: 8,
    type: 'season',
    name: 'summer',
  },
  {
    id: 9,
    type: 'season',
    name: 'autumn/fall',
  },
  {
    id: 10,
    type: 'season',
    name: 'winter',
  },
  {
    id: 11,
    type: 'season',
    name: 'anytime',
  },
  {
    id: 12,
    type: 'howto',
    name: 'in the oven',
  },
  {
    id: 13,
    type: 'howto',
    name: 'in the pan',
  },
  {
    id: 14,
    type: 'howto',
    name: 'as dip',
  },
  {
    id: 15,
    type: 'howto',
    name: 'in a pan',
  },
  {
    id: 16,
    type: 'howto',
    name: 'as salad',
  },
  {
    id: 17,
    type: 'howto',
    name: 'as soup',
  },
  {
    id: 18,
    type: 'howto',
    name: 'as pie/quiche',
  },
  {
    id: 19,
    type: 'howto',
    name: 'with pasta',
  },
  {
    id: 20,
    type: 'howto',
    name: 'with bread',
  },
  {
    id: 21,
    type: 'howto',
    name: 'part of a spread',
  },
  {
    id: 22,
    type: 'category',
    name: 'oriental',
  },
  {
    id: 23,
    type: 'instruction',
    name: 'as stew/curry/casserole',
  },
  {
    id: 24,
    type: 'category',
    name: 'asian',
  },
  {
    id: 25,
    type: 'instruction',
    name: 'with rice',
  },
];

export async function up(sql: Sql) {
  for (const tag of tags) {
    await sql`
      INSERT INTO
        tags (
          type,
          name
        )
      VALUES
        (
          ${tag.type},
          ${tag.name}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const tag of tags) {
    await sql`
      DELETE FROM tags
      WHERE
        id = ${tag.id}
    `;
  }
}
