import { describe, it } from 'vitest';

import { ingredientsApi } from '@services/api/ingredientsApi.ts';

import {
  clearIngredientForDetails,
  ingredientSlice,
  selectIngredient,
  selectIngredients,
  selectIsIngredientDetailsVisible,
  setIngredientForDetails,
} from './slice.ts';

import type { TIngredient, TModalState } from '@utils/types.ts';

const makeIngredient = (overrides: Partial<TIngredient>): TIngredient => ({
  _id: 'ingredient-id',
  name: 'Ингредиент',
  type: 'sauce',
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

const bun = makeIngredient({ _id: 'bun-id', name: 'Булка', type: 'bun', price: 100 });
const sauce = makeIngredient({ _id: 'sauce-id', name: 'Соус', price: 50 });

const catalogState: TModalState = { ingredient: null, ingredients: [bun, sauce] };

type TFakeAction = {
  type: string;
  payload?: unknown;
  meta: { arg: { endpointName: string } };
};

const queryFulfilled = (endpointName: string, payload: unknown): TFakeAction => ({
  type: `${ingredientsApi.reducerPath}/executeQuery/fulfilled`,
  payload,
  meta: { arg: { endpointName } },
});

const { reducer } = ingredientSlice;

describe('ingredientSlice', () => {
  it('возвращает начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      ingredient: null,
      ingredients: [],
    });
  });

  describe('setIngredientForDetails', () => {
    it('находит ингредиент по _id', () => {
      const result = reducer(catalogState, setIngredientForDetails('sauce-id'));

      expect(result.ingredient).toEqual(sauce);
    });

    it('не меняет ingredient, если _id не найден', () => {
      const state: TModalState = { ...catalogState, ingredient: bun };
      const result = reducer(state, setIngredientForDetails('unknown-id'));

      expect(result.ingredient).toEqual(bun);
    });

    it('не трогает каталог ингредиентов', () => {
      const result = reducer(catalogState, setIngredientForDetails('sauce-id'));

      expect(result.ingredients).toEqual([bun, sauce]);
    });
  });

  describe('clearIngredientForDetails', () => {
    it('очищает выбранный ингредиент, не трогая каталог', () => {
      const state: TModalState = { ...catalogState, ingredient: sauce };
      const result = reducer(state, clearIngredientForDetails());

      expect(result.ingredient).toBeNull();
      expect(result.ingredients).toEqual([bun, sauce]);
    });
  });

  describe('селекторы', () => {
    it('selectIngredients возвращает каталог из корневого стейта', () => {
      expect(selectIngredients({ ingredient: catalogState })).toEqual([bun, sauce]);
    });

    it('selectIngredient возвращает null или выбранный ингредиент', () => {
      const empty = { ingredient: catalogState };
      const selected = { ingredient: { ...catalogState, ingredient: sauce } };

      expect(selectIngredient(empty)).toBeNull();
      expect(selectIngredient(selected)).toEqual(sauce);
    });

    it('selectIsIngredientDetailsVisible зависит только от выбранного ингредиента', () => {
      const hidden = { ingredient: { ...catalogState, ingredient: null } };
      const visible = { ingredient: { ...catalogState, ingredient: sauce } };

      expect(selectIsIngredientDetailsVisible(hidden)).toBe(false);
      expect(selectIsIngredientDetailsVisible(visible)).toBe(true);
    });
  });

  describe('extraReducers: getIngredients', () => {
    it('fulfilled заполняет каталог', () => {
      const result = reducer(
        { ingredient: null, ingredients: [] },
        queryFulfilled('getIngredients', { success: true, data: [bun, sauce] })
      );

      expect(result.ingredients).toEqual([bun, sauce]);
    });

    it('fulfilled не сбрасывает выбранный ингредиент', () => {
      const state: TModalState = { ingredient: bun, ingredients: [] };
      const result = reducer(
        state,
        queryFulfilled('getIngredients', { success: true, data: [bun, sauce] })
      );

      expect(result.ingredient).toEqual(bun);
    });
  });
});
