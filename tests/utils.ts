import type { TIngredient } from '@utils/types.ts';

export const makeIngredient = (overrides: Partial<TIngredient>): TIngredient => ({
  _id: 'ingredient-id',
  name: 'Ингредиент',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 100,
  image: 'image.svg',
  image_large: 'image-large.svg',
  image_mobile: 'image-mobile.svg',
  __v: 0,
  ...overrides,
});
