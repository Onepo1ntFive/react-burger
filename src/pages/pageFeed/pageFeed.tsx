import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { FeedList } from '@components/feed-list/feed-list.tsx';
import { FeedQueue } from '@components/feed-queue/feed-queue.tsx';
import { Layout } from '@components/layout/layout.tsx';
import { useGetOrdersFeedQuery } from '@services/api/feedApi.ts';
import { FEED_CACHE_KEY } from '@utils/consts.ts';

import type * as React from 'react';

import styles from './page-feed.module.css';

export const PageFeed = (): React.JSX.Element => {
  const { data } = useGetOrdersFeedQuery(FEED_CACHE_KEY);

  return (
    <Layout title={'Лента заказов'}>
      <section className={`${styles.page_feed_col}`}>
        {data?.orders ? (
          <FeedList orders={data.orders} />
        ) : (
          <div className={'p-10'}>
            <Preloader />
          </div>
        )}
      </section>
      <section className={`${styles.page_feed_col}`}>
        {data ? (
          <FeedQueue data={data} />
        ) : (
          <div className={'p-10'}>
            <Preloader />
          </div>
        )}
      </section>
    </Layout>
  );
};
