import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, matchPath, useLocation } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to="/"
            className={`${styles.link} ${matchPath('/', pathname) ? styles.link_active : ''}`}
          >
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </Link>
          <Link
            to="/feed"
            className={`${styles.link} ${matchPath('/feed', pathname) ? styles.link_active : ''} ml-10`}
          >
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link
          to="/profile"
          className={`${styles.link} ${matchPath('/profile', pathname) ? styles.link_active : ''} ${styles.link_position_last}`}
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </Link>
      </nav>
    </header>
  );
};
