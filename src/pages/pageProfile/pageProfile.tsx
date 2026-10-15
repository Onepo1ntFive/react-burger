import { useLogoutUserMutation } from '@api/userApi.ts';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Form } from '@components/form/form.tsx';
import { Layout } from '@components/layout/layout.tsx';
import { selectUser } from '@services/user/slice.ts';
import { getErrorMessage } from '@utils/errors.ts';

import type { TEditableField, TProfileForm } from '@utils/types.ts';
import type * as React from 'react';

import styles from './profile.module.css';

export const PageProfile = (): React.JSX.Element => {
  const { pathname } = useLocation();

  const [form, setForm] = useState<TProfileForm>({ name: '', email: '', password: '' });
  const [editing, setEditing] = useState<Record<TEditableField, boolean>>({
    name: false,
    email: false,
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
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
  const handleChange =
    (field: keyof TProfileForm) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleIconClick = (field: TEditableField): void => {
    setEditing((prev) => ({ ...prev, [field]: true }));

    const refs: Record<TEditableField, React.RefObject<HTMLInputElement | null>> = {
      name: nameRef,
      email: emailRef,
    };
    setTimeout(() => {
      refs[field].current?.focus();
    }, 0);
  };

  const handleCancel = (): void => {
    setForm({ name: user?.name ?? '', email: user?.email ?? '', password: '' });
    setEditing({ name: false, email: false });
  };

  const handleSubmit = (): void => {
    console.log('Тут будет сохранение..');
  };

  const isDirty =
    form.name !== (user?.name ?? '') ||
    form.email !== (user?.email ?? '') ||
    form.password !== '' ||
    editing.name ||
    editing.email;

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: user?.name ?? '',
      email: user?.email ?? '',
    }));
  }, [user]);
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
                icon="EditIcon"
                name="name"
                placeholder="Имя"
                size="default"
                type="text"
                value={form.name}
                disabled={!editing.name}
                onChange={handleChange('name')}
                onIconClick={() => {
                  handleIconClick('name');
                }}
                ref={nameRef}
              />
              <Input
                extraClass={'pb-6'}
                icon="EditIcon"
                name="email"
                placeholder="Логин"
                size="default"
                type="email"
                value={form.email}
                disabled={!editing.email}
                onChange={handleChange('email')}
                onIconClick={() => {
                  handleIconClick('email');
                }}
                ref={emailRef}
              />
              <PasswordInput
                extraClass={'pb-6'}
                icon="EditIcon"
                name="password"
                placeholder="Пароль"
                value={form.password}
                onChange={handleChange('password')}
              />
              {isDirty && (
                <div>
                  <Button
                    htmlType="button"
                    size="medium"
                    type="primary"
                    onClick={() => {
                      void handleSubmit();
                    }}
                  >
                    Сохранить
                  </Button>
                  <Button
                    htmlType="button"
                    size="medium"
                    type="secondary"
                    onClick={handleCancel}
                  >
                    Отмена
                  </Button>
                </div>
              )}
            </Form>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </Layout>
  );
};
