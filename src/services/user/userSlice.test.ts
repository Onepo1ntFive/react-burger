import { describe, it } from 'vitest';

import { userApi } from '@services/api/userApi.ts';

import {
  clearUserData,
  initialState,
  selectIsAuthChecked,
  selectIsAuthorized,
  selectUser,
  setAuthChecked,
  setUserData,
  userDataSlice,
} from './slice.ts';

import type { TUserData } from '@utils/types.ts';

const mockUserData: TUserData = {
  name: 'Тест',
  email: 'test@test.com',
};
const mockInitialState = { ...initialState };
const mockAuthorizedState = { ...initialState, user: mockUserData, isAuthChecked: true };
const mockCheckedNoUserState = { ...initialState, isAuthChecked: true };

type TFakeAction = {
  type: string;
  payload?: unknown;
  error?: { name: string; message: string };
  meta: { arg: { endpointName: string } };
};

const queryFulfilled = (endpointName: string, payload: unknown): TFakeAction => ({
  type: `${userApi.reducerPath}/executeQuery/fulfilled`,
  payload,
  meta: { arg: { endpointName } },
});

const queryRejected = (endpointName: string): TFakeAction => ({
  type: `${userApi.reducerPath}/executeQuery/rejected`,
  meta: { arg: { endpointName } },
});

const mutationFulfilled = (endpointName: string, payload: unknown): TFakeAction => ({
  type: `${userApi.reducerPath}/executeMutation/fulfilled`,
  payload,
  meta: { arg: { endpointName } },
});

describe('userSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = userDataSlice.reducer(undefined, { type: '' });
    expect(result).toEqual({ user: null, isAuthChecked: false });
  });

  it('устанавливает данные пользователя', () => {
    const result = userDataSlice.reducer(mockInitialState, setUserData(mockUserData));
    expect(result.user).toEqual(mockUserData);
    expect(result.isAuthChecked).toBe(false);
  });

  it('очищает данные пользователя', () => {
    const result = userDataSlice.reducer(mockAuthorizedState, clearUserData());
    expect(result.user).toBeNull();
    expect(result.isAuthChecked).toBe(true);
  });

  it('устанавливает isAuthChecked false', () => {
    const result = userDataSlice.reducer(mockAuthorizedState, setAuthChecked(false));
    expect(result.user).toEqual(mockUserData);
    expect(result.isAuthChecked).toBe(false);
  });

  it('устанавливает isAuthChecked true', () => {
    const result = userDataSlice.reducer(
      { ...mockAuthorizedState, isAuthChecked: false },
      setAuthChecked(true)
    );
    expect(result.user).toEqual(mockUserData);
    expect(result.isAuthChecked).toBe(true);
  });

  it('возвращает данные пустого пользователя', () => {
    const result = selectUser({ userData: mockInitialState });
    expect(result).toBeNull();
  });

  it('возвращает данные авторизованного пользователя', () => {
    const result = selectUser({ userData: mockAuthorizedState });
    expect(result).toEqual(mockUserData);
  });

  it('пользователь не авторизован', () => {
    const result = selectIsAuthorized({ userData: mockCheckedNoUserState });
    expect(result).toBe(false);
  });

  it('пользователь авторизован', () => {
    const result = selectIsAuthorized({ userData: mockAuthorizedState });
    expect(result).toBe(true);
  });

  it('возвращает false, пока проверку авторизации не делали', () => {
    const result = selectIsAuthChecked({
      userData: { user: null, isAuthChecked: false },
    });
    expect(result).toBe(false);
  });

  it('возвращает true, если проверка завершена', () => {
    const result = selectIsAuthChecked({
      userData: { user: null, isAuthChecked: true },
    });
    expect(result).toBe(true);
  });

  it('getUser fulfilled: записывает пользователя и отмечает проверку', () => {
    const result = userDataSlice.reducer(
      mockInitialState,
      queryFulfilled('getUser', { user: mockUserData })
    );

    expect(result.user).toEqual(mockUserData);
    expect(result.isAuthChecked).toBe(true);
  });

  it('getUser rejected: очищает пользователя и отмечает проверку', () => {
    const result = userDataSlice.reducer(
      { user: mockUserData, isAuthChecked: false },
      queryRejected('getUser')
    );
    expect(result.user).toBeNull();
    expect(result.isAuthChecked).toBe(true);
  });

  it('logoutUser fulfilled: очищает пользователя, не сбрасывая проверку', () => {
    const result = userDataSlice.reducer(
      mockAuthorizedState,
      mutationFulfilled('logoutUser', { success: true })
    );
    expect(result.user).toBeNull();
    expect(result.isAuthChecked).toBe(true);
  });
});
