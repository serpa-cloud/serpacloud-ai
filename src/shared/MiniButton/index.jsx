// @flow

import Text from '../Text';
import Icon from '../Icon';
import Spinner from '../Spinner';
import InteractiveElement from '../InteractiveElement';

import styles from './index.module.sass';

type Props = {|
  +icon: string,
  +text: string,
  +type?: ?string,
  +pending?: ?boolean,
  +onClick: () => void | Promise<void>,
|};

export default function MiniButton({
  icon,
  text,
  onClick,
  type = '',
  pending = false,
}: Props): React$Node {
  return (
    <InteractiveElement onClick={onClick}>
      <div className={styles.button}>
        {pending ? (
          <Spinner size={16} />
        ) : (
          <Icon
            size={20}
            grade={-25}
            icon={icon}
            weight={200}
            color="--neutral-color-800"
            gradient={
              type === 'CANCEL'
                ? ''
                : 'linear-gradient(225deg, rgb(255, 82, 207) 0%, rgb(255, 103, 82) 100%)'
            }
          />
        )}
        <Text type="s0m" color="--neutral-color-800">
          {text}
        </Text>
      </div>
    </InteractiveElement>
  );
}
