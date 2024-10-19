// @flow
import { useCallback } from 'react';
import { graphql, useMutation, ConnectionHandler } from 'react-relay';

import type { useSendAIMessageMutation } from './__generated__/useSendAIMessageMutation.graphql';

type SendAIMessageUtils = [(message: string) => void | Promise<void>, boolean];

const getDirectoryName = (fullPath) => {
  const parts = fullPath.split('/');
  return parts[parts.length - 1];
};

export default function useSendAIMessage(
  conversation: string,
  project: string,
): SendAIMessageUtils {
  const [sendMessage, sendingMessagePending] = useMutation<useSendAIMessageMutation>(graphql`
    mutation useSendAIMessageMutation(
      $message: String!
      $conversation: ID!
      $connections: [ID!]!
      $services: [String!]!
    ) {
      promptToSerpaCloudAI(message: $message, conversation: $conversation, services: $services)
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

  const getSelectedServices = useCallback(async () => {
    console.log(project);
    // Llamamos al método getSelectedDirectories expuesto en preload.js
    const services = await window.codegen.getSelectedDirectories(project);
    return services.map((s) => getDirectoryName(s.path));
  }, [project]);

  const sendAIMessage = useCallback(
    // eslint-disable-next-line consistent-return
    async (message: string) => {
      const connectionID = ConnectionHandler.getConnectionID(
        conversation,
        'MessagesList__messages',
        {},
      );

      if (!sendingMessagePending) {
        const services = await getSelectedServices();

        sendMessage({
          variables: {
            message,
            conversation,
            connections: [connectionID],
            services,
          },
          optimisticUpdater(store) {
            const root = store.get(conversation);

            const edges = ConnectionHandler.getConnection(root, 'MessagesList__messages', {});

            const record = store.create(`AIMessage:${new Date().getDate()}`, 'AIMessage');
            record.setValue('user', 'role');
            record.setValue(message, 'content');

            if (!edges) return;

            const newEdge = ConnectionHandler.createEdge(store, edges, record, 'AIMessageEdge');

            ConnectionHandler.insertEdgeAfter(edges, newEdge);
          },
          updater(store) {
            const root = store.get(conversation);
            if (root) {
              root.setValue(message, 'resume');
            }
          },
        });
      }
    },
    [conversation, sendMessage, sendingMessagePending, getSelectedServices],
  );

  return [sendAIMessage, sendingMessagePending];
}
