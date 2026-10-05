import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import { selectAllIngredients } from '@services/burgerConstructor/slice.ts';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredient.module.css';

type TBurgerIngredientsProps = {
  ingredient: TIngredient;
  onClick?: () => void;
};

export const BurgerIngredient = ({
  ingredient,
  onClick,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const { _id } = ingredient;
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const selectedIngredients = useSelector(selectAllIngredients);
  const count = selectedIngredients.filter((el) => {
    if (el) {
      return el._id === ingredient._id;
    }
  }).length;
  return (
    <div
      className={`p-4 ${styles.burger_ingredient} ${isDrag ? 'isDrag' : ''}`}
      onClick={onClick}
      ref={dragRef}
    >
      {count ? (
        <Counter
          count={ingredient.type === 'bun' ? count * 2 : count}
          size="default"
          extraClass={`${styles.burger_ingredient_counter}`}
        />
      ) : (
        ''
      )}
      <img
        className={`${styles.burger_ingredient_img} pb-1`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <p
        className={`${styles.burger_ingredient_price} text text_type_main-medium font_iceland pb-1`}
      >
        {ingredient.price} <CurrencyIcon className={'ml-2'} type="primary" />
      </p>
      <p className={'text'}>{ingredient.name}</p>
    </div>
  );
};
