import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '@services/hooks.ts';
import { selectIngredients } from '@services/ingredient/slice.ts';
import { formatFullOrderDate, formatOrderDate } from '@utils/formatDate.ts';

import type { TFeedOrder, TIngredient } from '@utils/types';
import type * as React from 'react';

import styles from './feed-item.module.css';

type TBurgerIngredientsProps = {
  order: TFeedOrder;
  index: number;
};

export const FeedItem = ({
  order,
  index,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const location = useLocation();
  const ingredients = useAppSelector(selectIngredients);
  const findIngredientById = (id: string): TIngredient | undefined => {
    return ingredients.find((el) => el._id === id);
  };

  const selectedIngredients = (ingredientIngredients: string[]): number => {
    const i = ingredientIngredients.map((el) => findIngredientById(el));
    const sum = i.reduce((acc, el) => acc + (el?.price ?? 0), 0);

    return sum;
  };

  return (
    <article className={`${styles.feed_item} p-6 mb-4`}>
      <Link
        className={`${styles.feed_link}`}
        to={`${location.pathname}/${order._id}`}
        state={{ backgroundLocation: location }}
      >
        <header className={styles.feed_top}>
          <div className={'text text_type_digits-default'}>#{order.number}</div>
          <div
            className={'text text_type_main-default text_color_inactive pl-6 mb-6'}
            title={formatFullOrderDate(order.createdAt)}
          >
            {formatOrderDate(order.createdAt)}
          </div>
        </header>
        <div className={`${styles.feed_title} text text_type_main-medium mb-6`}>
          {order.name}
        </div>
        <footer className={`${styles.feed_bottom}`}>
          <ul className={`${styles.feed_ingredients}`}>
            {order.ingredients.slice(0, 6).map((id, i_index) => (
              <li
                key={`${id}-${index}-${i_index}`}
                style={{ zIndex: order.ingredients.slice(0, 6).length - i_index }}
              >
                {order.ingredients.length > 6 && i_index === 5 ? (
                  <div className={`${styles.feed_ingredients_add}`}>
                    +{order.ingredients.length - 6}
                  </div>
                ) : (
                  ''
                )}
                <img
                  src={findIngredientById(id)?.image_mobile}
                  alt={findIngredientById(id)?.name}
                  title={findIngredientById(id)?.name}
                />
              </li>
            ))}
          </ul>
          <div className={`${styles.feed_price} pl-6 text text_type_digits-default`}>
            {selectedIngredients(order.ingredients)}{' '}
            <CurrencyIcon type="primary" className={'ml-2'} />
          </div>
        </footer>
      </Link>
    </article>
  );
};
