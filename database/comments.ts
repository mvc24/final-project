import { cache } from 'react';
import { Comment, NewComment } from '../util/types';
import { sql } from './connect';

export const getComments = cache(async () => {
  const comments = await sql<Comment[]>`
    SELECT
      comments.id,
      comments.user_id,
      users.username,
      comments.body,
      ingredients.id AS ingredient_id,
      ingredients.slug
    FROM
      comments AS comments
      INNER JOIN users ON users.id = comments.user_id
      INNER JOIN ingredients ON ingredients.id = comments.ingredient_id;
  `;
  return comments;
});

export const getCommentsByUsername = cache(async (username: string) => {
  const comments = await sql<Comment[]>`
    SELECT
      comments.id,
      comments.user_id,
      users.username,
      comments.body,
      ingredients.id AS ingredient_id,
      ingredients.slug
    FROM
      comments AS comments
      INNER JOIN users ON users.id = comments.user_id
      INNER JOIN ingredients ON ingredients.id = comments.ingredient_id
    WHERE
      username = ${username};
  `;
  return comments;
});

export const getCommentsByIngredientId = cache(async (ingredientId: number) => {
  const comments = await sql<Comment[]>`
    SELECT
      comments.id,
      comments.user_id,
      users.username,
      comments.body,
      ingredients.id AS ingredient_id,
      ingredients.slug
    FROM
      comments AS comments
      INNER JOIN users ON users.id = comments.user_id
      INNER JOIN ingredients ON ingredients.id = comments.ingredient_id
    WHERE
      ingredient_id = ${ingredientId}
  `;
  return comments;
});

export const getCommentsByIngredientSlug = cache(async (slug: string) => {
  const comments = await sql<Comment[]>`
    SELECT
      comments.id,
      comments.user_id,
      users.username,
      comments.body,
      ingredients.id AS ingredient_id,
      ingredients.slug AS slug
    FROM
      comments AS comments
      INNER JOIN users ON users.id = comments.user_id
      INNER JOIN ingredients ON ingredients.id = comments.ingredient_id
    WHERE
      slug = ${slug}
  `;
  return comments;
});

export const createComment = cache(
  async (userId: number, body: string, ingredientId: number) => {
    const [newComment] = await sql<NewComment[]>`
      INSERT INTO
        comments (
          user_id,
          body,
          ingredient_id
        )
      VALUES
        (
          ${userId},
          ${body},
          ${ingredientId}
        ) RETURNING *
    `;
    return newComment;
  },
);

export const deleteComment = cache(async (id: number) => {
  const [comment] = await sql<Comment[]>`
    DELETE FROM comments
    WHERE
      id = ${id}
  `;
  return comment;
});
