import TagItem from './TagItem';

import styles from './index.module.sass';

type Props = {
  filterList: Array<{
    name: string,
    icon: string,
  }>,
  setFilterMenuOpen: (boolean) => void,
  filter: Array<string>,
  handleFilter: (string, string) => void,
  isFilter: boolean,
};

export default function FilterDialog({
  filterList,
  setFilterMenuOpen,
  filter,
  handleFilter,
  isFilter,
}: Props): React$Node {
  return (
    <div className={styles.optionsMenu}>
      {filterList.map((listItem) => {
        return (
          <TagItem
            projectName={listItem.name}
            closeMenu={setFilterMenuOpen}
            filter={filter}
            handleFilter={handleFilter}
            icon={listItem.icon}
            isFilter={isFilter}
          />
        );
      })}
    </div>
  );
}
