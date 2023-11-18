import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import Link from 'next/link';
import {
  getIngredientCombos,
  IngredientCombo,
} from '../../../database/ingredientCombos';
import { getMainIngredientBySlug } from '../../../database/ingredients';
import { getClient } from '../../../util/apolloClient';
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
    <div className="container mx-auto p-2">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link
              href="/"
              className="transition decoration-0 hover:text-decoration-700"
            >
              home
            </Link>
          </li>
          <li>
            <Link
              className="transition decoration-0 hover:text-decoration-700"
              href="/ingredients"
            >
              the ingredients
            </Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-6 gap-8 p-4 ">
        <div className="col-start-1 col-end-4">
          <div className="">
            <h1 className="font-black text-3xl/loose ">
              {mainIngredient.name}
            </h1>

            <div>{mainIngredient.description}</div>
          </div>
        </div>
        <div className="col-start-4 col-end-7">
          <Images ingredient={mainIngredient} />
        </div>
        <div className="col-span-3 col-start-1">
          <h2 className="font-bold text-xl/loose">combinations</h2>
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
                  <div>{ingredientString}</div>
                  <div>
                    <DisplayComboTags
                      comboId={combo.comboId}
                      type=""
                      tagNames={null}
                    />
                  </div>
                </div>
              );
            }
            return null; // If there's no matching ingredient, don't render anything
          })}
        </div>
        <div className="col-span-3 col-start-4">
          <h2 className="font-bold text-xl/loose">recipe</h2>
          <div className="">{mainIngredient.recipe}</div>
        </div>
        <div className="col-start-2 col-span-4 mx-auto">
          {!data.loggedInUser ? (
            <textarea
              className="textarea"
              placeholder="Please log in to leave a comment"
              disabled
            />
          ) : (
            <CreateCommentForm
              userId={data.loggedInUser?.id}
              ingredientId={mainIngredient.id}
            />
          )}
          <CommentsFeed slug={props.params.ingredientSlug} />
        </div>
      </div>
    </div>
  );
}
