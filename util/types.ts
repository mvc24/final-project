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

export type Comment = {
  id: number;
  userId: number;
  username: string;
  body: string;
};

export type NewComment = {
  id: number;
  userId: number;
  body: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
};
