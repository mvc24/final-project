import Link from 'next/link';
import { getMainIngredients } from '../../database/ingredients';
import { Ingredient } from '../../util/types';

type Props = {
  ingredients: Ingredient[];
};

export default async function IngredientLinks({ ingredients }: Props) {
  const mainIngredients = getMainIngredients();
  // console.log('props on IngredientLinks: ', ingredients);

  return (
    <ul>
      {(await mainIngredients).map((ingredient) => (
        <li key={`ingredient-${ingredient.id}`}>
          <Link href={`/ingredients/${ingredient.slug}`}>
            {ingredient.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
