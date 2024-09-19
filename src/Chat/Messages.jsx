// @flow
import stylex from '@serpa-cloud/stylex';
import { useRef, useLayoutEffect, useEffect, useMemo } from 'react';

import {
  graphql,
  useSubscription,
  useLazyLoadQuery,
  ConnectionHandler,
  usePaginationFragment,
} from 'react-relay';

import ChatMessage from './ChatMessage';

import { Text, Flexbox, Margin } from '../shared';
import { ReactComponent as Logo } from '../shared/images/icon.svg';

import type { MessagesList$key } from './__generated__/MessagesList.graphql';
import MessagesListPaginationQuery from './__generated__/MessagesListPaginationQuery.graphql';

const styles = stylex.create({
  viewportMessages: {
    flex: 1,
    overflow: 'auto',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
});

const subscription = graphql`
  subscription MessagesConversationSubscription($conversation: ID!) {
    aiConversation(conversation: $conversation) {
      id
      cursor
      node {
        ...ChatMessage
        role
      }
    }
  }
`;

type Props = {|
  conversation: string,
|};

export default function Messages({ conversation }: Props): React$Node {
  const spaceFromBottom = useRef(0);
  const viewportRef = useRef<?HTMLDivElement>(null);

  const node: MessagesList$key = useLazyLoadQuery(
    MessagesListPaginationQuery,
    {
      last: 20,
      conversation,
    },
    { fetchPolicy: 'store-and-network' },
  );

  const { data, loadPrevious, hasPrevious, isLoadingPrevious } = usePaginationFragment(
    graphql`
      fragment MessagesList on Query @refetchable(queryName: "MessagesListPaginationQuery") {
        conversation(last: $last, before: $before, conversation: $conversation)
          @connection(key: "MessagesList__conversation") {
          pageInfo {
            hasPreviousPage
            startCursor
          }
          edges {
            id
            cursor
            node {
              ...ChatMessage
              role
            }
          }
        }
      }
    `,
    node,
  );

  const configSubscription = useMemo(
    () => ({
      subscription,
      variables: { conversation },
      updater(store, payload) {
        const messageEdgeId = payload?.aiConversation?.id;
        const record = store.get(payload?.aiConversation?.id);

        if (!record) return;

        const root = store.getRoot();

        const edges = ConnectionHandler.getConnection(root, 'MessagesList__conversation', {
          conversation,
        });

        const existingEdges = edges?.getLinkedRecords('edges');
        const recordAlreadyExists = !!existingEdges?.find(
          (edge) => edge?.getDataID() === messageEdgeId,
        );

        if (!edges || recordAlreadyExists) return;

        ConnectionHandler.insertEdgeAfter(edges, record);
      },
    }),
    [conversation],
  );

  useSubscription(configSubscription);

  const edges = data?.conversation?.edges ?? [];
  const messagesLength = edges.length;

  useEffect(() => {
    const element = viewportRef.current;

    function handler() {
      if (element) {
        const delta = element.scrollHeight - (element.scrollTop + element.clientHeight);
        spaceFromBottom.current = delta;

        if (element.scrollTop < 100 && hasPrevious && !isLoadingPrevious) {
          loadPrevious(20);
        }
      }
    }

    element?.addEventListener('scroll', handler);
    return () => element?.removeEventListener('scroll', handler);
  }, [hasPrevious, isLoadingPrevious, loadPrevious]);

  useLayoutEffect(() => {
    const element = viewportRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight - element.clientHeight - spaceFromBottom.current;
    }
  }, [messagesLength]);

  useEffect(() => {
    setTimeout(() => {
      const element = viewportRef.current;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, 200);
  }, []);

  const lastMessageIsFromUser = edges[edges.length - 1]?.node?.role === 'user';

  return (
    <div className={stylex(styles.viewportMessages)} ref={viewportRef}>
      <Flexbox rowGap={20} flexDirection="column">
        <>
          {edges.map((edge, index) => {
            if (edge) {
              return (
                <Margin key={edge.id} top={index === 0 ? 32 : 0}>
                  <ChatMessage node={edge.node} />
                </Margin>
              );
            }

            return null;
          })}
          {lastMessageIsFromUser && (
            <Flexbox columnGap={16} alignItems="center">
              <Logo width={24} height={24} />

              <div>
                <Text type="s0b" id="generatingResponse" color="--neutral-color-800" />
              </div>
            </Flexbox>
          )}
        </>
      </Flexbox>
    </div>
  );
}
