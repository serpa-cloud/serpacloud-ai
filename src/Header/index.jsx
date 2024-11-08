// @flow

import { Link } from 'react-router-dom';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { Flexbox, Avatar, TapIcon, useDevice, useCreateAIProject } from '../shared';

import { ReactComponent as Logo } from '../shared/images/icon.svg';

import styles from './index.module.sass';

export default function Header(): React$Node {
  const { os } = useDevice();
  const [createProject] = useCreateAIProject();

  const isMacOS = os.includes('Mac OS ');

  const userData = useLazyLoadQuery(
    graphql`
      query HeaderQuery {
        me {
          id
          media(width: 80, height: 80) {
            id
            ...Avatar
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  return (
    <header className={styles.header}>
      <Link to="/app">
        <Logo width={40} height={40} />
      </Link>
      <Flexbox flexDirection="column" rowGap={16}>
        <TapIcon
          icon="search"
          keymap="f"
          onTap={() => console.log('search')}
          modifier={isMacOS ? 'metaKey' : 'ctrlKey'}
          label={`[${isMacOS ? 'cmd' : 'ctrl'} + f] Search`}
        />
        <TapIcon icon="add" label="[c] Create" onTap={createProject} keymap="c" />
        <Avatar node={userData.me.media} shadow />
      </Flexbox>
    </header>
  );
}
