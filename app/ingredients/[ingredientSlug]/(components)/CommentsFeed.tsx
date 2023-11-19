import { getCommentsByIngredientSlug } from '../../../../database/comments';

type Props = {
  slug: string;
};

export default async function CommentsFeed({ slug }: Props) {
  const showComments = await getCommentsByIngredientSlug(slug);

  console.log('data on comments feed: ', showComments);
  return (
    <div>
      <div className="container m-auto">
        <h2 className="font-bold text-decoration-600 text-2xl/loose">
          comments
        </h2>
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
