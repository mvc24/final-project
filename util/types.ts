export type MainIngredientResponse = {
  mainIngredients: {
    slug: any;
    id: number;
    name: string;
    image: string;
  }[];
};

export type MainIngredientProps = {
  props: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
};

export type Ingredient = {
  id: number;
  name: string;
  slug: string | null;
  image: string | null;
  description: string | null;
  recipe: string | null;
};
