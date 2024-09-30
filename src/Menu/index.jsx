// @flow
import stylex from '@serpa-cloud/stylex';
import { useState, useCallback } from 'react';
import { useLazyLoadQuery, graphql, loadQuery, useRelayEnvironment } from 'react-relay';

import NamespaceSelector from './NamespaceSelector';

import {
  Icon,
  Text,
  Flexbox,
  InteractiveElement,
  ContextualMenu,
  Avatar,
  ScrolledList,
  Margin,
} from '../shared';

import NamespaceSelectorQuery from './__generated__/NamespaceSelectorQuery.graphql';
import ChatResume from './ChatResume';

const styles = stylex.create({
  navbar: {
    width: 250,
    height: '100vh',
    borderRight: '1px solid var(--border-color)',
    paddingTop: 36,
    boxSizing: 'border-box',
  },
  namespaceSelectorContainer: {
    position: 'relative',
    paddingLeft: 8,
    paddingRight: 8,
  },
  chatsContainer: {
    height: 'calc(100vh - 84px)',
    overflow: 'auto',
    paddingLeft: 8,
    paddingRight: 8,
  },
});

type Props = {|
  +conversation: ?string,
  +setConversation: (string) => void,
  +setConversationRef: (any) => void,
|};

export default function Menu({
  conversation,
  setConversation,
  setConversationRef,
}: Props): React$Node {
  const [orgMenuIsOpen, setOrgMenuIsOpen] = useState<boolean>(false);

  const handleOnToggleOrgMenu = useCallback(
    (e) => {
      e.stopPropagation();

      setTimeout(() => {
        setOrgMenuIsOpen((x) => !x);
      }, 1);
    },
    [setOrgMenuIsOpen],
  );

  const data = useLazyLoadQuery(
    graphql`
      query MenuQuery {
        getCurrentNameSpace {
          id
          ... on User {
            id
            username
            media(width: 48, height: 48) {
              ...Avatar
            }
          }
          ... on Org {
            id
            key
            media(width: 48, height: 48) {
              ...Avatar
            }
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-and-network',
    },
  );

  const relayEnvironment = useRelayEnvironment();

  const preloadOrganizations = useCallback(() => {
    loadQuery(
      relayEnvironment,
      NamespaceSelectorQuery,
      {},
      {
        fetchPolicy: 'store-or-network',
      },
    );
  }, [relayEnvironment]);

  const renderElement = useCallback(
    (node, key) => (
      <ChatResume
        node={node}
        key={key}
        conversation={conversation}
        setConversation={setConversation}
        setConversationRef={setConversationRef}
      />
    ),
    [conversation, setConversation, setConversationRef],
  );

  const namespace = data?.getCurrentNameSpace;

  return (
    <nav className={stylex(styles.navbar)}>
      <div className={stylex(styles.namespaceSelectorContainer)}>
        <InteractiveElement onClick={handleOnToggleOrgMenu} onMouseEnter={preloadOrganizations}>
          <div className={stylex(styles.namespaceSelector)}>
            <Flexbox alignItems="center" columnGap={8}>
              <Flexbox alignItems="center" columnGap={8}>
                <Avatar node={namespace?.media} />
                <Text type="s0b" color="--neutral-color-800">
                  {`@${namespace?.username ?? namespace?.key ?? ''}`}
                </Text>
              </Flexbox>
              <div className={stylex(styles.arrowContainer)}>
                <Icon
                  icon="unfold_more"
                  size={16}
                  weight={400}
                  opticalSize={20}
                  color="--neutral-color-800"
                />
              </div>
            </Flexbox>
          </div>
        </InteractiveElement>
        <ContextualMenu
          open={orgMenuIsOpen}
          containerHeight={32}
          anchor="LEFT"
          onClose={() => {
            setOrgMenuIsOpen(false);
          }}
          className={stylex(styles.contextualMenu)}
        >
          <NamespaceSelector />
        </ContextualMenu>
      </div>
      <Margin top={24}>
        <ScrolledList
          first={99}
          index="CHATS"
          renderElement={renderElement}
          container={
            <Flexbox flexDirection="column" rowGap={8} className={stylex(styles.chatsContainer)} />
          }
          sort={{
            property: 'createdAt',
            value: 'desc',
          }}
        />
      </Margin>
    </nav>
  );
}
