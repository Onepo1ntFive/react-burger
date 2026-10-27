import type { TFeedResponse } from '@utils/types.ts';

import styles from './feed-queue.module.css';

type TFeedQueueProps = {
  data: TFeedResponse;
};

export const FeedQueue = ({ data }: TFeedQueueProps): React.JSX.Element => {
  const { orders, total, totalToday } = data;
  const readyOrders = orders.filter((el) => el.status === 'done');
  const notReadyOrders = orders.filter((el) => el.status === 'pending');
  return (
    <>
      <div className={`${styles.feed_queue} mb-15`}>
        <div className={`${styles.feed_queue_col}`}>
          <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
          <ul className={`text text_type_digits-default ${styles.feed_queue_highlight}`}>
            {readyOrders.map((el) => (
              <li key={`${el._id}`} className={'mb-2'}>
                #{el.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.feed_queue_col}`}>
          <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
          <ul className={'text text_type_digits-default'}>
            {notReadyOrders.map((el) => (
              <li key={`${el._id}`} className={'mb-2'}>
                #{el.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`mb-15`}>
        <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
        <div className={`text text_type_digits-large ${styles.feed_count_shadow}`}>
          {total}
        </div>
      </div>
      <div>
        <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
        <div className={`text text_type_digits-large ${styles.feed_count_shadow}`}>
          {totalToday}
        </div>
      </div>
    </>
  );
};
