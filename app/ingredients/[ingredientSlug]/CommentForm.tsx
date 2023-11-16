'use client';

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const createCommentMutation = gql`
  mutation CreateComment($userId: ID!, $body: String!) {
    createComment(userId: $userId, body: $body) {
      id
      userId
      body
    }
  }
`;

export default function CreateCommentForm({ userId }: { userId: number }) {
  const [body, setBody] = useState('');
  const [onError, setOnError] = useState('');
  const [commentCreated, setCommentCreated] = useState(false);

  const [createComment] = useMutation(createCommentMutation, {
    variables: {
      userId,
      body,
    },
    onError: (error) => {
      console.log('onError', error);
      setOnError(error.message);
      return onError;
    },
    onCompleted: () => {
      console.log('comment created', commentCreated);
    },
  });
  return (
    <div className="bg-white rounded shadow p-4 max-w-lg">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBody('');
          setCommentCreated(true);
          await createComment();
        }}
      >
        <div className="mb-4">
          <textarea
            title="body"
            onChange={(event) => setBody(event.currentTarget.value)}
            placeholder="Content..."
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mt-6">
          <button className="btn bg-main-200 text-main-900 p-4 rounded-full hover:bg-main-400">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
