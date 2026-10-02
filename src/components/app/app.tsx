import { useGetIngredientsQuery } from '@api/ingredientsApi.ts';
import { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from 'react-hot-toast';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { TIngredient } from '@utils/types.ts';

import 'normalize.css';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const { data, isLoading } = useGetIngredientsQuery();

  const ingredients: TIngredient[] | [] = useMemo(
    () => (data?.success ? data.data : []),
    [data]
  );
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <main className={`${styles.main} p-5`}>
          <Toaster
            toastOptions={{
              className: 'notif',
              position: 'bottom-center',
            }}
          />
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients ingredients={ingredients} isLoading={isLoading} />
            <BurgerConstructor ingredients={ingredients} />
          </DndProvider>
        </main>
      </div>
    </>
  );
};
