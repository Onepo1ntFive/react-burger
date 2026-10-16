import { Preloader, Tab } from '@krgaa/react-developer-burger-ui-components';
import { Fragment, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { BurgerIngredient } from '@components/burger-ingredient/burger-ingredient.tsx';
import { IngredientModal } from '@components/ingredient-modal/ingredient-modal.tsx';
import {
  selectIngredient,
  selectIsIngredientDetailsVisible,
} from '@services/ingredient/slice.ts';

import type { TIngredient } from '@utils/types.ts';
import type * as React from 'react';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

const ingredientsTypes: Record<string, string> = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};

export const BurgerIngredients = ({
  ingredients,
  isLoading,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const groupedIngredients = useMemo(() => {
    if (ingredients) {
      return Object.entries(ingredientsTypes).map(([type]) => ({
        type,
        items: ingredients.filter((item) => item.type === type),
      }));
    }
    return [];
  }, [ingredients]);

  const ingredient = useSelector(selectIngredient);
  const isIngredientDetailsVisible = useSelector(selectIsIngredientDetailsVisible);

  const [activeTab, setActiveTab] = useState('bun');

  const titlesRefs = useRef<Record<string, HTMLElement | null>>({});
  const containerRef = useRef(null);

  const addToRefs = (el: HTMLParagraphElement | null): void => {
    if (el) {
      const type = el.dataset.type;
      if (!Object.entries(titlesRefs.current).find(([key, _]) => key === type)) {
        titlesRefs.current[`${type}`] = el;
      }
    }
  };

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>): void => {
    const scrollContainer = event.currentTarget;
    const titles = titlesRefs.current;

    const entries = Object.entries(titles).filter(
      (entry): entry is [string, HTMLElement] => entry[1] !== null
    );

    if (entries.length === 0) return;

    const containerTop = scrollContainer.getBoundingClientRect().top;

    const [_, closestEl] = entries.reduce<[string, HTMLElement]>((prev, curr) => {
      const currDist = Math.abs(curr[1].getBoundingClientRect().top - containerTop);
      const prevDist = Math.abs(prev[1].getBoundingClientRect().top - containerTop);
      return currDist < prevDist ? curr : prev;
    });

    const activeTabKey = Object.entries(ingredientsTypes).find(
      ([, v]) => v === closestEl.innerText
    )?.[0];

    if (activeTabKey) {
      setActiveTab(activeTabKey);
    }
  };

  const scrollToTitle = (type: string): void => {
    const container = containerRef.current as unknown as HTMLElement;
    const titleEl = titlesRefs.current[`${type}`];

    if (!container || !titleEl) return;

    container?.scrollTo({
      top: titleEl.getBoundingClientRect().top - container.getBoundingClientRect().top,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.burger_ingredients}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <nav className={`${styles.menu} mb-10`}>
            {Object.entries(ingredientsTypes).map(([key, title], _) => {
              return (
                <Tab
                  key={key}
                  active={activeTab === key}
                  value={key}
                  onClick={scrollToTitle}
                >
                  {title}
                </Tab>
              );
            })}
          </nav>
          <div
            className={`${styles.custom_scroll} ${styles.burger_ingredients_list} custom-scroll`}
            onScroll={scrollHandler}
            ref={containerRef}
          >
            {groupedIngredients.map(({ items }, _typeIndex) => {
              return items.map((item, index) => (
                <Fragment key={`${item.type}-${index}`}>
                  {index === 0 ? (
                    <p
                      className={`${styles.burger_ingredients_title} text text_type_main-medium pt-10 pb-6`}
                      data-type={item.type}
                      ref={addToRefs}
                    >
                      {ingredientsTypes[`${item.type}`]
                        ? ingredientsTypes[`${item.type}`]
                        : '#'}
                    </p>
                  ) : (
                    ''
                  )}
                  <BurgerIngredient ingredient={item} />
                </Fragment>
              ));
            })}
          </div>
          {isIngredientDetailsVisible && ingredient && <IngredientModal />}
        </>
      )}
    </section>
  );
};
