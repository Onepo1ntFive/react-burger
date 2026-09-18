import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClick: () => void;
};

export const ModalOverlay = ({ onClick }: TModalOverlayProps): React.JSX.Element => {
  return <div onClick={onClick} className={styles.modal_overlay} />;
};
