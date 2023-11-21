'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { useState } from 'react';
import { Comment } from '../../../../util/types';

const createCommentMutation = gql`
  mutation CreateComment($userId: ID!, $body: String!, $ingredientId: Int!) {
    createComment(userId: $userId, body: $body, ingredientId: $ingredientId) {
      id
      userId
      body
      ingredientId
    }
  }
`;

const getComments = gql`
  query GetComments {
    comments {
      id
      username
      body
      ingredientId
      slug
    }
  }
`;

export default function CreateCommentForm({
  userId,
  ingredientId,
}: {
  userId: number;
  ingredientId: number;
}) {
  const [body, setBody] = useState('');
  const [onError, setOnError] = useState('');
  const router = useRouter();

  const { data, refetch } = useSuspenseQuery<Comment>(getComments);

  const [createCommentHandler] = useMutation(createCommentMutation, {
    variables: {
      userId,
      body,
      ingredientId,
    },
    onError: (error) => {
      console.log('onError', onError);
      setOnError(error.message);
    },
    onCompleted: async () => {
      setOnError('');
      setBody('');
      await router.refresh();
    },
  });
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await createCommentHandler();
      }}
      className="form-control"
    >
      <div className="label">
        <textarea
          title="body"
          value={body}
          onChange={(event) => setBody(event.currentTarget.value)}
          placeholder="Leave a comment!"
          className="textarea rounded-3xl border-main-400 "
          required
        />
      </div>

      <div className="mx-auto">
        <button className="btn bg-main-200 text-main-900 text-md tracking-wide align-middle rounded-full hover:bg-main-400 lowercase">
          Comment
        </button>
      </div>
    </form>
  );
}
