import { type TOrderDetails, usePostOrderMutation } from '@api/orderApi.ts';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { ConstructorIngredient } from '@components/constructor-ingredient/constructor-ingredient.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';
import {
  addIngredient,
  clearConstructor,
  moveIngredient,
  removeIngredient,
  selectBun,
  selectConstructorIngredients,
  setBun,
} from '@services/burgerConstructor/slice.ts';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

type TConstructorElementType = 'top' | 'bottom' | undefined;

type TDropItem = {
  _id: string;
};

type TOrderResponse = {
  data?: {
    success?: boolean;
    order?: {
      number?: number;
    };
  };
  error?: {
    data?: {
      message?: string;
    };
  };
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const [postOrder, { isLoading }] = usePostOrderMutation();
  const selectedBun = useSelector(selectBun);
  const selectedIngredients = useSelector(selectConstructorIngredients);
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<TOrderDetails | null>(null);

  const [{ isOver, canDrop }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId: TDropItem) {
      const item = findIngredientById(itemId._id);
      if (item?.type === 'bun') {
        dispatch(setBun(item));
      } else if (item) {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const findIngredientById = (id: string): TIngredient | undefined =>
    ingredients.find((item) => item._id === id);

  const moveIngredientHandler = (fromIndex: number, toIndex: number): void => {
    dispatch(moveIngredient({ fromIndex, toIndex }));
  };

  const removeIngredientHandler = (key: string): void => {
    dispatch(removeIngredient(key));
  };

  const totalPrice =
    (selectedBun ? selectedBun.price * 2 : 0) +
    selectedIngredients.reduce((sum, item) => sum + item.price, 0);

  const postOrderHandler = async (): Promise<void> => {
    const preparedOrder: string[] = selectedIngredients.map((el: TIngredient) => el._id);

    if (selectedBun && selectedIngredients) {
      try {
        const response: TOrderResponse = await postOrder({
          ingredients: [selectedBun._id, ...preparedOrder, selectedBun._id],
        });

        if (response?.error) {
          toast.error(`ERROR: ${response.error?.data?.message}`);
        }

        if (response?.data?.success) {
          toast.success('Успех!');
          setOrderDetails(response.data as TOrderDetails);
          setIsOrderDetailsVisible(true);
          dispatch(clearConstructor());
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast('Надо чот выбрать..', {
        icon: '🤔',
      });
    }
  };

  const customName = (type: TConstructorElementType, name: string): string => {
    if (type === 'top') {
      return `${name} (верх)`;
    }
    if (type === 'bottom') {
      return `${name} (низ)`;
    }
    return name;
  };

  return (
    <>
      <section className={`${styles.burger_constructor} pt-25`}>
        <div
          className={`${styles.burger_constructor_list} ${isOver || canDrop ? styles.burger_constructor_active : ''}`}
          ref={dropTarget}
        >
          <div className={`${styles.burger_constructor_item} mb-4 pr-2`}>
            {selectedBun ? (
              <ConstructorElement
                key={`${selectedBun._id}-top`}
                price={selectedBun.price}
                text={customName('top', selectedBun.name)}
                isLocked
                thumbnail={selectedBun.image}
                type={'top'}
              />
            ) : (
              <ConstructorElement
                price={0}
                text={'Выберите булки'}
                thumbnail={'image'}
                type={'top'}
                extraClass={`${styles.burger_constructor_empty} empty`}
              />
            )}
          </div>
          <div className={`custom-scroll ${styles.burger_constructor_items}`}>
            {selectedIngredients.length ? (
              selectedIngredients.map((item, index) => (
                <ConstructorIngredient
                  key={item.key}
                  ingredient={item}
                  index={index}
                  onMove={moveIngredientHandler}
                  onRemove={removeIngredientHandler}
                />
              ))
            ) : (
              <div className={`${styles.burger_constructor_item} mb-4 pr-2`}>
                <ConstructorElement
                  price={0}
                  text={'Выберите начинки'}
                  thumbnail={'image'}
                  extraClass={`${styles.burger_constructor_empty} empty`}
                />
              </div>
            )}
          </div>
          <div className={`${styles.burger_constructor_item} mb-4 pr-2`}>
            {selectedBun ? (
              <ConstructorElement
                key={`${selectedBun._id}-bottom`}
                price={selectedBun.price}
                text={customName('bottom', selectedBun.name)}
                isLocked
                thumbnail={selectedBun.image}
                type={'bottom'}
              />
            ) : (
              <ConstructorElement
                price={0}
                text={'Выберите булки'}
                thumbnail={'image'}
                type={'bottom'}
                extraClass={`${styles.burger_constructor_empty} empty`}
              />
            )}
          </div>
        </div>
        <div className={`${styles.burger_constructor_bottom} pt-10 pb-10`}>
          <div
            className={`${styles.burger_constructor_price} text text_type_main-large font_iceland pr-10`}
          >
            {totalPrice} <CurrencyIcon className={'ml-2'} type="primary" />
          </div>
          <Button
            onClick={() => {
              void postOrderHandler();
            }}
            disabled={isLoading}
            htmlType="button"
            size="large"
            type="primary"
          >
            Оформить заказ
          </Button>
        </div>
        {isOrderDetailsVisible && orderDetails && (
          <Modal onClose={() => setIsOrderDetailsVisible(false)}>
            <OrderDetails orderDetails={orderDetails} />
          </Modal>
        )}
      </section>
    </>
  );
};
