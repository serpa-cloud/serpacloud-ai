// @flow
import stylex from '@serpa-cloud/stylex';
import Composer from '../Chat/Composer';
import { Text, Flexbox, Padding, Margin, ScrolledList, Grid, Card } from '../shared';
import ProjectPreview from './ProjectPreview';

const styles = stylex.create({
  container: {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  scrolledListContainer: {
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  fallbackCard: {
    minHeight: '120px',
    backgroundColor: 'var(--neutral-color-400)',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: 'var(--shadow-1)',
  },
});

export default function Projects(): React$Node {
  const renderElement = (node, key) => <ProjectPreview project={node} key={key} />;

  return (
    <>
      <Padding horizontal={24}>
        <Padding top={80} className={stylex(styles.container)}>
          <Flexbox flexDirection="column" rowGap={16}>
            <Text
              type="d4"
              textAlign="center"
              gradient="linear-gradient(346deg, var(--blue-solid-color) 0%, var(--pink-solid-color) 100%)"
            >
              Build any App 20x faster
            </Text>

            <Text type="bd" textAlign="center" color="--neutral-color-800">
              Chat with your Serpa to build any app. Deploy in minutes.
            </Text>
          </Flexbox>
          <Margin top={24}>
            <Composer standalone />
          </Margin>
        </Padding>
      </Padding>
      <div className={stylex(styles.scrolledListContainer)}>
        <Margin top={40}>
          <ScrolledList
            first={20}
            index="PROJECTS"
            renderElement={renderElement}
            container={<Grid columns="repeat(3, 1fr)" columnGap={16} rowGap={16} />}
            fallbackElement={() => <Card className={stylex(styles.fallbackCard)} />}
            sort={{
              property: 'createdAt',
              value: 'desc',
            }}
          />
        </Margin>
      </div>
    </>
  );
}
