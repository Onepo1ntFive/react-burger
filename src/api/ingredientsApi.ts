import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_INGREDIENTS, API_URL } from '@utils/consts.ts';

import type { TIngredient } from '@utils/types.ts';

const API_HEADERS = {
  authorization: 'c16aa810-bd64-42cf-a326-d58b550098bd',
  'Content-Type': 'application/json',
};

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      for (const [key, value] of Object.entries(API_HEADERS)) {
        headers.set(key, value);
      }
    },
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredientsResponse, void>({
      query: () => ({
        url: `${API_URL}${API_INGREDIENTS}`,
      }),
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
