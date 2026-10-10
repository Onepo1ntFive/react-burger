import { useLoginUserMutation } from '@api/userApi.ts';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Form } from '@components/form/form.tsx';
import { Layout } from '@components/layout/layout.tsx';
import { setUserData } from '@services/user/slice.ts';
import { getErrorMessage } from '@utils/errors.ts';

import type { TLocationState } from '@utils/types.ts';
import type * as React from 'react';

export const PageLogin = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as TLocationState | null)?.from?.pathname ?? '/';
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const loginUserHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await loginUser(formData).unwrap();

      dispatch(setUserData(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      toast.success('Успех!');
      void navigate(from, { replace: true });
    } catch (error) {
      toast.error(`ERROR: ${getErrorMessage(error)}`);
    }
  };
  return (
    <Layout>
      <Form>
        <h1 className="text text_type_main-medium pb-6">Вход</h1>
        <form
          onSubmit={(event) => {
            void loginUserHandler(event);
          }}
        >
          <Input
            disabled={isLoading}
            extraClass={'pb-6'}
            errorText="Ошибка"
            name="name"
            placeholder="E-mail"
            size="default"
            type="email"
            value={formData.email}
            onChange={(event) => {
              setFormData({ ...formData, email: event.target.value });
            }}
          />
          <PasswordInput
            disabled={isLoading}
            extraClass={'pb-6'}
            placeholder="Пароль"
            icon="ShowIcon"
            name="password"
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
            }}
            value={formData.password}
          />
          <Button
            disabled={isLoading}
            size="medium"
            htmlType="submit"
            type="primary"
            extraClass={'mb-20'}
          >
            Войти
          </Button>
        </form>
        <div className="text text_type_main-default text_color_inactive pb-4">
          Вы&nbsp;— новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
        </div>
      </Form>
    </Layout>
  );
};
