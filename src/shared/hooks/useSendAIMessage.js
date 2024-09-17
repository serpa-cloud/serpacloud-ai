// @flow
import { useCallback } from 'react';
import { graphql, useMutation, ConnectionHandler } from 'react-relay';

import type { useSendAIMessageMutation } from './__generated__/useSendAIMessageMutation.graphql';

type SendAIMessageUtils = [(message: string) => void, boolean];

export default function useSendAIMessage(conversation: string): SendAIMessageUtils {
  const [sendMessage, sendingMessagePending] = useMutation<useSendAIMessageMutation>(graphql`
    mutation useSendAIMessageMutation($message: String!, $conversation: ID!, $connections: [ID!]!) {
      promptToSerpaCloudAI(message: $message, conversation: $conversation)
        @appendEdge(connections: $connections) {
        id
        cursor
        node {
          ...ChatMessage
          role
        }
      }
    }
  `);

  const sendAIMessage = useCallback(
    (message: string) => {
      const connectionID = ConnectionHandler.getConnectionID(
        'client:root',
        'MessagesList__conversation',
        {
          conversation,
        },
      );

      if (!sendingMessagePending) {
        sendMessage({
          variables: {
            message,
            conversation,
            connections: [connectionID],
          },
          optimisticUpdater(store) {
            const root = store.getRoot();

            const edges = ConnectionHandler.getConnection(root, 'MessagesList__conversation', {
              conversation,
            });

            const record = store.create(`AIMessage:${new Date().getDate()}`, 'AIMessage');
            record.setValue('user', 'role');
            record.setValue(message, 'content');

            if (!edges) return;

            const newEdge = ConnectionHandler.createEdge(store, edges, record, 'AIMessageEdge');

            ConnectionHandler.insertEdgeAfter(edges, newEdge);
          },
        });
      }
    },
    [conversation, sendMessage, sendingMessagePending],
  );

  return [sendAIMessage, sendingMessagePending];
}
