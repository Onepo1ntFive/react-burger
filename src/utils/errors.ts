import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
  isObject(error) && 'status' in error;

export const getErrorMessage = (error: unknown): string => {
  if (isFetchBaseQueryError(error)) {
    if (typeof error.status === 'number') {
      if (isObject(error.data) && typeof error.data.message === 'string') {
        return error.data.message;
      }
      if (typeof error.data === 'string') {
        return error.data;
      }
      return `Ошибка запроса: ${String(error.status)}`;
    }
    if ('error' in error && typeof error.error === 'string') {
      return error.error;
    }
    return 'Ошибка сети';
  }

  if (isObject(error) && typeof error.message === 'string') {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Неизвестная ошибка';
};
