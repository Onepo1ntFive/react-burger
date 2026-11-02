import { describe, it } from 'vitest';

import { makeIngredient } from '../../../tests/utils.ts';
import {
  addIngredient,
  burgerConstructorSlice,
  clearConstructor,
  moveIngredient,
  removeIngredient,
  selectAllIngredients,
  selectBun,
  selectConstructorIngredients,
  setBun,
} from './slice.ts';

import type { TConstructorIngredient } from './slice.ts';
import type { RootState } from '@services/store.ts';
import type { TIngredient } from '@utils/types.ts';

const bun = makeIngredient({ _id: 'bun-id', name: 'Булка', type: 'bun' });
const cutlet = makeIngredient({ _id: 'cutlet-id', name: 'Котлета', price: 200 });
const cheese = makeIngredient({ _id: 'cheese-id', name: 'Сыр', price: 150 });
const tomato = makeIngredient({ _id: 'tomato-id', name: 'Томат', price: 50 });

const withKey = (ingredient: TIngredient, key: string): TConstructorIngredient => ({
  ...ingredient,
  key,
});

const first = withKey(cutlet, 'key-1');
const second = withKey(cheese, 'key-2');
const third = withKey(tomato, 'key-3');

type TConstructorState = ReturnType<typeof burgerConstructorSlice.reducer>;

const { reducer } = burgerConstructorSlice;

const emptyState: TConstructorState = { bun: null, ingredients: [] };
const filledState: TConstructorState = { bun, ingredients: [first, second] };

const asRootState = (state: TConstructorState): RootState =>
  ({ burgerConstructor: state }) as RootState;

const keysOf = (state: TConstructorState): string[] =>
  state.ingredients.map((item) => item.key);

describe('burgerConstructorSlice', () => {
  it('возвращает начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual({ bun: null, ingredients: [] });
  });

  describe('addIngredient', () => {
    it('добавляет ингредиент в конец и присваивает key', () => {
      const result = reducer(filledState, addIngredient(tomato));

      expect(result.ingredients).toHaveLength(3);
      expect(result.ingredients[2]).toMatchObject({ _id: 'tomato-id' });
      expect(result.ingredients[2].key).toBeTruthy();
    });

    it('не переиспользует key у одинаковых ингредиентов', () => {
      const once = reducer(emptyState, addIngredient(tomato));
      const twice = reducer(once, addIngredient(tomato));

      expect(twice.ingredients).toHaveLength(2);
      expect(twice.ingredients[0].key).not.toBe(twice.ingredients[1].key);
    });

    it('не трогает выбранную булку', () => {
      const result = reducer(filledState, addIngredient(tomato));

      expect(result.bun).toEqual(bun);
    });
  });

  describe('setBun', () => {
    it('устанавливает булку, не меняя начинку', () => {
      const result = reducer(filledState, setBun(makeIngredient({ _id: 'new-bun' })));

      expect(result.bun).toMatchObject({ _id: 'new-bun' });
      expect(keysOf(result)).toEqual(['key-1', 'key-2']);
    });

    it('сбрасывает булку при null', () => {
      const result = reducer(filledState, setBun(null));

      expect(result.bun).toBeNull();
      expect(keysOf(result)).toEqual(['key-1', 'key-2']);
    });
  });

  describe('removeIngredient', () => {
    it('удаляет ингредиент по key, сохраняя порядок остальных', () => {
      const state: TConstructorState = {
        bun,
        ingredients: [first, second, third],
      };
      const result = reducer(state, removeIngredient('key-2'));

      expect(keysOf(result)).toEqual(['key-1', 'key-3']);
    });

    it('ничего не делает при неизвестном key', () => {
      const result = reducer(filledState, removeIngredient('unknown-key'));

      expect(keysOf(result)).toEqual(['key-1', 'key-2']);
    });
  });

  describe('moveIngredient', () => {
    const state: TConstructorState = { bun, ingredients: [first, second, third] };

    it('переставляет ингредиент с fromIndex на toIndex', () => {
      const result = reducer(state, moveIngredient({ fromIndex: 0, toIndex: 2 }));

      expect(keysOf(result)).toEqual(['key-2', 'key-3', 'key-1']);
    });

    it('ничего не делает, если индексы совпадают', () => {
      const result = reducer(state, moveIngredient({ fromIndex: 1, toIndex: 1 }));

      expect(keysOf(result)).toEqual(['key-1', 'key-2', 'key-3']);
    });

    it('ничего не делает, если индекс за границей списка', () => {
      const result = reducer(state, moveIngredient({ fromIndex: 0, toIndex: 5 }));

      expect(keysOf(result)).toEqual(['key-1', 'key-2', 'key-3']);
    });

    it('ничего не делает при отрицательном индексе', () => {
      const result = reducer(state, moveIngredient({ fromIndex: -1, toIndex: 1 }));

      expect(keysOf(result)).toEqual(['key-1', 'key-2', 'key-3']);
    });
  });

  describe('clearConstructor', () => {
    it('очищает булку и начинку', () => {
      const result = reducer(filledState, clearConstructor());

      expect(result).toEqual({ bun: null, ingredients: [] });
    });
  });

  describe('селекторы', () => {
    it('selectBun и selectConstructorIngredients читают корневой стейт', () => {
      const rootState = asRootState(filledState);

      expect(selectBun(rootState)).toEqual(bun);
      expect(selectConstructorIngredients(rootState)).toEqual([first, second]);
    });

    it('selectAllIngredients ставит булку первой', () => {
      expect(selectAllIngredients(asRootState(filledState))).toEqual([
        bun,
        first,
        second,
      ]);
    });

    it('selectAllIngredients без булки возвращает только начинку', () => {
      const state: TConstructorState = { bun: null, ingredients: [first, second] };

      expect(selectAllIngredients(asRootState(state))).toEqual([first, second]);
    });
  });
});
