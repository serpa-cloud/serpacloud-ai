// @flow
import { graphql, useFragment } from 'react-relay/hooks';

import { Text, Card, Margin, Padding, Flexbox } from '../shared';

import type { ProjectCard$key } from './__generated__/ProjectCard.graphql';

import styles from './index.module.sass';

type Props = {|
  node: ProjectCard$key,
|};

export default function ProjectCard({ node }: Props): React$Node {
  const data = useFragment(
    graphql`
      fragment ProjectCard on AIProject {
        id
        key
        name
        summary
      }
    `,
    node,
  );

  console.log({ data });
  return (
    <Card className={styles.card}>
      <Padding top={16} horizontal={16}>
        <Text type="h6">{data?.name || data.key}</Text>

        <Margin top={8}>
          {!data?.summary && (
            <Flexbox
              flexDirection="column"
              justifyContent="space-around"
              rowGap={4}
              className={styles.summaryFallbackContainer}
            >
              <div className={styles.fallbackElement} />
              <div className={styles.fallbackElement} />
            </Flexbox>
          )}
        </Margin>
      </Padding>
    </Card>
  );
}
