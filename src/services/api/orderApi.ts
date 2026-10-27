import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ORDER } from '@utils/consts.ts';

import { baseQuery } from './baseQuery.ts';

export type TOrderDetails = {
  name: string;
  order: { number: number };
  success: boolean;
};

type TOrderBody = {
  ingredients: string[];
};

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery,
  endpoints: (builder) => ({
    postOrder: builder.mutation<TOrderDetails, TOrderBody>({
      query: (body) => ({
        url: API_ORDER,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePostOrderMutation } = orderApi;
