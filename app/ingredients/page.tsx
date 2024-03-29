import { gql } from '@apollo/client';
import Link from 'next/link';
import { getClient } from '../../util/apolloClient';
import { MainIngredientResponse } from '../../util/types';
import Card from '../Components/Card';

export default async function Ingredients() {
  const { data } = await getClient().query<MainIngredientResponse>({
    query: gql`
      query GetMainIngredients {
        mainIngredients {
          id
          name
          slug
          image
        }
      }
    `,
  });

  return (
    <div className="grid grid-cols-1 p-10 gap-4 md:grid-cols-3 w-max mx-auto">
      {data.mainIngredients.map((ingredient) => {
        return (
          <div className="col-span-1" key={`ingredient-div-${ingredient.id}`}>
            <Link href={`/ingredients/${ingredient.slug}`}>
              <Card props={ingredient} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
