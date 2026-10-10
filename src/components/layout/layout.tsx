import { Toaster } from 'react-hot-toast';

import { AppHeader } from '@components/app-header/app-header';

import styles from './layout.module.css';

type TLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const Layout = ({ children, title }: TLayoutProps): React.JSX.Element => {
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        {title && (
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            {title}
          </h1>
        )}
        <main className={`${styles.main} p-5`}>
          <Toaster
            toastOptions={{
              className: 'notif',
              position: 'bottom-center',
            }}
          />
          {children}
        </main>
      </div>
    </>
  );
};
