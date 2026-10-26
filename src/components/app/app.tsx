import {
  PageFeed,
  PageOrderDetail,
  PageForgotPassword,
  PageHome,
  PageIngredientDetail,
  PageLogin,
  PageProfile,
  PageRegister,
  PageResetPassword,
} from '@/pages';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { IngredientModal } from '@components/ingredient-modal/ingredient-modal.tsx';
import { Layout } from '@components/layout/layout.tsx';
import { OrderModal } from '@components/order-modal/feed-order-modal.tsx';
import { ProfileFeedOrder } from '@components/profile-feed-order/profile-feed-order.tsx';
import { ProfileForm } from '@components/profile-form/profile-form.tsx';
import { ProtectedRoute } from '@components/protected-route/protected-route.tsx';
import { Page404 } from '@pages/page404/page404.tsx';
import { useGetIngredientsQuery } from '@services/api/ingredientsApi.ts';
import { useAppDispatch } from '@services/hooks.ts';
import { checkUserAuth } from '@services/user/actions.ts';

import type { TLocationState } from '@utils/types.ts';

import 'normalize.css';

export const App = (): React.JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const backgroundLocation = (location.state as TLocationState | null)
    ?.backgroundLocation;

  useGetIngredientsQuery();

  useEffect(() => {
    void dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<PageHome />} />
        <Route path="/ingredients/:id" element={<PageIngredientDetail />} />

        <Route path="/feed" element={<PageFeed />} />
        <Route element={<Layout />}>
          <Route path="/feed/:id" element={<PageOrderDetail />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<PageProfile />}>
            <Route path="" element={<ProfileForm />} />
            <Route path="orders" element={<ProfileFeedOrder />} />
            <Route path="orders/:id" element={<PageOrderDetail />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path="/register" element={<PageRegister />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/forgot-password" element={<PageForgotPassword />} />
          <Route path="/reset-password" element={<PageResetPassword />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
          <Route path="/feed/:id" element={<OrderModal />} />
          <Route path="/profile/orders/:id" element={<OrderModal />} />
        </Routes>
      )}
    </>
  );
};
