import { gql } from '@apollo/client';
import Link from 'next/link';
import { getClient } from '../../util/apolloClient';
import { MainIngredientResponse } from '../../util/types';
import Card from './Card';

export default async function Ingredients() {
  // console.log('getIngredientComboObjects: ', await getIngredientComboObjects());
  // console.log('getIngredientCombos: ', await getIngredientCombos());
  // console.log('mapped combos: ', await ingredientCombosMapped());

  const { data } = await getClient().query<MainIngredientResponse>({
    query: gql`
      query GetMainIngredients {
        mainIngredients {
          id
          name
          image
        }
      }
    `,
  });

  return (
    <div className="grid grid-cols-1 p-10 gap-4 md:grid-cols-3">
      {data.mainIngredients.map((ingredient) => {
        return (
          <div className="col-span-1" key={`ingredient-div-${ingredient.id}`}>
            <Link href={`/ingredients/${ingredient.name}`}>
              <Card props={ingredient} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
