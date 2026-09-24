import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

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
  return (
    <div className={`p-4 ${styles.burger_ingredient}`} onClick={onClick}>
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
