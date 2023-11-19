'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
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
      await refetch();
    },
  });
  return (
    <div className="">
      <div>
        <div className="">
          <textarea
            title="body"
            onChange={(event) => setBody(event.currentTarget.value)}
            placeholder="Leave a comment!"
            className="textarea textarea-bordered"
            required
          />
        </div>

        <div className="">
          <button
            onClick={async () => await createCommentHandler()}
            className="btn bg-main-200 text-main-900 p-4 rounded-full hover:bg-main-400 lowercase"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
