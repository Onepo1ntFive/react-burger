import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ORDER, API_URL } from '@utils/consts.ts';

const API_HEADERS = {
  authorization: 'c16aa810-bd64-42cf-a326-d58b550098bd',
  'Content-Type': 'application/json',
};

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
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      for (const [key, value] of Object.entries(API_HEADERS)) {
        headers.set(key, value);
      }
    },
  }),
  endpoints: (builder) => ({
    postOrder: builder.mutation({
      query: (body: TOrderBody) => ({
        url: `${API_URL}${API_ORDER}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePostOrderMutation } = orderApi;
