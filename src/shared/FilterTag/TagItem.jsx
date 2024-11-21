import { useState, useEffect } from 'react';

import Flexbox from '../Flexbox';
import Checkbox from '../Checkbox';
import InteractiveElement from '../InteractiveElement';

import styles from './index.module.sass';

type Props = {
  projectName: string,
  closeMenu?: () => void,
  filter?: Array<string>,
  handleFilter?: (string, string) => void,
};

export default function TagItem({
  projectName,
  closeMenu,
  filter,
  handleFilter,
}: Props): React$Node {
  const [checked, setChecked] = useState(filter.includes(projectName));

  const check = () => {
    setChecked((prev) => {
      handleFilter(projectName, prev ? 'delete' : 'add');
      return !prev;
    });
  };

  useEffect(() => {
    setChecked(filter.includes(projectName));
  }, [filter, projectName]);
  return (
    <Flexbox columnGap={8} alignItems="center" className={styles.itemContainer}>
      <Checkbox checked={checked} onChange={check} />
      <InteractiveElement
        className={styles.itemText}
        onClick={() => {
          handleFilter(projectName, 'add');
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
};
