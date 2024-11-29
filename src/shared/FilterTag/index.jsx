import Flexbox from '../Flexbox';
import InteractiveElement from '../InteractiveElement';
import Icon from '../Icon';
import Text from '../Text';

import styles from './index.module.sass';

type Props = {
  text: string,
  icon?: string,
  isFilter?: boolean,
  callback?: (string) => void,
  handleFilter?: (string, string) => void,
  setFilterMenuOpen?: (boolean) => void,
};

export default function FilterTag({
  text,
  icon,
  isFilter,
  callback,
  handleFilter,
  setFilterMenuOpen,
}: Props): React$Node {
  return (
    <div className={styles.tagContainer}>
      <InteractiveElement
        className={isFilter ? styles.normalCursor : null}
        onClick={() => {
          // if (isFilter) return;
          setFilterMenuOpen((prev) => !prev);
        }}
      >
        <Flexbox alignItems="center" className={styles.filterTag}>
          <Flexbox alignItems="center" columnGap={4}>
            <InteractiveElement
              onClick={() => {
                if (isFilter) handleFilter(text, 'delete');
                else callback(text, icon);
              }}
            >
              {icon && <Icon size={14} icon={icon} color="--neutral-color-800" weight={700} />}
            </InteractiveElement>
            {text && (
              <Text type="s0m" color="--neutral-color-800">
                {text}
              </Text>
            )}
          </Flexbox>
        </Flexbox>
      </InteractiveElement>
    </div>
  );
}

FilterTag.defaultProps = {
  icon: '',
  isFilter: false,
  callback: () => {},
  handleFilter: () => {},
  setFilterMenuOpen: () => {},
};
