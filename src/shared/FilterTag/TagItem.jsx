import { useState, useEffect } from 'react';

import Flexbox from '../Flexbox';
import Checkbox from '../Checkbox';
import InteractiveElement from '../InteractiveElement';

import styles from './index.module.sass';

type Props = {
  projectName: string,
  callback?: (string) => void,
  closeMenu?: () => void,
  filter?: Array<string>,
  setFilter?: (Array<string>) => void,
};

export default function TagItem({
  projectName,
  callback,
  closeMenu,
  filter,
  setFilter,
}: Props): React$Node {
  const [checked, setChecked] = useState(filter.includes(projectName));

  const check = () => {
    setChecked((prev) => {
      setFilter((prevFilter) => {
        if (!prev) {
          if (!prevFilter.includes(projectName)) {
            return [...filter, projectName];
          }
          return prevFilter;
        }

        return prevFilter.filter((item) => item !== projectName);
      });
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
          callback(projectName);
          closeMenu();
        }}
      >
        <div>{projectName}</div>
      </InteractiveElement>
    </Flexbox>
  );
}

TagItem.defaultProps = {
  callback: () => {},
  closeMenu: () => {},
  filter: [],
  setFilter: () => {},
};
