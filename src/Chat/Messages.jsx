// @flow
import stylex from '@serpa-cloud/stylex';
import { useRef, useLayoutEffect, useEffect, useMemo } from 'react';

import {
  graphql,
  useSubscription,
  usePreloadedQuery,
  ConnectionHandler,
  usePaginationFragment,
} from 'react-relay';

import ChatMessage from './ChatMessage';

import { Text, Flexbox, Margin } from '../shared';
import { ReactComponent as Logo } from '../shared/images/icon.svg';

import MessagesListPaginationQuery from './__generated__/MessagesListPaginationQuery.graphql';

const styles = stylex.create({
  viewportMessages: {
    width: 'calc(100vw - 250px)',
    flex: 1,
    overflow: 'auto',
    paddingLeft: 8,
    paddingRight: 8,
    boxSizing: 'border-box',
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
  queryReference: any,
|};

export default function Messages({ queryReference, conversation }: Props): React$Node {
  const spaceFromBottom = useRef(0);
  const viewportRef = useRef<?HTMLDivElement>(null);

  const node = usePreloadedQuery(MessagesListPaginationQuery, queryReference);

  const { data, loadPrevious, hasPrevious, isLoadingPrevious } = usePaginationFragment(
    graphql`
      fragment MessagesList on Chat @refetchable(queryName: "MessagesListPaginationQuery") {
        id
        messages(last: $last, before: $before) @connection(key: "MessagesList__messages") {
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
    node?.node ?? null,
  );

  const configSubscription = useMemo(
    () => ({
      subscription,
      variables: { conversation },
      updater(store, payload) {
        const messageEdgeId = payload?.aiConversation?.id;
        const record = store.get(payload?.aiConversation?.id);

        if (!record) return;

        const root = store.get(conversation);

        const edges = ConnectionHandler.getConnection(root, 'MessagesList__messages', {});

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

  const edges = data?.messages?.edges ?? [];
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
