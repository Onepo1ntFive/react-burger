import { useResetPasswordMutation } from '@api/userApi.ts';
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

export const PageResetPassword = (): React.JSX.Element => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: '', token: '' });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const resetPasswordHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const data = { ...formData, token: `/reset-password/${formData.token}` };
      const response = await resetPassword(data).unwrap();

      toast.success(response.message ?? 'Успех!');
      void navigate('/login');
    } catch (error) {
      toast.error(`ERROR: ${getErrorMessage(error)}`);
    }
  };
  return (
    <Layout>
      <Form>
        <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
        <form
          onSubmit={(event) => {
            void resetPasswordHandler(event);
          }}
        >
          <PasswordInput
            extraClass={'pb-6'}
            placeholder="Введите новый пароль"
            icon="ShowIcon"
            name="password"
            disabled={isLoading}
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
            }}
            value={formData.password}
          />
          <Input
            extraClass={'pb-6'}
            errorText="Ошибка"
            name="name"
            placeholder="Введите код из письма"
            size="default"
            type="text"
            disabled={isLoading}
            value={formData.token}
            onChange={(event) => {
              setFormData({ ...formData, token: event.target.value });
            }}
          />
          <Button
            size="medium"
            htmlType="submit"
            type="primary"
            extraClass={`mb-20 ${isLoading ? 'button-loading' : ''}`}
            disabled={isLoading}
          >
            Сохранить
          </Button>
        </form>
        <div className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to={'/login'}>Войти</Link>
        </div>
      </Form>
    </Layout>
  );
};
