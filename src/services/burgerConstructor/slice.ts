import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@services/store.ts';
import type { TIngredient } from '@utils/types.ts';

export type TConstructorIngredient = TIngredient & {
  key: string;
};

type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, key: nanoid() },
      }),
    },
    setBun: {
      reducer: (state, action: PayloadAction<TIngredient | null>) => {
        state.bun = action.payload;
      },
      prepare: (bun: TIngredient | null) => ({ payload: bun }),
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.key !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const isIndexOutOfRange =
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= state.ingredients.length ||
        toIndex >= state.ingredients.length;

      if (isIndexOutOfRange || fromIndex === toIndex) {
        return;
      }

      const [movedIngredient] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, movedIngredient);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
  selectors: {
    selectBun: (state) => state.bun,
    selectConstructorIngredients: (state) => state.ingredients,
  },
});

export const selectAllIngredients = createSelector(
  [
    (state: RootState): TIngredient | null => state.burgerConstructor.bun,
    (state: RootState): TConstructorIngredient[] => state.burgerConstructor.ingredients,
  ],
  (bun, ingredients): TIngredient[] => (bun ? [bun, ...ingredients] : [...ingredients])
);

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setBun,
} = burgerConstructorSlice.actions;
export const { selectBun, selectConstructorIngredients } =
  burgerConstructorSlice.selectors;
