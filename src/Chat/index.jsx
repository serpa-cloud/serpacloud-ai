// @flow
import { Suspense } from 'react';
import stylex from '@serpa-cloud/stylex';

import Loader from './Loader';

import { Flexbox, Text } from '../shared';

import Messages from './Messages';
import Composer from './Composer';

const styles = stylex.create({
  root: {
    height: 'calc(100vh - 41px)',
    boxSizing: 'border-box',
    background: 'var(--neutral-gradient)',
  },
  fallback: {
    flex: 1,
    overflow: 'auto',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
});

const conversation = 'ConversationAI:f8f95fb0-79ec-11ef-9101-c12c1b8d2af8';

export default function Chat(): React$Node {
  return (
    <Flexbox flexDirection="column" className={stylex(styles.root)}>
      <Suspense
        fallback={
          <>
            <Flexbox
              className={stylex(styles.fallback)}
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              rowGap={24}
            >
              <Loader />
              <Text type="s2b" color="--neutral-color-800">
                Serpa CodeGen AI
              </Text>
            </Flexbox>
            <Composer conversation={conversation} disable />
          </>
        }
      >
        <Messages conversation={conversation} />
        <Composer conversation={conversation} />
      </Suspense>
    </Flexbox>
  );
}
