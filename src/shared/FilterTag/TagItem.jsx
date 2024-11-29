import { useState, useEffect } from 'react';

import Flexbox from '../Flexbox';
import Checkbox from '../Checkbox';
import InteractiveElement from '../InteractiveElement';
import Icon from '../Icon';

import styles from './index.module.sass';

type Props = {
  projectName: string,
  closeMenu?: () => void,
  filter?: Array<string>,
  handleFilter?: (string, string) => void,
  icon?: string,
  isFilter?: boolean,
};

export default function TagItem({
  projectName,
  closeMenu,
  filter,
  handleFilter,
  icon,
  isFilter,
}: Props): React$Node {
  const [checked, setChecked] = useState(filter.includes(projectName));

  const check = () => {
    setChecked((prev) => {
      handleFilter(projectName, (isFilter && (prev ? 'delete' : 'add')) || icon);
      return !prev;
    });
  };

  useEffect(() => {
    setChecked(filter.includes(projectName));
  }, [filter, projectName]);
  return (
    <Flexbox columnGap={8} alignItems="center" className={styles.itemContainer}>
      {(icon && <Icon size={14} icon={icon} color="--neutral-color-800" weight={700} />) || (
        <Checkbox checked={checked} onChange={check} />
      )}
      <InteractiveElement
        className={styles.itemText}
        onClick={() => {
          check();
          closeMenu();
        }}
      >
        <div>{projectName}</div>
      </InteractiveElement>
    </Flexbox>
  );
}

TagItem.defaultProps = {
  closeMenu: () => {},
  filter: [],
  handleFilter: () => {},
  icon: '',
  isFilter: false,
};
