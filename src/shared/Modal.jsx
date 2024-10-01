// @flow
import stylex from '@serpa-cloud/stylex';
import { createPortal } from 'react-dom';
import Text from './Text';

const styles = stylex.create({
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    maxWidth: 600,
    width: '100%',
    maxHeight: '80vh', // Altura máxima del 80% de la ventana
    display: 'flex',
    flexDirection: 'column',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalBody: {
    overflowY: 'auto',
    flex: 1,
  },
});

type Props = {|
  +children: React$Node,
  +title: string,
|};

export default function Modal({ children, title }: Props): React$Node {
  return createPortal(
    <div className={stylex(styles.modalOverlay)}>
      <div className={stylex(styles.modalContent)}>
        <div className={stylex(styles.modalHeader)}>
          <Text type="s1b" color="--primary-color-1">
            {title}
          </Text>
        </div>
        <div className={stylex(styles.modalBody)}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
