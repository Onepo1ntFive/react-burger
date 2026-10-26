import { FeedItem } from '@components/feed-item/feed-item.tsx';

import type { TFeedOrder } from '@utils/types.ts';
import type * as React from 'react';

import styles from './feed-list.module.css';

type TFeedListProps = {
  orders: TFeedOrder[];
};

export const FeedList = ({ orders }: TFeedListProps): React.JSX.Element => {
  return (
    <>
      <section className={styles.feed}>
        {orders.map((order, index) => (
          <FeedItem key={`${order._id}`} order={order} index={index} />
        ))}
      </section>
    </>
  );
};
