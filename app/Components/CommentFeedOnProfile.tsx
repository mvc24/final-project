import {
  getCommentsByIngredientSlug,
  getCommentsByUsername,
} from '../../database/comments';

type Props = {
  username: string;
};

export default async function CommentsFeedOnProfile({ username }: Props) {
  const showComments = await getCommentsByUsername(username);

  // console.log('data on profile comments: ', showComments);
  return (
    <div>
      {showComments.map((comment) => {
        return (
          <div
            className="mx-auto w-fit drop-shadow-md"
            key={`comment-${comment.id}`}
          >
            <div className="text-sm bg-main-50 font-light pt-2 text-main-800 pb-1 rounded-t-xl">
              location: {comment.slug}
            </div>
            <div className="bg-main-100 px-4 pb-2 pt-1 rounded-b-xl text-main-900 ">
              {comment.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}
