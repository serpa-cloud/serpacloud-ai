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

  const pendingRequestRef = useRef<boolean>(false);
  const nextRequestRef = useRef<?UpdateProjectInput>(null);

  const executeUpdate = useCallback(
    ({ id, title, summary, summaryState, onCompleted }: UpdateProjectInput) => {
      // Store the latest request if there's one already pending
      if (pendingRequestRef.current) {
        nextRequestRef.current = { id, title, summary, summaryState, onCompleted };
        return;
      }

      // Mark as pending
      pendingRequestRef.current = true;

      // Execute the mutation
      updateProject({
        variables: {
          id,
          title: title || '',
          summary: summary || '',
          summaryState: summaryState || '',
        },
        onCompleted: (response) => {
          pendingRequestRef.current = false;

          // Execute the next pending request, if any
          const nextRequest = nextRequestRef.current;
          if (nextRequest) {
            nextRequestRef.current = null; // Clear the stored request
            executeUpdate(nextRequest); // Execute the next stored request
          }

          // Call the original onCompleted callback
          if (onCompleted) onCompleted(response);
        },
        onError: (error) => {
          pendingRequestRef.current = false;

          // Execute the next pending request, if any
          const nextRequest = nextRequestRef.current;
          if (nextRequest) {
            nextRequestRef.current = null; // Clear the stored request
            executeUpdate(nextRequest); // Execute the next stored request
          }

          console.error('Mutation failed', error);
        },
      });
    },
    [updateProject],
  );

  return [executeUpdate, isPending];
}
