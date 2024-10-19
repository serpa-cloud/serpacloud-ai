// @flow
import { useCallback } from 'react';
import { graphql, useMutation } from 'react-relay';

import type { useCreateChatMutation } from './__generated__/useCreateChatMutation.graphql';

type CreateChatResults = [(projectId: string) => void, boolean];

export default function useCreateChat(): CreateChatResults {
  const [createChat, createChatPending] = useMutation<useCreateChatMutation>(graphql`
    mutation useCreateChatMutation($projectId: ID!, $last: Int, $before: Cursor) {
      createChat(projectId: $projectId) {
        id
        ...ChatResume
        ...MessagesList
      }
    }
  `);

  const createChatCallback = useCallback(
    (projectId: string) => {
      if (!createChatPending) {
        createChat({
          variables: {
            last: 20,
            projectId,
          },
          updater(store) {
            const projectProxy = store.get(projectId);
            const payload = store.getRootField('createChat');

            if (payload && projectProxy) {
              const chatProxy = store.get(payload.getValue('id'));

              if (chatProxy) {
                projectProxy.setLinkedRecord(chatProxy, 'currentConversation');
              }
            }
          },
        });
      }
    },
    [createChat, createChatPending],
  );

  return [createChatCallback, createChatPending];
}
