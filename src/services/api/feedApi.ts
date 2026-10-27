import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { WSS_FEED_ALL, WSS_FEED_URL } from '@utils/consts.ts';

import type { TFeedResponse } from '@utils/types.ts';

let socket: WebSocket | null = null;

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getOrdersFeed: builder.query<TFeedResponse, string>({
      queryFn: () => ({
        data: { success: false, orders: [], total: 0, totalToday: 0 },
      }),

      async onCacheEntryAdded(_token, api) {
        socket = new WebSocket(`${WSS_FEED_URL}${WSS_FEED_ALL}`);
        try {
          await api.cacheDataLoaded;

          socket.onmessage = (event: MessageEvent<string>): void => {
            const data = JSON.parse(event.data) as TFeedResponse;

            if (data.success) {
              api.updateCachedData((draft) => {
                draft.success = data.success;
                draft.orders = data.orders;
                draft.total = data.total;
                draft.totalToday = data.totalToday;
              });
            }
          };
        } catch {
          // подписка снята раньше, чем загрузился кэш — сокет закроется ниже
        }

        await api.cacheEntryRemoved;
        socket?.close();
        socket = null;
      },
    }),
  }),
});

export const { useGetOrdersFeedQuery } = feedApi;
