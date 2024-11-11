import styles from './index.module.sass';

import { Text, Flexbox, Padding, Icon, InteractiveElement } from '../shared';

type Item = {
  projectName: string,
  date: string,
  description: string,
};

type Props = {
  item: Item,
};

export default function ListItem({ item }: Props): React$Node {
  return (
    <div className={styles.itemContainer}>
      <Padding top={16} bottom={16}>
        <Flexbox className={styles.itemList} columnGap={8}>
          <div className={styles.itemStatus} />
          <Flexbox className={styles.itemData} flexDirection="column" rowGap={16}>
            <Flexbox justifyContent="space-between" className={styles.itemHeader}>
              <Flexbox columnGap={8} alignItems="center">
                <Text type="s0b">{item.projectName}</Text>
                <InteractiveElement>
                  <Icon icon="open_in_new" size={16} color="--neutral-color-500" />
                </InteractiveElement>
              </Flexbox>
              <Text type="s0b">{item.date}</Text>
            </Flexbox>
            <Text type="s0r">{item.description}</Text>
          </Flexbox>
        </Flexbox>
      </Padding>
    </div>
  );
}
