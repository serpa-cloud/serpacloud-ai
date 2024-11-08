// @flow
import { Suspense, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useTransition, animated } from 'react-spring';
import { useLazyLoadQuery, graphql } from 'react-relay';

import { Text, Flexbox, Margin, Button, useCreateAIProject, Grid } from '../shared';

import ProjectCard from '../ProjectCard';

import styles from './index.module.sass';

function HomeContent(): React$Node {
  const [showButton, setShowButton] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [createProject, createProjectPending] = useCreateAIProject();

  const userData = useLazyLoadQuery(
    graphql`
      query HomeQuery {
        me {
          id
          name
        }
        entities(first: 3, index: PROJECTS) {
          pageInfo {
            hasNextPage
            endCursor
            finalCursor
          }
          edges {
            id
            cursor
            node {
              __typename
              ... on AIProject {
                id
                ...ProjectCard
              }
            }
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  const name = userData?.me?.name ?? '';
  const edges = userData?.entities?.edges ?? [];
  const hasEdges = !!edges?.length;

  const transitionsButtonNewProject = useTransition(showButton, {
    from: { opacity: -2, marginTop: -80 },
    enter: { opacity: 1, marginTop: 0 },
    leave: { opacity: -2, marginTop: -80 },
    config: {
      mass: 5,
      tension: 25,
      friction: 15,
    },
  });

  const transitionsProjects = useTransition(showProjects, {
    from: { opacity: -2, marginTop: -80 },
    enter: { opacity: 1, marginTop: 0 },
    leave: { opacity: -2, marginTop: -80 },
    config: {
      mass: 1,
      tension: 25,
      friction: 10,
    },
  });

  return (
    <>
      <Flexbox flexDirection="column" rowGap={20}>
        <Text type="d4" color="--neutral-color-800">
          <span>Hello </span>
          <TypeAnimation
            sequence={[
              `${name}!`,
              () => {
                setShowDescription(true);
                if (!hasEdges) {
                  setTimeout(() => {
                    setShowButton(true);
                  }, 400);
                } else {
                  setTimeout(() => {
                    setShowProjects(true);
                  }, 400);
                }
              },
            ]}
            repeat={1}
            cursor={false}
            wrapper="span"
          />
        </Text>

        {showDescription && (
          <Text type="bd">
            <TypeAnimation
              speed={80}
              sequence={[
                hasEdges
                  ? 'I’m Shelby, your Serpa AI. I’m here to help you to build or improve your product.'
                  : 'I’m Shelby, your Serpa AI. Let’s start creating a new project, so you can start building or improving your product.',
              ]}
              repeat={1}
              cursor={false}
              wrapper="span"
            />
          </Text>
        )}
      </Flexbox>

      {transitionsButtonNewProject((style, item) =>
        item ? (
          <animated.div style={style}>
            <Margin top={40}>
              <Flexbox>
                <Button
                  onClick={createProject}
                  loading={createProjectPending}
                  disabled={createProjectPending}
                >
                  Create new project
                </Button>
              </Flexbox>
            </Margin>
          </animated.div>
        ) : null,
      )}

      {transitionsProjects((style, item) =>
        item ? (
          <animated.div style={style}>
            <Margin top={40}>
              <Margin bottom={24}>
                <Text type="s2r">Recent Projects</Text>
              </Margin>
              <Grid columns="1fr 1fr 1fr" columnGap={24}>
                {edges?.map((edge) => {
                  return <ProjectCard node={edge?.node} key={edge.id} />;
                })}
              </Grid>
            </Margin>
          </animated.div>
        ) : null,
      )}
    </>
  );
}

export default function Home(): React$Node {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Suspense
          fallback={
            <Text type="d4" color="--neutral-color-800">
              <div className={styles.textFallbackContainer}>
                <span>Hello</span>
                <span className={styles.fallback} />
              </div>
            </Text>
          }
        >
          <HomeContent />
        </Suspense>
      </div>
    </section>
  );
}
