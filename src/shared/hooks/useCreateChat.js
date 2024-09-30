// @flow
import { useCallback } from 'react';
import {
  graphql,
  useMutation,
  useRelayEnvironment,
  ConnectionHandler,
  loadQuery,
} from 'react-relay';

import type { useCreateChatMutation } from './__generated__/useCreateChatMutation.graphql';

import MessagesListPaginationQuery from '../../Chat/__generated__/MessagesListPaginationQuery.graphql';

type CreateChatResults = [() => void, boolean];

type Props = {
  +setConversation: (string) => void,
  +setConversationRef: (any) => void,
};

export default function useCreateChat({
  setConversation,
  setConversationRef,
}: Props): CreateChatResults {
  const relayEnvironment = useRelayEnvironment();

  const [createChat, createChatPending] = useMutation<useCreateChatMutation>(graphql`
    mutation useCreateChatMutation($connections: [ID!]!, $last: Int, $before: Cursor) {
      createChat @prependEdge(connections: $connections) {
        id
        cursor
        node {
          ... on Chat {
            id
            ...ChatResume
            ...MessagesList
          }
        }
      }
    }
  `);

  const createChatCallback = useCallback(() => {
    const connectionID = ConnectionHandler.getConnectionID(
      'client:root',
      'ScrolledList_root_entities',
      {
        filterMatrix: null,
        index: 'CHATS',
        query: null,
        sort: {
          property: 'createdAt',
          value: 'desc',
        },
      },
    );

    if (!createChatPending) {
      createChat({
        variables: {
          last: 20,
          connections: [connectionID],
        },
        onCompleted(data) {
          // eslint-disable-next-line no-underscore-dangle
          const chatId = data?.createChat?.node?.__id;

          if (chatId) {
            const queryReference = loadQuery(
              relayEnvironment,
              MessagesListPaginationQuery,
              { last: 20, id: chatId },
              { fetchPolicy: 'store-and-network' },
            );

            setConversationRef(queryReference);

            setConversation(chatId);
          }
        },
      });
    }
  }, [createChat, createChatPending, relayEnvironment, setConversation, setConversationRef]);

  return [createChatCallback, createChatPending];
}
