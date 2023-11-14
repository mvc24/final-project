import {
  getIngredientCombos,
  IngredientCombo,
} from '../../../database/ingredientCombos';
import { getMainIngredientsBySlug } from '../../../database/ingredients';
import { MainIngredientProps } from '../../../util/types';
import Images from './Images';

type Props = {
  params: {
    ingredientSlug: string;
  };
  props: MainIngredientProps;
};

export default async function IngredientPage(props: Props) {
  console.log('props.params on ingredient page: ', props.params);
  // console.log(
  //   'getMainIngredientsByName: ',
  //   await getMainIngredientsByName('beans'),
  // );

  const data = await getMainIngredientsBySlug(props.params.ingredientSlug);

  if (!data) {
    return 'not found';
  }

  const information: IngredientCombo[] = await getIngredientCombos();
  if (information.length === 0) {
    return 'not found';
  }

  console.log('information: ', information);

  const result = information.filter((ingredient) => {
    if (ingredient.ingredientNames![0]?.includes(props.params.ingredientSlug)) {
      return ingredient.ingredientNames;
    }
    return ingredient.ingredientNames;
  });

  console.log('result: ', result);
  // console.log('result: ', result);
  // console.log('data on ingredient page: ', data);

  return (
    <div>
      <Images props={data} />
      <h1>{data.name}</h1>
      <h2>description</h2>
      <div>{data.description}</div>
      <div>{data.recipe}</div>
      <div>
        {result.map((combo) => {
          const ingredients = combo.ingredientNames || [];
          const matchedIngredients = ingredients.filter(
            (name) =>
              name.toLowerCase() ===
                props.params.ingredientSlug.toLowerCase() ||
              name
                .toLowerCase()
                .includes(props.params.ingredientSlug.toLowerCase()),
          );

          if (matchedIngredients.length > 0) {
            const ingredientString = ingredients.join(' + ');
            console.log('ingredientString: ', ingredientString);
            return (
              <div key={`combos-list-div-${combo.comboId}`}>
                {ingredientString}
              </div>
            );
          }
          return null; // If there's no matching ingredient, don't render anything
        })}
      </div>
    </div>
  );
}
