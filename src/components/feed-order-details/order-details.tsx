import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import { selectIngredients } from '@services/ingredient/slice.ts';
import { order_statuses } from '@utils/consts.ts';
import { formatOrderDate } from '@utils/formatDate.ts';

import type { TFeedOrder, TFeedOrderStatus, TIngredient } from '@utils/types.ts';
import type * as React from 'react';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  order: TFeedOrder;
};

type TIngredientWithCount = TIngredient & { count: number };

export const OrderDetails = ({ order }: TOrderDetailsProps): React.JSX.Element => {
  const ingredients = useSelector(selectIngredients);
  const uniqueOrderIngredients = [...new Set(order.ingredients)];
  const findIngredientById = (id: string): TIngredientWithCount | undefined => {
    const ingredient = ingredients.find((el) => el._id === id);

    if (!ingredient) {
      return undefined;
    }

    return {
      ...ingredient,
      count: order.ingredients.filter((el) => el === id).length,
    };
  };
  const selectedIngredients = (ingredientIngredients: string[]): number => {
    const i = ingredientIngredients.map((el) => findIngredientById(el));
    const sum = i.reduce((acc, el) => acc + (el?.price ?? 0), 0);

    return sum;
  };
  return (
    <>
      {order && (
        <article className={`${styles.order_details}`}>
          <header className={'pb-10'}>#{order.number}</header>
          <h2 className={'text text_type_main-medium pb-3'}>{order.name}</h2>
          <div
            className={`${order.status === 'done' ? styles.order_highlight : ''} pb-15`}
          >
            {order_statuses[order.status as TFeedOrderStatus]}
          </div>
          <h3 className={'pb-6'}>Состав:</h3>
          <ul>
            {uniqueOrderIngredients.map((id) => {
              const ingredient = findIngredientById(id);

              return (
                <li key={id} className={'mb-4'}>
                  <div className={`${styles.order_image} mr-4`}>
                    <img
                      src={ingredient?.image_mobile}
                      alt={ingredient?.name}
                      title={ingredient?.name}
                    />
                  </div>
                  <div>{ingredient?.name}</div>
                  <div className={`${styles.order_count}`}>
                    {ingredient?.count} × {ingredient?.price}{' '}
                    <CurrencyIcon type="primary" className={'ml-2'} />
                  </div>
                </li>
              );
            })}
          </ul>
          <footer className={'mt-10'}>
            <div className={'text text_type_main-default text_color_inactive'}>
              {' '}
              {formatOrderDate(order.createdAt)}
            </div>
            <div>
              {selectedIngredients(order.ingredients)}{' '}
              <CurrencyIcon type="primary" className={'ml-2'} />
            </div>
          </footer>
        </article>
      )}
    </>
  );
};
