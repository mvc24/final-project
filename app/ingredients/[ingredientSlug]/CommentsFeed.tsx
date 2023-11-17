import { getCommentsByIngredientSlug } from '../../../database/comments';

type Props = {
  slug: string;
};

export default async function CommentsFeed({ slug }: Props) {
  const showComments = await getCommentsByIngredientSlug(slug);

  console.log('data on comments feed: ', await showComments);
  return (
    <div>
      <div className="container bg-white rounded shadow p-4">
        <h2>comments</h2>
        {showComments.map((comment) => {
          return (
            <div key={`comment-${comment.id}`}>
              <p className="text-sm">{comment.username}</p>
              <p>{comment.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
