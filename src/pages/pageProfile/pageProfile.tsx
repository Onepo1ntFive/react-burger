import { useLogoutUserMutation } from '@api/userApi.ts';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Form } from '@components/form/form.tsx';
import { Layout } from '@components/layout/layout.tsx';
import { selectUser } from '@services/user/slice.ts';
import { getErrorMessage } from '@utils/errors.ts';

import type * as React from 'react';

import styles from './profile.module.css';

export const PageProfile = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const logoutUserHandler = async (): Promise<void> => {
    try {
      await logoutUser({
        token: localStorage.getItem('refreshToken') ?? '',
      }).unwrap();
    } catch (error) {
      toast.error(`ERROR: ${getErrorMessage(error)}`);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      void navigate('/login');
    }
  };
  return (
    <Layout>
      <div className={`${styles.profile}`}>
        <nav className={`${styles.profile_nav}`}>
          <Link
            className={`text text_type_main-default ${!matchPath('/profile', pathname) ? 'text_color_inactive' : 'text_color_default'}`}
            to={'/profile'}
          >
            Профиль
          </Link>
          <Link
            className={`text text_type_main-defsault ${!matchPath('/profile/orders', pathname) ? 'text_color_inactive' : 'text_color_default'}`}
            to={'/profile/orders'}
          >
            История заказов
          </Link>
          <Button
            htmlType="button"
            extraClass="text text_type_main-default text_color_inactive"
            type="secondary"
            onClick={() => {
              void logoutUserHandler();
            }}
          >
            Выход
          </Button>
          <div className="text text_type_main-default text_color_inactive pt-20">
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </nav>
        <div className={styles.profile_content}>
          {matchPath('/profile', pathname) ? (
            <Form>
              <Input
                extraClass={'pb-6'}
                errorText="Ошибка"
                name="name"
                placeholder="Имя"
                size="default"
                type="email"
                icon="EditIcon"
                readOnly
                value={user?.name ?? ''}
                onChange={() => ''}
              />
              <Input
                extraClass={'pb-6'}
                errorText="Ошибка"
                name="login"
                placeholder="Логин"
                size="default"
                type="email"
                icon="EditIcon"
                readOnly
                value={user?.email ?? ''}
                onChange={() => ''}
              />
              <PasswordInput
                value="пароликтоспрятали"
                icon="EditIcon"
                readOnly
                onChange={() => ''}
                name="password"
                placeholder="Пароль"
              />
            </Form>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </Layout>
  );
};
