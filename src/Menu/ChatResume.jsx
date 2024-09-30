// @flow
import { useState } from 'react';
import { useIntl } from 'react-intl';
import stylex from '@serpa-cloud/stylex';
import { graphql, useFragment, loadQuery, useRelayEnvironment } from 'react-relay';

import { InteractiveElement, Padding } from '../shared';

import type { ChatResume$key } from './__generated__/ChatResume.graphql';
import MessagesListPaginationQuery from '../Chat/__generated__/MessagesListPaginationQuery.graphql';

type Props = {|
  node: ChatResume$key,
  conversation: ?string,
  setConversation: (string) => void,
  setConversationRef: (any) => void,
|};

const styles = stylex.create({
  active: {
    background: 'var(--neutral-color-100)',
    boxShadow: 'var(--shadow-1)',
  },
  root: {
    borderRadius: 4,
    ':hover': {
      background: 'var(--neutral-color-300)',
      boxShadow: 'var(--shadow-1)',
    },
  },
  resume: {
    fontSize: '14px',
    display: 'block',
    maxWidth: '100%',
    lineHeight: '19px',
    fontWeight: '400',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'var(--font-family-default)',
    textRendering: 'optimizelegibility',
  },
  resumeActive: {
    color: 'var(--primary-color-1)',
  },
  resumeInactive: {
    color: 'var(--neutral-color-600)',
  },
});

export default function ChatResume({
  node,
  conversation,
  setConversation,
  setConversationRef,
}: Props): React$Node {
  const intl = useIntl();
  const relayEnvironment = useRelayEnvironment();
  const [queryRef, setQueryRef] = useState(null);

  const data = useFragment(
    graphql`
      fragment ChatResume on Chat {
        id
        resume
      }
    `,
    node,
  );

  const isActive = conversation === data?.id;

  return (
    <InteractiveElement
      className={stylex(styles.root, isActive ? styles.active : null)}
      onClick={() => {
        setConversation(data.id);
        setConversationRef(queryRef);
      }}
      onMouseEnter={() => {
        if (!isActive && !queryRef) {
          const queryReference = loadQuery(
            relayEnvironment,
            MessagesListPaginationQuery,
            { last: 20, id: data.id },
            { fetchPolicy: 'store-and-network' },
          );

          setQueryRef(queryReference);
        }
      }}
    >
      <Padding vertical={12} horizontal={8}>
        {!!data?.resume && (
          <div
            className={stylex(
              styles.resume,
              isActive ? styles.resumeActive : styles.resumeInactive,
            )}
          >
            {data?.resume}
          </div>
        )}
        {!data?.resume && (
          <div
            className={stylex(
              styles.resume,
              isActive ? styles.resumeActive : styles.resumeInactive,
            )}
          >
            <i>{intl.formatMessage({ id: 'newChat' })}</i>
          </div>
        )}
      </Padding>
    </InteractiveElement>
  );
}
