import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { OrderDetails } from '@components/order-details/order-details.tsx';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

type TConstructorElementType = 'top' | 'bottom' | undefined;

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const constructorElementType = (
    index: number,
    itemsLength: number
  ): TConstructorElementType => {
    if (!index && index !== 0) {
      return undefined;
    }
    if (index === 0) {
      return 'top';
    }
    if (index === itemsLength - 1) {
      return 'bottom';
    }
  };

  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState<boolean>(false);

  return (
    <>
      <section className={`${styles.burger_constructor} pt-25`}>
        <div className={`custom-scroll ${styles.burger_constructor_list}`}>
          {ingredients.map((item, index) => (
            <ConstructorElement
              key={item._id}
              price={item.price}
              isLocked={constructorElementType(index, ingredients.length) !== undefined}
              text={item.name}
              thumbnail={item.image}
              extraClass={'mb-4'}
              type={constructorElementType(index, ingredients.length)}
            />
          ))}
        </div>
        <div className={`${styles.burger_constructor_bottom} pt-10 pb-10`}>
          <div
            className={`${styles.burger_constructor_price} text text_type_main-large font_iceland pr-10`}
          >
            88610 <CurrencyIcon className={'ml-2'} type="primary" />
          </div>
          <Button
            onClick={() => {
              setIsOrderDetailsVisible(true);
            }}
            htmlType="button"
            size="large"
            type="primary"
          >
            Оформить заказ
          </Button>
        </div>
        {isOrderDetailsVisible && (
          <OrderDetails
            onClose={() => {
              setIsOrderDetailsVisible(false);
            }}
          />
        )}
      </section>
    </>
  );
};
