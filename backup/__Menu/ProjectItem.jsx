/* eslint-disable react/no-array-index-key */
// @flow
import stylex from '@serpa-cloud/stylex';
import { Text, Flexbox, Icon } from '../shared';

const styles = stylex.create({
  directoryRow: {
    width: '100%',
  },
  directoryItem: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
    width: 'calc(100% - 32px)',
  },
  directoryPath: {
    fontFamily: 'var(--font-family-default)',
    fontSize: 12,
    color: 'var(--neutral-color-600)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

type Props = {|
  +directory: {
    path: string,
    name: string,
  },
|};

export default function ProjectItem({ directory }: Props): React$Node {
  const handleContextMenu = (event) => {
    event.preventDefault();
    window.codegen.showContextMenu(directory.path);
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <Flexbox alignItems="center" columnGap={12} className={stylex(styles.directoryRow)}>
        <Icon icon="folder" size={20} />
        <div className={stylex(styles.directoryItem)}>
          <Text type="s0b" color="--neutral-color-800">
            {directory.name}
          </Text>
          <span className={stylex(styles.directoryPath)}>{directory.path}</span>
        </div>
      </Flexbox>
    </div>
  );
}
