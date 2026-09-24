import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  return (
    <div className={`${styles.modal_order}`}>
      <div className={`${styles.modal_order_id} text text_type_digits-large pb-8`}>
        034536
      </div>
      <div className={`text text_type_main-medium pb-15`}>идентификатор заказа</div>
      <div className={`${styles.modal_order_done} mb-15`}>
        <CheckMarkIcon type="primary" />
      </div>
      <div className={`text mb-2`}>Ваш заказ начали готовить</div>
      <div className={`text ${styles.modal_accent} mb-15`}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};
