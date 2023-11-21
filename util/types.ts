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
  description: string | string[] | null;
  recipe: string | string[] | null;
};

export type ComboTags = {
  comboId: number;
  type: string;
  tagNames: string[] | null;
};

export type Comment = {
  id: number;
  userId: number;
  username: string;
  body: string;
  ingredientId: number;
  slug: string | null;
};

export type NewComment = {
  id: number;
  userId: number;
  body: string;
  ingredientId: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
};
