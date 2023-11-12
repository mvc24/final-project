import { gql } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import {
  getIngredientComboObjects,
  getIngredientCombos,
} from '../../database/ingredientCombos';
import { getClient } from '../../util/apolloClient';
import { ingredientCombosMapped } from '../../util/dbToGql';
import { MainIngredientResponse } from '../../util/types';
import Card from './Card';

type Props = {
  id: number;
  name: string;
  image: string;
};

export default async function Ingredients(props: Props) {
  const url = getCldImageUrl({
    width: 960,
    height: 600,
    src: 'sage/fennel_eclibx',
  });
  console.log('url: ', url);
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
    <div className="grid grid-cols-3">
      <h1 className="col-span-3 mx-auto">the main ingredients</h1>

      {data.mainIngredients.map((ingredient) => {
        const url = getCldImageUrl({
          width: 960,
          height: 600,
          src: ingredient.image,
        });
        console.log('ingredient in map: ', ingredient);
        return (
          <div className="col-span-1" key={`ingredient-div-${ingredient.id}`}>
            <Link href={`/ingredients/${ingredient.name}`}>
              <Card props={ingredient} />
              {/* <img src={url} alt={ingredient.name} height="200" width="200" />
              <h3>{ingredient.name}</h3> */}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
