import type { TIngredient } from '@utils/types.ts';

import styles from './ingredient-details.module.css';

type TOrderDetailsProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TOrderDetailsProps): React.JSX.Element => {
  return (
    <div className={styles.ingredient_details}>
      <img
        className={`${styles.ingredient_ingredients_img}`}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <div className={'text text_type_main-medium pt-4 pb-8'}>{ingredient.name}</div>
      <ul className={`${styles.ingredient_ingredients}`}>
        <li>
          Калории, ккал{' '}
          <span className={'font_iceland pt-4'}>{ingredient.calories}</span>
        </li>
        <li>
          Белки, г <span className={'font_iceland pt-4'}>{ingredient.proteins}</span>
        </li>
        <li>
          Жиры, г <span className={'font_iceland pt-4'}>{ingredient.fat}</span>
        </li>
        <li>
          Углеводы, г
          <span className={'font_iceland pt-4'}>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};
