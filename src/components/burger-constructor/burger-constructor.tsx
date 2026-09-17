import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '@components/modal/modal.tsx';
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

  const customName = (type: TConstructorElementType, name: string): string => {
    if (type === undefined) {
      return name;
    }
    if (type === 'top') {
      return `${name} (верх)`;
    }
    if (type === 'bottom') {
      return `${name} (низ)`;
    }
  };

  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState<boolean>(false);

  console.log(ingredients);

  return (
    <>
      {ingredients.length && (
        <section className={`${styles.burger_constructor} pt-25`}>
          <div className={`${styles.burger_constructor_list}`}>
            {/* временная затычка до организации логики конструктора */}
            <div className={`${styles.burger_constructor_item} mb-4 pr-2`}>
              <ConstructorElement
                key={ingredients[0]._id}
                price={ingredients[0].price}
                text={customName(
                  constructorElementType(0, ingredients.length),
                  ingredients[0].name
                )}
                isLocked
                thumbnail={ingredients[0].image}
                type={constructorElementType(0, ingredients.length)}
              />
            </div>
            <div className={`custom-scroll ${styles.burger_constructor_items}`}>
              {ingredients.map((item, _) => (
                <>
                  {item.type !== 'bun' && (
                    <div className={`${styles.burger_constructor_item} mb-4 pr-2`}>
                      <DragIcon type={'primary'} />
                      <ConstructorElement
                        key={item._id}
                        price={item.price}
                        text={item.name}
                        thumbnail={item.image}
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
            {/* временная затычка до организации логики конструктора */}
            <div className={`${styles.burger_constructor_item} mb-4 pr-2`}>
              <ConstructorElement
                key={ingredients[0]._id}
                price={ingredients[0].price}
                text={customName(
                  constructorElementType(ingredients.length - 1, ingredients.length),
                  ingredients[0].name
                )}
                isLocked
                thumbnail={ingredients[0].image}
                type={constructorElementType(ingredients.length - 1, ingredients.length)}
              />
            </div>
          </div>
          <div className={`${styles.burger_constructor_bottom} pt-10 pb-10`}>
            <div
              className={`${styles.burger_constructor_price} text text_type_main-large font_iceland pr-10`}
            >
              88610 <CurrencyIcon className={'ml-2'} type="primary" />
            </div>
            <Button
              onClick={() => setIsOrderDetailsVisible(true)}
              htmlType="button"
              size="large"
              type="primary"
            >
              Оформить заказ
            </Button>
          </div>
          {isOrderDetailsVisible && (
            <Modal onClose={() => setIsOrderDetailsVisible(false)}>
              <OrderDetails />
            </Modal>
          )}
        </section>
      )}
    </>
  );
};
