import { gql } from '@apollo/client';
import Image from 'next/image';
import { getMainIngredientsById } from '../../../database/ingredients';
import { getClient } from '../../../util/apolloClient';
import { Ingredient } from '../../../util/types';

type Props = Ingredient;

export default async function IngredientPage(props: Props) {
  console.log('props on ingredient page: ', props);

  // const { data } = await getClient().query<Ingredient>({
  //   query: gql`
  //     query GetMainIngredientById($id: ID! = ${props.id}){
  //       mainIngredientById(id: $id){
  //         name
  //         image
  //         description
  //         recipe
  //       }
  //     }
  //   `,
  // });
  // console.log('data on ingredient page: ', data);
  return (
    <div>
      <h1>this is a single ingredient page</h1>
    </div>
  );
}
