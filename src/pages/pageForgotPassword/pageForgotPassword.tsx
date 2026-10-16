import { useForgotPasswordMutation } from '@api/userApi.ts';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { Form } from '@components/form/form.tsx';
import { Layout } from '@components/layout/layout.tsx';
import { getErrorMessage } from '@utils/errors.ts';

import type * as React from 'react';

export const PageForgotPassword = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '' });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const forgotPasswordHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await forgotPassword(formData).unwrap();

      toast.success(response.message ?? 'Успех!');
      void navigate('/reset-password');
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
            void forgotPasswordHandler(event);
          }}
        >
          <Input
            extraClass={'pb-6'}
            errorText="Ошибка"
            name="name"
            placeholder="E-mail"
            size="default"
            type="email"
            disabled={isLoading}
            value={formData.email}
            onChange={(event) => {
              setFormData({ ...formData, email: event.target.value });
            }}
          />
          <Button
            size="medium"
            htmlType="submit"
            type="primary"
            extraClass={`mb-20 ${isLoading ? 'button-loading' : ''}`}
            disabled={isLoading}
          >
            Восстановить
          </Button>
        </form>
        <div className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to={'/login'}>Войти</Link>
        </div>
      </Form>
    </Layout>
  );
};
