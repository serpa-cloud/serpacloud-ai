import Text from '../Text';
import Flexbox from '../Flexbox';

import styles from './index.module.sass';

type Props = {
  filter: Array<string>,
  principalFilter: string,
};

const bgColors = ['#563aff', '#ff5a65', '#1d88fe', '#8fc3ff', '#11845b'];

export default function FilterGroup({ filter, principalFilter }: Props): React$Node {
  return (
    <>
      <Text type="s0m" color="--neutral-color-600">
        {filter.length > 1 ? 'is any of' : 'is'}
      </Text>
      <Flexbox columnGap={4}>
        {filter.map((value, key) => {
          return (
            <div
              className={`${styles.projectIcon} ${key > 0 ? styles.projectIconLeft : ''}`}
              style={{ backgroundColor: bgColors[key % bgColors.length] }}
            >
              {value.split('')[0].toUpperCase()}
            </div>
          );
        })}
        {filter.length > 1 && (
          <Text type="s0m" color="--neutral-color-600">
            {filter.length}
          </Text>
        )}
        <Text type="s0m" color="--neutral-color-800">
          {filter.length > 1 ? `${principalFilter}s` : filter[0]}
        </Text>
      </Flexbox>
    </>
  );
}
