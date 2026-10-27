import { useNavigate, useParams } from 'react-router-dom';

import { OrderDetails } from '@components/feed-order-details/order-details.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { useGetOrdersFeedQuery } from '@services/api/feedApi.ts';
import { FEED_CACHE_KEY } from '@utils/consts.ts';

import type * as React from 'react';

export const PageOrderDetail = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetOrdersFeedQuery(FEED_CACHE_KEY);
  const order = data?.orders.find((el) => el._id === id);

  return (
    <>
      {order ? (
        <Modal
          onClose={() => {
            void navigate('..', { relative: 'path' });
          }}
        >
          <OrderDetails order={order} />
        </Modal>
      ) : (
        <p>Такого заказа нету..</p>
      )}
    </>
  );
};
