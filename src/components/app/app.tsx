import {
  PageFeed,
  PageForgotPassword,
  PageHome,
  PageIngredientDetail,
  PageLogin,
  PageProfile,
  PageProfileOrder,
  PageRegister,
  PageResetPassword,
} from '@/pages';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { IngredientModal } from '@components/ingredient-modal/ingredient-modal.tsx';
import { ProtectedRoute } from '@components/protected-route/protected-route.tsx';
import { useAppDispatch } from '@services/hooks.ts';
import { checkUserAuth } from '@services/user/actions.ts';

import type { TLocationState } from '@utils/types.ts';

import 'normalize.css';

export const App = (): React.JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const backgroundLocation = (location.state as TLocationState | null)
    ?.backgroundLocation;

  useEffect(() => {
    void dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<PageHome />} />
        <Route path="/ingredients/:id" element={<PageIngredientDetail />} />
        <Route path="/feed" element={<PageFeed />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<PageProfile />}>
            <Route path="orders" element={<PageProfileOrder />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path="/register" element={<PageRegister />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/forgot-password" element={<PageForgotPassword />} />
          <Route path="/reset-password" element={<PageResetPassword />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
    </>
  );
};
