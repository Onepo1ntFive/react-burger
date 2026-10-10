import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';

import type { RootState } from '@services/store.ts';
import type * as React from 'react';

export const IngredientModal = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ingredient = useSelector((state: RootState) => {
    return state.ingredient.ingredients.find((el) => el._id === id);
  });
  return (
    <>
      <Modal
        onClose={() => {
          void navigate('/');
        }}
        title={'Детали ингредиента'}
      >
        {ingredient ? (
          <IngredientDetails ingredient={ingredient} />
        ) : (
          <div className={'p-10'}>
            <Preloader />
          </div>
        )}
      </Modal>
    </>
  );
};
