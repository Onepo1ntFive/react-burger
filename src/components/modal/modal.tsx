import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, useEffect } from 'react';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay.tsx';

import styles from './modal.module.css';

type TModalProps = {
  children: ReactNode;
  title?: string | null;
  onClose: () => void;
};

export const Modal = ({ children, title, onClose }: TModalProps): React.JSX.Element => {
  useEffect(() => {
    const handleKeyDown = (event: Event): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keyup', handleKeyDown);
    return (): void => {
      window.removeEventListener('keyup', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <ModalOverlay />
      <div className={`${styles.modal}`}>
        <div className={`${styles.modal_inner} p-10`}>
          <div className={`${styles.modal_header} text text_type_main-large`}>
            {title ?? title}
            <CloseIcon
              className={styles.modal_close}
              type="primary"
              onClick={() => {
                onClose();
              }}
            />
          </div>
          {children}
        </div>
      </div>
      Î
    </>
  );
};
