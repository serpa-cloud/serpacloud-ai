/* eslint-disable react/jsx-no-bind */
// @flow
import { useRef, useState } from 'react';
import stylex from '@serpa-cloud/stylex';
import { useParams } from 'react-router-dom';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { useProjectInRealTime } from '../SocketContext';
import {
  Grid,
  Icon,
  Text,
  Padding,
  Flexbox,
  Margin,
  DocumentEditor,
  InteractiveElement,
} from '../shared';

const styles = stylex.create({
  header: {
    height: 56,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    boxSizing: 'border-box',
  },
  summaryContainer: {
    borderRadius: 16,
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 80px)',
    boxShadow: 'var(--shadow-2-color)',
    backdropFilter: 'brightness(1.01)',
  },
  summaryHeaderContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  summaryHeader: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderRadius: 40,
    boxShadow: 'var(--shadow-1-color)',
  },
  documentEditor: {
    borderRadius: 8,
    boxShadow: 'var(--shadow-1-color)',
    backgroundColor: 'var(--neutral-color-100)',
    height: 'calc(100vh - 197px)',
    position: 'relative',
  },
  serpaAI: {
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'var(--font-family-default)',
    backgroundClip: 'text!important',
    '-webkit-text-fill-color': 'transparent',
    '-webkit-background-clip': 'text!important',
    background:
      'linear-gradient(265.7deg, var(--pink-solid-color) -2.24%, var(--blue-solid-color) 102.98%)',
  },
  askToolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
  },
});

export default function AppDashboard(): React$Node {
  const askRef = useRef(null);
  const [selectedAsk, setSelectedAsk] = useState(0);
  const params = useParams();

  const data = useLazyLoadQuery(
    graphql`
      query AppDashboardQuery($id: ID!) {
        node(id: $id) {
          id
          ... on AIProject {
            id
            name
            clarifyingAsks
            summary
            description
            stackPreferences
            firstConversation {
              id
              resume
            }
            currentConversation {
              id
              resume
            }
          }
        }
      }
    `,
    {
      id: params?.project ?? '',
    },
    { fetchPolicy: 'store-and-network' },
  );

  const node = data?.node;
  const projectInRealTime = useProjectInRealTime(node?.id);

  const clarifyingAsksText = projectInRealTime?.clarifyingAsks || node?.clarifyingAsks;
  const clarifyingAsks = clarifyingAsksText.split('\n').filter((line) => !!line.trim());
  const hasClarifyingAsks = clarifyingAsks.length > 0;

  if (!node) return null;

  const currentAsk = clarifyingAsks[selectedAsk];

  function handleChangeAsk(direction) {
    setSelectedAsk((i) => (i + direction + clarifyingAsks.length) % clarifyingAsks.length);
  }

  function handleOnAnswer(answer) {
    console.log({ currentAsk, answer });
  }

  return (
    <Padding horizontal={24} className={stylex(styles.container)}>
      <header className={stylex(styles.header)}>
        <Text type="s1b" color="--primary-color-1">
          {node.name}
        </Text>
      </header>

      <div className={stylex(styles.summaryContainer)}>
        <div className={stylex(styles.summaryHeaderContainer)}>
          <div className={stylex(styles.summaryHeader)}>
            <Flexbox alignItems="center" columnGap={16}>
              <Icon icon="lightbulb_2" size={32} fill color="--yellow-solid-color" />
              <Flexbox flexDirection="column" rowGap={12}>
                <Text type="bs" color="--neutral-color-800">
                  <strong>Provide a detailed description of the product you want to build.</strong>
                </Text>

                <Text type="bs" color="--neutral-color-600">
                  Serpa AI will guide you through the process, asking targeted questions to refine
                  your vision.
                </Text>
              </Flexbox>
            </Flexbox>
          </div>
        </div>
        <Padding vertical={16} horizontal={16}>
          <Grid columns={hasClarifyingAsks ? '3fr 1fr' : '1fr'}>
            <div className={stylex(styles.documentEditor)}>
              <Padding top={20} bottom={16} horizontal={16}>
                <Flexbox alignItems="center" justifyContent="space-between">
                  <Text type="s1b" color="--primary-color-1">
                    Project Summary
                  </Text>

                  <div className={stylex(styles.serpaAI)}>Serpa AI 1.0</div>
                </Flexbox>
              </Padding>
              <DocumentEditor defaultPlainText={node.summary} />
            </div>

            <div className={stylex(styles.documentEditor)}>
              <Padding top={20}>
                <div key={currentAsk}>
                  <Padding horizontal={16}>
                    <Text type="bs" color="--primary-color-1">
                      <strong>{currentAsk}</strong>
                    </Text>
                  </Padding>

                  <Margin top={8}>
                    <DocumentEditor
                      autofocus
                      ref={askRef}
                      onSubmit={handleOnAnswer}
                      placeholder="Answer and clarify.."
                    />
                  </Margin>
                </div>
              </Padding>
              <Padding horizontal={16} className={stylex(styles.askToolbar)}>
                <Flexbox alignItems="center" justifyContent="space-between">
                  {/* $FlowFixMe */}
                  <InteractiveElement onClick={() => askRef?.current?.submit()}>
                    <Icon
                      icon="arrow_upload_progress"
                      color="--neutral-color-600"
                      hoverColor="--primary-color-1"
                    />
                  </InteractiveElement>
                  <Flexbox alignItems="center" columnGap={8}>
                    <InteractiveElement onClick={() => handleChangeAsk(-1)}>
                      <Icon
                        icon="chevron_left"
                        color="--neutral-color-600"
                        hoverColor="--primary-color-1"
                      />
                    </InteractiveElement>
                    <Text type="s0b" color="--neutral-color-800">
                      {`Ask ${selectedAsk + 1} / ${clarifyingAsks.length}`}
                    </Text>
                    <InteractiveElement onClick={() => handleChangeAsk(1)}>
                      <Icon
                        icon="chevron_right"
                        color="--neutral-color-600"
                        hoverColor="--primary-color-1"
                      />
                    </InteractiveElement>
                  </Flexbox>
                </Flexbox>
              </Padding>
            </div>
          </Grid>
        </Padding>
      </div>
    </Padding>
  );
}
