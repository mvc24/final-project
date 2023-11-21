import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import Link from 'next/link';
import {
  getIngredientCombos,
  IngredientCombo,
} from '../../../database/ingredientCombos';
import { getMainIngredientBySlug } from '../../../database/ingredients';
import { getClient } from '../../../util/apolloClient';
import DisplayComboTags from './(components)/ComboTags';
import CreateCommentForm from './(components)/CommentForm';
import CommentsFeed from './(components)/CommentsFeed';
import Description from './(components)/Description';
import Images from './(components)/Images';
import Recipe from './(components)/Recipe';

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
    <div className="container mx-auto p-0">
      <div className="text-sm breadcrumbs mt-4">
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
      <div className="grid grid-cols-6 gap-6 gap-x-12 p-4 lg:mx-24">
        <h1 className="col-span-6 h-8 font-extrabold tracking-wide text-decoration-600 text-4xl/loose mx-auto ">
          {mainIngredient.name}
        </h1>
        <div className="divider grid col-span-full h-0 md:col-span-4 md:col-start-2" />
        <div className="col-span-6 lg:col-span-4 lg:col-start-2">
          <Images ingredient={mainIngredient} />
        </div>
        <div className="col-span-6 mx-auto ">
          <div className="text-md font-light md:columns-2 md:gap-8">
            <Description ingredient={mainIngredient} />
          </div>
        </div>
        <div className="divider grid col-span-full h-0 md:col-span-4 md:col-start-2" />
        <div className="col-span-6 md:col-span-3 col-start-1">
          <h2 className="font-bold mx-auto mb-2 text-center text-decoration-600 text-2xl/loose">
            combinations
          </h2>
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
                <div
                  className="drop-shadow-md"
                  key={`combos-list-div-${combo.comboId}`}
                >
                  <div className="text-center text-l pt-4 pb-2 px-4 bg-main-200 font-medium rounded-t-xl">
                    {ingredientString}
                  </div>
                  <div className="text-center bg-main-100 font-light pb-4 px-4 pt-2 mb-6 rounded-b-xl">
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
        <div className="col-span-6 md:col-span-3 font-light md:col-start-4">
          <h2 className="font-bold text-center text-decoration-600 text-2xl/loose">
            recipe
          </h2>
          <Recipe ingredient={mainIngredient} />
        </div>
        <div className="divider grid col-span-full h-0 md:col-span-4 md:col-start-2" />
        <div className="col-start-2 col-span-4 mx-auto">
          <CommentsFeed slug={props.params.ingredientSlug} />
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
        </div>
      </div>
    </div>
  );
}
