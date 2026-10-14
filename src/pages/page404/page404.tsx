import { Link } from 'react-router-dom';

import { Layout } from '@components/layout/layout.tsx';

import type * as React from 'react';

import styles from './page404.module.css';

export const Page404 = (): React.JSX.Element => {
  return (
    <Layout>
      <div className={styles.page404}>
        <h1>404</h1>
        <p className={'pb-4'}>Тут.. ничего.. нет.. 😰</p>
        <p>
          <Link to={'/'}>На главную</Link>
        </p>
      </div>
    </Layout>
  );
};
