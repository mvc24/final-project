type DescriptionProps = {
  ingredient: {
    description: string | string[] | null;
    slug: string | null;
  };
};

export default function Description({ ingredient }: DescriptionProps) {
  if (!ingredient.description) return null;

  const paragraphs = Array.isArray(ingredient.description)
    ? ingredient.description
    : ingredient.description.split('\n');

  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph) => (
        <p className="" key={`${ingredient.slug}-description`}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
