// @flow
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { graphql, useMutation } from 'react-relay';

type SendAIMessageUtils = [
  ({
    description: string,
    stackPreferences: string,
    mode?: ?('CREATE' | 'IMPROVE'),
    directoryPath?: ?string,
  }) => void | Promise<void>,
  boolean,
];

export default function useCreateAIProject(): SendAIMessageUtils {
  const navigate = useNavigate();

  const [createProject, createProjectPending] = useMutation(graphql`
    mutation useCreateAIProjectMutation($description: String!, $mode: AIProjectType!) {
      createAIProject(description: $description, mode: $mode) {
        id
        name
        description
        currentConversation {
          id
        }
      }
    }
  `);

  const createProjectCallback = useCallback(
    // eslint-disable-next-line consistent-return
    ({ description, stackPreferences, mode, directoryPath }) => {
      if (!createProjectPending) {
        createProject({
          variables: {
            mode: mode || 'CREATE',
            description,
            stackPreferences: stackPreferences || '',
          },
          onCompleted: async (res) => {
            const project = res.createAIProject;
            if (project) {
              if (mode === 'IMPROVE') {
                await window.codegen.saveDirectory({ directoryPath, project: project.name });
              }
              navigate(`/app/projects/${project.id}`);
            }
          },
        });
      }
    },
    [createProject, createProjectPending, navigate],
  );

  return [createProjectCallback, createProjectPending];
}
