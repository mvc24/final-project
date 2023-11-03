export type Group = {
  id: number;
  ingredients: number[];
  seasons: number[];
  categories: number[];
  howtos: number[];
}[];

export const groups: Group = [
  {
    id: 1,
    ingredients: [2, 62, 134, 51],
    seasons: [5],
    categories: [1],
    howtos: [3, 8, 9],
  },
  {
    id: 2,
    ingredients: [2, 140, 25, 141, 48],
    seasons: [5],
    categories: [1, 4],
    howtos: [4],
  },
  {
    id: 3,
    ingredients: [3, 31, 49, 21, 48, 136],
    seasons: [5],
    categories: [1, 3, 4],
    howtos: [6],
  },
  {
    id: 4,
    ingredients: [4, 48, 0],
    seasons: [5],
    categories: [1],
    howtos: [1, 9, 10],
  },
  {
    id: 5,
    ingredients: [4, 42, 52, 48, 33, 111],
    seasons: [5],
    categories: [1],
    howtos: [4],
  },
  {
    id: 6,
    ingredients: [6, 50, 98, 21, 48],
    seasons: [5],
    categories: [1, 3],
    howtos: [4, 1, 9, 8],
  },
  {
    id: 7,
    ingredients: [6, 19, 99, 110, 134, 0],
    seasons: [5],
    categories: [1],
    howtos: [4, 7],
  },
  {
    id: 8,
    ingredients: [5, 21, 25, 122, 48, 0],
    seasons: [3, 4],
    categories: [1],
    howtos: [4, 9, 8],
  },
  {
    id: 9,
    ingredients: [5, 48, 58, 91, 102, 70],
    seasons: [3, 4],
    categories: [1, 3],
    howtos: [4, 8],
  },
  {
    id: 10,
    ingredients: [7, 55, 56, 124, 22, 127, 61],
    seasons: [3, 4],
    categories: [2],
    howtos: [7],
  },
  {
    id: 11,
    ingredients: [7, 60, 62, 126, 135, 51, 134],
    seasons: [3, 4],
    categories: [1, 5],
    howtos: [8, 7],
  },
  {
    id: 12,
    ingredients: [1, 15, 21, 49, 76],
    seasons: [2, 3],
    categories: [1, 3],
    howtos: [1, 8],
  },
  {
    id: 13,
    ingredients: [1, 20, 64, 126],
    seasons: [2, 3],
    categories: [1, 3],
    howtos: [2, 1, 9],
  },
  {
    id: 14,
    ingredients: [3, 12, 81, 20, 21, 84],
    seasons: [2, 3],
    categories: [1, 3],
    howtos: [5],
  },
  {
    id: 15,
    ingredients: [8, 12, 111, 48],
    seasons: [2],
    categories: [1, 3],
    howtos: [5, 9, 8],
  },
  {
    id: 16,
    ingredients: [8, 68, 30, 105],
    seasons: [2],
    categories: [5],
    howtos: [3, 9, 5],
  },
  {
    id: 17,
    ingredients: [9, 29, 30, 129, 21, 8, 105],
    seasons: [2],
    categories: [6],
    howtos: [5, 9],
  },
  {
    id: 18,
    ingredients: [9, 21, 64, 126, 102, 48, 128],
    seasons: [2],
    categories: [1, 3],
    howtos: [5, 9, 8],
  },
  {
    id: 19,
    ingredients: [1, 11, 12, 114],
    seasons: [2],
    categories: [1, 3],
    howtos: [2, 1, 9],
  },
];
