// @flow
import stylex from '@serpa-cloud/stylex';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';

import Content from './Content';

import { Text, Padding } from '../shared';
import useSendAIMessage from '../shared/hooks/useSendAIMessage';
import useCreateAIProject from '../shared/hooks/useCreateAIProject';

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
  },
  inputContainer: {
    flex: 1,
    columnGap: 16,
    display: 'flex',
    paddingLeft: 16,
    paddingRight: 16,
    color: '#3b4a54',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 24,
    boxSizing: 'border-box',
    backgroundColor: 'var(--neutral-color-100)',
  },
  editorParagraph: {
    margin: 0,
  },
  pseudoInput: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
  },
  pseudoInputInnerContainer: {
    position: 'relative',
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    userSelect: 'none',
    top: 0,
    pointerEvents: 'none',
    '-webkit-font-smoothing': 'antialiased',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
  },
});

type Props = {|
  +disable?: ?boolean,
  +project?: ?string,
  +standalone?: ?boolean,
  +conversation?: ?string,
|};

export default function Composer({
  conversation,
  disable,
  standalone,
  project,
}: Props): React$Node {
  const [handleOnSubmitAIMessage, sendingMessagePending] = useSendAIMessage(
    conversation ?? '',
    project ?? '',
  );
  const [handleOnSubmitAIProject, creatingProjectPending] = useCreateAIProject();

  return (
    <Padding horizontal={8} vertical={8} className={stylex(styles.root)}>
      <div className={stylex(styles.inputContainer)}>
        <LexicalComposer
          initialConfig={{
            namespace: 'serpa-ai',
            onError(editorError) {
              throw editorError;
            },
            nodes: [],
            theme: {
              paragraph: stylex(styles.editorParagraph),
            },
          }}
        >
          <div className={stylex(styles.pseudoInput)}>
            <div className={stylex(styles.pseudoInputInnerContainer)}>
              <PlainTextPlugin
                ErrorBoundary={LexicalErrorBoundary}
                contentEditable={
                  <Content
                    standalone={!!standalone}
                    onSubmitMessage={handleOnSubmitAIMessage}
                    onSubmitProject={handleOnSubmitAIProject}
                    disable={disable || sendingMessagePending || creatingProjectPending}
                    creatingProjectPending={creatingProjectPending}
                  />
                }
                placeholder={
                  <div className={stylex(styles.placeholder)}>
                    <Text type={standalone ? 's1m' : 's0m'} color="--neutral-color-500">
                      {standalone ? 'Describe your app..' : 'Ask to Serpa AI'}
                    </Text>
                  </div>
                }
              />
            </div>
          </div>
        </LexicalComposer>
      </div>
    </Padding>
  );
}

Composer.defaultProps = {
  disable: false,
  standalone: false,
  conversation: null,
  project: null,
};
