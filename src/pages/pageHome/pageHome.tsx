import { useGetIngredientsQuery } from '@api/ingredientsApi.ts';
import { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { Layout } from '@components/layout/layout.tsx';

import type { TIngredient } from '@utils/types.ts';

export const PageHome = (): React.JSX.Element => {
  const { data, isLoading } = useGetIngredientsQuery();

  const ingredients: TIngredient[] | [] = useMemo(
    () => (data?.success ? data.data : []),
    [data]
  );
  return (
    <Layout title={'Собери бургер'}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients ingredients={ingredients} isLoading={isLoading} />
        <BurgerConstructor ingredients={ingredients} />
      </DndProvider>
    </Layout>
  );
};
