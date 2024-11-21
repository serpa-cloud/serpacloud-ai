import { useState } from 'react';
import Flexbox from '../Flexbox';
import InteractiveElement from '../InteractiveElement';
import Icon from '../Icon';
import Text from '../Text';
import TagItem from './TagItem';

import styles from './index.module.sass';

type Props = {
  text: string,
  icon?: string,
  isFilter?: boolean,
  callback?: (string) => void,
  filter?: Array<string>,
  addFilter?: (string) => void,
  deleteFilter?: (string) => void,
  setFilter?: (Array<string>) => void,
};

export default function FilterTag({
  text,
  icon,
  isFilter,
  callback,
  filter,
  addFilter,
  deleteFilter,
  setFilter,
}: Props): React$Node {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <div className={styles.tagContainer}>
      <InteractiveElement onClick={() => setMenuOpen((prev) => !prev)}>
        <Flexbox alignItems="center" className={styles.filterTag}>
          <Flexbox alignItems="center" columnGap={4}>
            <Text type="s0m" color="--neutral-color-800">
              {text}
            </Text>
            <InteractiveElement
              onClick={() => {
                if (isFilter) deleteFilter(text);
                else callback(text);
              }}
            >
              <Icon size={14} icon={icon} color="--neutral-color-800" weight={700} />
            </InteractiveElement>
          </Flexbox>
        </Flexbox>
      </InteractiveElement>
      {!isFilter && menuOpen && (
        <dialog className={styles.optionsMenu} open>
          <TagItem
            projectName="Andromeda"
            isFilter={isFilter}
            callback={callback}
            closeMenu={closeMenu}
            filter={filter}
            addFilter={addFilter}
            setFilter={setFilter}
          />
          <TagItem
            projectName="apology-20211"
            isFilter={isFilter}
            callback={callback}
            closeMenu={closeMenu}
            filter={filter}
            addFilter={addFilter}
            setFilter={setFilter}
          />
          <TagItem
            projectName="behave-80538"
            isFilter={isFilter}
            callback={callback}
            closeMenu={closeMenu}
            filter={filter}
            addFilter={addFilter}
            setFilter={setFilter}
          />
        </dialog>
      )}
    </div>
  );
}

FilterTag.defaultProps = {
  icon: '',
  isFilter: false,
  callback: () => {},
  filter: [],
  addFilter: () => {},
  deleteFilter: () => {},
  setFilter: () => {},
};