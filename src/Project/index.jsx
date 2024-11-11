/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
// @flow
import { useParams } from 'react-router-dom';
import { useCallback, useMemo, useRef } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { ComplexEditor, useUpdateProjectSummary } from '../shared';

import styles from './index.module.sass';

async function resolveImagePromises(obj) {
  // Función recursiva para recorrer y resolver promesas
  async function traverse(node) {
    if (Array.isArray(node)) {
      // Si el nodo es un array, recorre cada elemento
      for (let i = 0; i < node.length; i++) {
        node[i] = await traverse(node[i]);
      }
    } else if (node && typeof node === 'object') {
      // Si el nodo es un objeto, verifica sus propiedades
      for (const key in node) {
        if (key === 'id' && node.type === 'image' && node[key] instanceof Promise) {
          // Si es un nodo de tipo imagen y su id es una promesa, resuelve la promesa
          node[key] = await node[key];
        } else {
          // De lo contrario, sigue recorriendo el objeto
          node[key] = await traverse(node[key]);
        }
      }
    }
    return node;
  }

  // Inicia el recorrido desde el nodo raíz
  const r = await traverse(obj);

  return r;
}

export default function Project(): React$Node {
  const params = useParams();

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
      <ComplexEditor
        title={name}
        summary={summaryState}
        onChangeTitle={handleChangeTitle}
        onChangeSummary={handleChangeSummary}
      />
    </div>
  );
}
