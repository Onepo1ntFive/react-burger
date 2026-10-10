import { useGetIngredientsQuery } from '@api/ingredientsApi.ts';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { Layout } from '@components/layout/layout.tsx';
import { Modal } from '@components/modal/modal.tsx';

import type { TIngredient } from '@utils/types.ts';
import type * as React from 'react';

export const PageIngredientDetail = (): React.JSX.Element => {
  console.log('PageIngredientDetail');
  const { data, isLoading } = useGetIngredientsQuery();
  const navigate = useNavigate();

  const ingredients: TIngredient[] | [] = useMemo(
    () => (data?.success ? data.data : []),
    [data]
  );

  const { id } = useParams();
  const ingredient = ingredients.find((el) => el._id === id);

  return (
    <Layout>
      {ingredient ? (
        <Modal
          onClose={() => {
            void navigate('/');
          }}
          title={'Детали ингредиента'}
        >
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      ) : (
        isLoading && <Preloader />
      )}
    </Layout>
  );
};
