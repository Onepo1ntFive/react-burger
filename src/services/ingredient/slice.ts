import { createSlice } from '@reduxjs/toolkit';

import { ingredientsApi } from '@services/api/ingredientsApi.ts';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types';

type TModalState = {
  ingredient: TIngredient | null;
  ingredients: TIngredient[] | [];
};

const initialState: TModalState = {
  ingredient: null,
  ingredients: [],
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setIngredientForDetails: (state, action: PayloadAction<string>) => {
      const i = state.ingredients.filter((el) => action.payload === el._id);
      if (i.length) {
        state.ingredient = i[0];
      }
    },
    clearIngredientForDetails: (state) => {
      state.ingredient = null;
    },
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredient: (state) => state.ingredient,
    selectIsIngredientDetailsVisible: (state) => state.ingredient !== null,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ingredientsApi.endpoints.getIngredients.matchFulfilled,
      (state, action) => {
        state.ingredients = action.payload.data;
      }
    );
  },
});

export const { setIngredientForDetails, clearIngredientForDetails } =
  ingredientSlice.actions;
export const { selectIngredients, selectIngredient, selectIsIngredientDetailsVisible } =
  ingredientSlice.selectors;
