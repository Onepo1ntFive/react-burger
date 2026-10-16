import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@services/hooks.ts';
import { selectIsAuthChecked, selectUser } from '@services/user/slice.ts';

import type { TLocationState } from '@utils/types.ts';
import type * as React from 'react';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
}: TProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as TLocationState | null)?.from;
    return <Navigate to={from?.pathname ?? '/'} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
