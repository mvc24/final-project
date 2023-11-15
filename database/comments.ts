import { cache } from 'react';
import { Comment } from '../util/types';
import { sql } from './connect';

export const getComments = cache(async () => {
  const comments = await sql<Comment[]>`
    SELECT
      comments.id,
      users.username,
      comments.body,
      comments.created_at
    FROM
      comments AS comments
      INNER JOIN users ON users.id = comments.user_id;
  `;
  return comments;
});

export const getCommentsByUserId = cache(async (username: string) => {
  const comments = await sql<Comment[]>`
    SELECT
      comments.id,
      users.username,
      comments.body,
      comments.created_at
    FROM
      comments AS comments
      INNER JOIN users ON users.id = comments.user_id
    WHERE
      username = ${username};
  `;
  return comments;
});

export const createComment = cache(async (userId: number, body: string) => {
  const [newComment] = await sql<Comment[]>`
    INSERT INTO
      comments (
        user_id,
        body
      )
    VALUES
      (
        ${userId},
        ${body}
      )
  `;
  return newComment;
});

export const deleteComment = cache(async (id: number) => {
  const [comment] = await sql<Comment[]>`
    DELETE FROM comments
    WHERE
      id = ${id}
  `;
  return comment;
});
