export type MainIngredientResponse = {
  mainIngredients: {
    id: number;
    name: string;
    image: string;
  }[];
};

export type MainIngredientProps = {
  props: {
    id: number;
    name: string;
    image: string;
  };
};

export type Ingredient = {
  id: number;
  name: string;
  image: string | null;
  description: string | null;
  recipe: string | null;
};
