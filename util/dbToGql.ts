import { getIngredientCombos } from '../database/ingredientCombos';

export type IngredientComboMapped = {
  comboId: number;
  ingredientNames: string[] | null;
};

export async function ingredientCombosMapped(): Promise<
  IngredientComboMapped[]
> {
  const ingredientCombos: IngredientComboMapped[] = await getIngredientCombos();

  const mappedCombos: IngredientComboMapped[] = ingredientCombos.map(
    ({ comboId, ingredientNames }) => ({
      comboId,
      ingredientNames: ingredientNames || [],
    }),
  );

  return mappedCombos;
}
