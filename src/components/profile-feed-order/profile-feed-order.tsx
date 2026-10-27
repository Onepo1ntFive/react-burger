import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { FeedList } from '@components/feed-list/feed-list.tsx';
import { useGetOrdersFeedQuery } from '@services/api/feedApi.ts';
import { FEED_CACHE_KEY } from '@utils/consts.ts';

import type * as React from 'react';

export const ProfileFeedOrder = (): React.JSX.Element => {
  const { data } = useGetOrdersFeedQuery(FEED_CACHE_KEY);
  return (
    <>
      {data?.orders ? (
        <FeedList orders={data.orders} />
      ) : (
        <div className={'p-10'}>
          <Preloader />
        </div>
      )}
    </>
  );
};
