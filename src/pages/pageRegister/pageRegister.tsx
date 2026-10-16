import { useRegisterUserMutation } from '@api/userApi.ts';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { Form } from '@components/form/form.tsx';
import { Layout } from '@components/layout/layout.tsx';
import { getErrorMessage } from '@utils/errors.ts';

import type * as React from 'react';

export const PageRegister = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const registerUserHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await registerUser(formData).unwrap();

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      toast.success('Успех!');
      void navigate('/login');
    } catch (error) {
      toast.error(`ERROR: ${getErrorMessage(error)}`);
    }
  };
  return (
    <Layout>
      <Form>
        <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
        <form
          onSubmit={(event) => {
            void registerUserHandler(event);
          }}
        >
          <Input
            disabled={isLoading}
            extraClass={'pb-6'}
            errorText="Ошибка"
            name="name"
            placeholder="Имя"
            size="default"
            type="text"
            value={formData.name}
            onChange={(event) => {
              setFormData({ ...formData, name: event.target.value });
            }}
          />
          <Input
            disabled={isLoading}
            extraClass={'pb-6'}
            errorText="Ошибка"
            name="email"
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
            size="medium"
            htmlType="submit"
            type="primary"
            extraClass={`mb-20 ${isLoading ? 'button-loading' : ''}`}
            disabled={isLoading}
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
        </div>
      </Form>
    </Layout>
  );
};
