import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Form } from '@components/form/form.tsx';
import { selectUser } from '@services/user/slice.ts';

import type { TEditableField, TProfileForm } from '@utils/types.ts';
import type * as React from 'react';

export const ProfileForm = (): React.JSX.Element => {
  const user = useSelector(selectUser);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<TProfileForm>({ name: '', email: '', password: '' });
  const [editing, setEditing] = useState<Record<TEditableField, boolean>>({
    name: false,
    email: false,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: user?.name ?? '',
      email: user?.email ?? '',
    }));
  }, [user]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setEditing({ name: false, email: false });
    console.log('Тут будет сохранение..');
  };

  const isDirty =
    form.name !== (user?.name ?? '') ||
    form.email !== (user?.email ?? '') ||
    form.password !== '' ||
    editing.name ||
    editing.email;
  return (
    <Form>
      <form onSubmit={handleSubmit}>
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
            <Button htmlType="submit" size="medium" type="primary">
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
      </form>
    </Form>
  );
};
