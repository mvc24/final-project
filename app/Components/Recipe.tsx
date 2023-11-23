type RecipeProps = {
  ingredient: {
    recipe: string | string[] | null;
    slug: string | null;
  };
};

export default function Recipe({ ingredient }: RecipeProps) {
  if (!ingredient.recipe) return null;

  const paragraphs = Array.isArray(ingredient.recipe)
    ? ingredient.recipe
    : ingredient.recipe.split('\n');

  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph) => (
        <p key={`${ingredient.slug}-recipe`}>{paragraph}</p>
      ))}
    </div>
  );
}
