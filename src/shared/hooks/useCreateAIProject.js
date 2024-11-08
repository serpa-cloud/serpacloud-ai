// @flow
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { graphql, useMutation } from 'react-relay';

import type { useCreateAIProjectMutation } from './__generated__/useCreateAIProjectMutation.graphql';

type SendAIMessageUtils = [() => void, boolean];

export default function useCreateAIProject(): SendAIMessageUtils {
  const navigate = useNavigate();

  const [createProject, createProjectPending] = useMutation<useCreateAIProjectMutation>(graphql`
    mutation useCreateAIProjectMutation {
      createAIProject {
        id
      }
    }
  `);

  const createProjectCallback = useCallback(
    // eslint-disable-next-line consistent-return
    () => {
      if (!createProjectPending) {
        createProject({
          variables: {},
          onCompleted: (res) => {
            const project = res.createAIProject;
            if (project) {
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
