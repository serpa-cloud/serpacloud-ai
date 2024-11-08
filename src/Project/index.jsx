// @flow
import { useParams } from 'react-router-dom';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { ComplexEditor } from '../shared';

import styles from './index.module.sass';

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
          }
        }
      }
    `,
    {
      id: params?.project ?? '',
    },
    { fetchPolicy: 'store-and-network' },
  );

  console.log({ data });

  return (
    <div className={styles.section}>
      <ComplexEditor />
    </div>
  );
}
