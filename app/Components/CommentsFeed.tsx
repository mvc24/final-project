import { getCommentsByIngredientSlug } from '../../database/comments';

type Props = {
  slug: string;
};

export default async function CommentsFeed({ slug }: Props) {
  const showComments = await getCommentsByIngredientSlug(slug);

  // console.log('data on comments feed: ', showComments);
  return (
    <div>
      <h2 className="font-bold text-decoration-600 mx-auto text-center text-2xl/loose">
        comments
      </h2>
      {showComments.map((comment) => {
        return (
          <div className="chat chat-start" key={`comment-${comment.id}`}>
            <p className="chat-header text-sm font-light text-main-800 indent-2 mb-2">
              {comment.username}
            </p>
            <p className="chat-bubble max-w-max bg-main-100 text-main-900 drop-shadow-lg">
              {comment.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
