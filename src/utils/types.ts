import type { Location } from 'react-router-dom';

export type TLocationState = {
  backgroundLocation?: Location;
  from?: Location;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TUserData = {
  email: string;
  name: string;
};
