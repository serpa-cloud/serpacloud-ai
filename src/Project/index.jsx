// @flow
import { useParams } from 'react-router-dom';
import { useCallback, useMemo, useRef } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { ComplexEditor, useUpdateProjectSummary, Flexbox, Margin, Padding } from '../shared';

import Graph from '../Graph';
import ProjectsList from '../ProjectsList';
import ActivityList from '../ActivityList';

import Chat from '../Chat';

import styles from './index.module.sass';

import resolveImagePromises from './resolveImagePromises';

import testData from './testData';
import testMovements from './testMovements';
import testActiivity from './testActivity';

export default function Project(): React$Node {
  const params = useParams();
  const summaryRef = useRef();

  const data = useLazyLoadQuery(
    graphql`
      query ProjectQuery($id: ID!) {
        node(id: $id) {
          id
          ... on AIProject {
            id
            key
            name
            summary
            summaryState
            ...ProjectCard
          }
        }
        projectsTemplates {
          id
          userDescription
        }
      }
    `,
    {
      id: params?.project ?? '',
    },
    { fetchPolicy: 'store-and-network' },
  );

  const [updateProject] = useUpdateProjectSummary();
  const node = data?.node;
  const name = node?.name ?? '';

  console.log(data);

  // Inicialización de los refs basada en los valores de node
  const savedTitleRef = useRef(node?.name ?? '');
  const savedSummaryRef = useRef(node?.summary ?? '');
  const savedSummaryStateRef = useRef(node?.summaryState ?? '');

  const summaryState = useMemo(() => {
    let state;

    try {
      state = JSON.parse(node?.summaryState ?? '{}');
    } catch (e) {
      state = null;
    }

    return state;
  }, [node?.summaryState]);

  const handleChangeTitle = useCallback(
    (title) => {
      if (title !== savedTitleRef.current) {
        updateProject({
          id: node.id,
          title,
          summary: savedSummaryRef.current ?? '',
          summaryState: savedSummaryStateRef.current ?? '',
          onCompleted(response) {
            if (response.updateProjectSummary) {
              savedTitleRef.current = response.updateProjectSummary?.name ?? '';
            }
          },
        });
      }
    },
    [updateProject, node?.id],
  );

  const handleChangeSummary = useCallback(
    async (summary) => {
      const normalizedState = await resolveImagePromises({ ...(summary?.state || {}) });
      const serializedSummary = summary.state ? JSON.stringify(normalizedState) : '';

      if (
        summary.plainText !== savedSummaryRef.current ||
        serializedSummary !== savedSummaryStateRef.current
      ) {
        updateProject({
          id: node.id,
          title: savedTitleRef.current ?? '',
          summary: summary.plainText ?? '',
          summaryState: serializedSummary,
          onCompleted(response) {
            if (response.updateProjectSummary) {
              savedSummaryRef.current = response.updateProjectSummary?.summary ?? '';
              savedSummaryStateRef.current = response.updateProjectSummary?.summaryState ?? '';
            }
          },
        });
      }
    },
    [node?.id, updateProject],
  );

  return (
    <div className={styles.section}>
      <Padding vertical={40} horizontal={40}>
        <ComplexEditor
          title={name}
          summary={summaryState}
          summaryRef={summaryRef}
          onChangeTitle={handleChangeTitle}
          onChangeSummary={handleChangeSummary}
        />
        <Margin top={40}>
          <Flexbox flexDirection="column" rowGap={32}>
            <div>
              <ActivityList activity={testActiivity} />
            </div>
            <div>
              <ProjectsList projects={testMovements} />
            </div>
            <div>
              <Graph data={testData} />
            </div>
          </Flexbox>
        </Margin>
      </Padding>
      <div className={styles.chatContainer}>
        <Chat />
      </div>
    </div>
  );
}
