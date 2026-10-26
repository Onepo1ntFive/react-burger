import { createApi } from '@reduxjs/toolkit/query/react';

import { API_INGREDIENTS } from '@utils/consts.ts';

import { baseQuery } from './baseQuery.ts';

import type { TIngredient } from '@utils/types.ts';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery,
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredientsResponse, void>({
      query: () => ({
        url: API_INGREDIENTS,
      }),
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
