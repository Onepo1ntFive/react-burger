import type { ReactNode } from 'react';

import styles from './form.module.css';

type TFormProps = {
  children: ReactNode;
};

export const Form = ({ children }: TFormProps): React.JSX.Element => {
  return <div className={`${styles.form} form`}>{children}</div>;
};
