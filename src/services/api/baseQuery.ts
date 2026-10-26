import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@utils/consts.ts';

/**
 * Токен из личного кабинета Практикума.
 * Используется как fallback, пока пользователь не авторизован.
 */
const DEV_AUTHORIZATION_TOKEN = 'c16aa810-bd64-42cf-a326-d58b550098bd';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set(
      'authorization',
      localStorage.getItem('accessToken') ?? DEV_AUTHORIZATION_TOKEN
    );

    return headers;
  },
});
