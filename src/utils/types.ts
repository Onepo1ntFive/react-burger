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

export type TProfileForm = {
  name: string;
  email: string;
  password: string;
};

export type TEditableField = 'name' | 'email';

export type TFeedResponse = {
  success: boolean;
  orders: TFeedOrder[];
  total: number;
  totalToday: number;
};

export type TFeedOrderStatus = 'created' | 'pending' | 'done';

export type TFeedOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};
