import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { selectAllIngredients } from '@services/burgerConstructor/slice.ts';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredient.module.css';

type TBurgerIngredientsProps = {
  ingredient: TIngredient;
};

export const BurgerIngredient = ({
  ingredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const location = useLocation();
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
      ref={dragRef}
    >
      <Link
        className={styles.burger_ingredient_link}
        to={`/ingredients/${ingredient._id}`}
        key={ingredient._id}
        state={{ backgroundLocation: location }}
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
      </Link>
    </div>
  );
};
