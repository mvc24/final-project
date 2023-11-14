import {
  getIngredientCombos,
  getIngredientCombosWithSlug,
  IngredientCombo,
  IngredientComboWithSlug,
} from '../../../database/ingredientCombos';
import { getMainIngredientsBySlug } from '../../../database/ingredients';

type Props = {
  params: {
    ingredientSlug: string;
  };
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

  const information: IngredientComboWithSlug[] =
    await getIngredientCombosWithSlug();
  if (information.length === 0) {
    return 'not found';
  }
  // const result = information.filter(
  //   (ingredient) =>
  //     ingredient.ingredientNames![0] === props.params.ingredientSlug,
  // );

  const result = information.filter((ingredient) => {
    if (ingredient.ingredientNames![0]?.includes(props.params.ingredientSlug)) {
      return ingredient.ingredientNames;
    }
    return ingredient.ingredientNames;
  });

  console.log('result: ', result);
  console.log('data on ingredient page: ', data);

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
          console.log('ingredientString: ', ingredientString);
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
