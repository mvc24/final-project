import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import {
  getIngredientCombos,
  IngredientCombo,
} from '../../../database/ingredientCombos';
import { getMainIngredientBySlug } from '../../../database/ingredients';
import { getClient } from '../../../util/apolloClient';
import { Ingredient, MainIngredientProps } from '../../../util/types';
import DisplayComboTags from './ComboTags';
import CreateCommentForm from './CommentForm';
import CommentsFeed from './CommentsFeed';
import Images from './Images';

type Props = {
  params: {
    ingredientSlug: string;
  };
};

export default async function IngredientPage(props: Props) {
  console.log('props.params on ingredient page: ', props.params);

  console.log('single ingredient page props: ', props);

  const mainIngredient = await getMainIngredientBySlug(
    props.params.ingredientSlug,
  );

  if (!mainIngredient) {
    return 'not found';
  }

  const information: IngredientCombo[] = await getIngredientCombos();
  if (information.length === 0) {
    return 'not found';
  }

  const sessionToken = cookies().get('sessionToken');

  const { data } = await getClient().query({
    query: gql`
      query LoggedInUser($token: String!) {
        loggedInUser(token: $token) {
          id
          username
        }
      }
    `,
    variables: {
      token: sessionToken?.value || '',
    },
  });

  // console.log('information: ', information);

  const result = information.filter((ingredient) => {
    if (ingredient.ingredientNames![0]?.includes(props.params.ingredientSlug)) {
      return ingredient.ingredientNames;
    }
    return ingredient.ingredientNames;
  });

  return (
    <div>
      <Images ingredient={mainIngredient} />
      <h1>{mainIngredient.name}</h1>
      <h2>description</h2>
      <div>{mainIngredient.description}</div>
      <br />
      <br />
      <div>{mainIngredient.recipe}</div>
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
                <DisplayComboTags comboId={combo.comboId} />
              </div>
            );
          }
          return null; // If there's no matching ingredient, don't render anything
        })}
      </div>
      <div>
        <CreateCommentForm
          userId={data.loggedInUser.id}
          ingredientId={mainIngredient.id}
        />
        <CommentsFeed slug={props.params.ingredientSlug} />
      </div>
    </div>
  );
}
