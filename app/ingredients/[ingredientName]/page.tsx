import { gql } from '@apollo/client';
import Image from 'next/image';
import {
  getIngredientComboObjects,
  getIngredientCombos,
  getIngredientCombosWithIngredientId,
  getIngredientCombosWithIngredientIds,
  IngredientCombo,
} from '../../../database/ingredientCombos';
import {
  getMainIngredientsById,
  getMainIngredientsByName,
} from '../../../database/ingredients';
import { getClient } from '../../../util/apolloClient';
import { Ingredient } from '../../../util/types';

type Props = Ingredient;
type PropsParams = {
  params: {
    ingredientName: string;
  };
};

export default async function IngredientPage(props: PropsParams) {
  // console.log('props.params on ingredient page: ', props.params);
  // console.log(
  //   'getMainIngredientsByName: ',
  //   await getMainIngredientsByName('beans'),
  // );

  const data = await getMainIngredientsByName(props.params.ingredientName);

  if (!data) {
    return 'not found';
  }
  const information: IngredientCombo[] = await getIngredientCombos();
  if (information.length === 0) {
    return 'not found';
  }
  const result = information.filter(
    (ingredient) =>
      ingredient.ingredientNames![0] === props.params.ingredientName,
  );
  console.log('result: ', result);

  return (
    <div>
      <h1>{data.name}</h1>
      <h2>description</h2>
      <div>{data.description}</div>
      <div>{data.recipe}</div>
      <div>
        {result.map((combo) => {
          const ingredients = combo.ingredientNames;
          const ingredientString = ingredients!.join(' + ');
          console.log(ingredientString);
          return (
            <div key={`combos-list-div-${combo.comboId}`}>
              {ingredientString}
            </div>
          );
        })}
      </div>
    </div>
  );
}
