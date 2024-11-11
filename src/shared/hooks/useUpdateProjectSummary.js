// @flow
import { useCallback, useRef } from 'react';
import { graphql, useMutation } from 'react-relay';
import type { useUpdateProjectSummaryMutation } from './__generated__/useUpdateProjectSummaryMutation.graphql';

type UpdateProjectInput = {
  id: string,
  title?: ?string,
  summary?: ?string,
  summaryState?: ?string,
  onCompleted?: ?(any) => void,
};

export default function useUpdateProjectSummary(): [(input: UpdateProjectInput) => void, boolean] {
  const [updateProject, isPending] = useMutation<useUpdateProjectSummaryMutation>(graphql`
    mutation useUpdateProjectSummaryMutation(
      $id: ID!
      $title: String!
      $summary: String!
      $summaryState: String!
    ) {
      updateProjectSummary(id: $id, title: $title, summary: $summary, summaryState: $summaryState) {
        id
        key
        name
        summary
        summaryState
        ...ProjectCard
      }
    }
  `);

  const timeoutRef = useRef<?TimeoutID>(null);

  const debouncedUpdateProject = useCallback(
    ({ id, title, summary, summaryState, onCompleted }: UpdateProjectInput) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (!isPending && (title || (summary && summaryState)))
          updateProject({
            variables: {
              id,
              title: title || '',
              summary: summary || '',
              summaryState: summaryState || '',
            },
            onCompleted: (response) => {
              if (onCompleted) onCompleted(response);
            },
          });
      }, 200); // Debounce delay (500ms, configurable as needed)
    },
    [updateProject, isPending],
  );

  return [debouncedUpdateProject, isPending];
}
