import ListItem from './ListItem';

import { Text, Margin, InteractiveElement, Flexbox } from '../shared';

import styles from './index.module.sass';

type Props = {
  projects?: Array<{ listName: string, listItems: Array<string> }>,
};
export default function ProjectsList({ projects }: Props): React$Node {
  return (
    <div>
      <Flexbox flexDirection="column" rowGap={24}>
        {projects.map((list) => (
          <div>
            <Margin top={8} bottom={8}>
              <Flexbox columnGap={8}>
                <Text type="s1b" color="--neutral-color-800">
                  {`${list.listName} (3 / ${list.listItems.length})`}
                </Text>
                <Text type="s1r" color="--neutral-color-500">
                  -
                </Text>
                <InteractiveElement>
                  <Text type="s0r" color="--neutral-color-500">
                    See all
                  </Text>
                </InteractiveElement>
              </Flexbox>
            </Margin>
            <div className={styles.listContainer}>
              {list.listItems.map((item, key) => {
                if (key > 2) return null;
                const id = `${item.projectName}-${key}`;
                return <ListItem key={id} item={item} />;
              })}
            </div>
          </div>
        ))}
      </Flexbox>
    </div>
  );
}

ProjectsList.defaultProps = {
  projects: [],
};
