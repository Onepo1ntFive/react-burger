import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import ky from 'ky';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { API_INGREDIENTS, API_URL } from '@utils/consts.ts';

import 'normalize.css';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await ky(`${API_URL}${API_INGREDIENTS}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      const data: unknown = json.data;
      setIngredients(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} p-5`}>
        {isLoading || !ingredients ? (
          <Preloader />
        ) : (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </main>
    </div>
  );
};
