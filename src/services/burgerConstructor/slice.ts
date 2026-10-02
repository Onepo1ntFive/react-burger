import { createSlice, nanoid } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types.ts';

/**
 * Element of the filling. The whole ingredient is kept in the store, while
 * `key` keeps every entry unique so duplicates can be tracked.
 */
export type TConstructorIngredient = TIngredient & {
  key: string;
};

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
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
    selectAllIngredients: (state) => [state.bun, ...state.ingredients],
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setBun,
} = burgerConstructorSlice.actions;
export const { selectBun, selectConstructorIngredients, selectAllIngredients } =
  burgerConstructorSlice.selectors;
