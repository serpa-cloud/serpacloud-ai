// @flow
import { useParams } from 'react-router-dom';
import { useCallback, useMemo, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import markdownToLexical from './markdownToLexical';
import lexicalToMarkdown from './lexicalToMarkdown';
import resolveImagePromises from './resolveImagePromises';

import {
  Margin,
  Flexbox,
  Padding,
  Divider,
  ComplexEditor,
  ComplexEditorToolbar,
  useApplyTemplate,
  useProjectInRealTime,
  useGenerateSuggestions,
  useUpdateProjectSummary,
} from '../shared';

import Suggestion from './Suggestion';

import styles from './index.module.sass';

export default function Project(): React$Node {
  const params = useParams();
  const summaryRef = useRef();
  const [applyTemplate] = useApplyTemplate();
  const generateSuggestions = useGenerateSuggestions(params?.project ?? '');
  const realTimeData = useProjectInRealTime(params?.project ?? '');

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
      state = JSON.parse(node?.summaryState);
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

  const getSummaryMarkdown = useCallback(async () => {
    const state = savedSummaryStateRef.current;

    try {
      const parsedState = JSON.parse(state);
      const normalizedState = await resolveImagePromises({ ...(parsedState || {}) });
      const markdown = lexicalToMarkdown(normalizedState);

      return markdown;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }, []);

  const handleGenerateSuggestions = useCallback(async () => {
    try {
      const markdown = await getSummaryMarkdown();

      if (markdown) generateSuggestions({ summary: markdown });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [generateSuggestions, getSummaryMarkdown]);

  const handleOnMutateSummaryState = useCallback((newSummaryState) => {
    summaryRef?.current?.replaceState?.(newSummaryState);
  }, []);

  const handleOnMutateSummaryStateFromTemplate = useCallback(
    (newSummary) => {
      console.log(newSummary);
      const newSummaryState = markdownToLexical(newSummary);
      console.log(newSummaryState);
      handleOnMutateSummaryState(newSummaryState);
    },
    [handleOnMutateSummaryState],
  );

  const suggestions = realTimeData?.suggestions ?? [];
  const hasSuggestions = !!suggestions?.length;

  const transitions = useTransition(suggestions, {
    keys: (suggestion) => suggestions.indexOf(suggestion),
    from: { opacity: 0, scale: 0, y: 0 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leave: { opacity: 0, scale: 0, y: -20 },
  });

  return (
    <section
      className={`${styles.container} ${
        hasSuggestions ? styles.containerOpen : styles.containerClosed
      }`}
    >
      <div
        className={`${styles.section} ${
          hasSuggestions ? styles.sectionOpen : styles.sectionClosed
        }`}
      >
        <div>
          <ComplexEditor
            title={name}
            summary={summaryState}
            summaryRef={summaryRef}
            onChangeTitle={handleChangeTitle}
            onChangeSummary={handleChangeSummary}
          />
        </div>
        {hasSuggestions && (
          <div>
            <Flexbox flexDirection="column" rowGap={16} className={styles.sidePanel}>
              {transitions((style, suggestion) => (
                <animated.div style={style}>
                  <Suggestion
                    key={suggestion}
                    suggestion={suggestion}
                    getSummary={getSummaryMarkdown}
                    projectId={params?.project ?? ''}
                    onChangeSummary={handleOnMutateSummaryState}
                  />
                </animated.div>
              ))}
            </Flexbox>
          </div>
        )}
      </div>

      <Margin top={24}>
        <Divider />
        <Padding top={24}>
          <ComplexEditorToolbar
            items={[
              ...(data?.projectsTemplates?.map((template) => ({
                icon: 'arrow_upward',
                text: template.userDescription,
                onClick: () => {
                  applyTemplate({
                    templateId: template.id,
                    onCompleted(newSummary) {
                      handleOnMutateSummaryStateFromTemplate(newSummary);
                    },
                  });
                },
              })) ?? []),
              {
                icon: 'prompt_suggestion',
                text: 'Suggest',
                onClick: handleGenerateSuggestions,
              },
              {
                icon: 'move_down',
                text: 'Generate Features',
                onClick: () => {},
              },
            ]}
          />
        </Padding>
      </Margin>
    </section>
  );
}
