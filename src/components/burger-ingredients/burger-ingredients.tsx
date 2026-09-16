import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { BurgerIngredient } from '@components/burger-ingredient/burger-ingredient.tsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

const ingredientsTypes: Record<string, string> = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [isIngredientDetailsVisible, setIsIngredientDetailsVisible] =
    useState<boolean>(false);
  const [ingredient, setIngredient] = useState({});

  const showIngredientDetails = (id: string): void => {
    const i = ingredients.filter((el) => el._id === id);
    if (i.length) {
      setIngredient(i[0]);
      setIsIngredientDetailsVisible(true);
    }
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav className={`${styles.menu} mb-10`}>
        {Object.entries(ingredientsTypes).map(([key, title], _) => {
          return (
            <Tab
              key={key}
              active={false}
              value={key}
              onClick={() => {
                /* TODO */
              }}
            >
              {title}
            </Tab>
          );
        })}
      </nav>
      <div
        className={`${styles.custom_scroll} ${styles.burger_ingredients_list} custom-scroll`}
      >
        {Object.entries(ingredientsTypes).map(([key, _t], _i) => {
          return ingredients
            .filter((el) => el.type === key)
            .map((item, index) => (
              <>
                {index === 0 ? (
                  <p
                    className={`${styles.burger_ingredients_title} text text_type_main-medium pt-10 pb-6`}
                  >
                    {ingredientsTypes[`${item.type}`]
                      ? ingredientsTypes[`${item.type}`]
                      : '#'}
                  </p>
                ) : (
                  ''
                )}
                <BurgerIngredient
                  onClick={() => {
                    showIngredientDetails(item._id);
                  }}
                  key={key}
                  ingredient={item}
                />
              </>
            ));
        })}
      </div>
      {isIngredientDetailsVisible && ingredient && (
        <IngredientDetails
          onClose={() => {
            setIsIngredientDetailsVisible(false);
          }}
          ingredient={ingredient}
        />
      )}
    </section>
  );
};
