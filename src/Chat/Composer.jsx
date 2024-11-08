// @flow
import stylex from '@serpa-cloud/stylex';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';

import Content from './Content';

import { Text, Padding } from '../shared';
import useSendAIMessage from '../shared/hooks/useSendAIMessage';

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
  },
  inputContainer: {
    flex: 1,
    columnGap: 16,
    paddingLeft: 16,
    paddingRight: 16,
    color: '#3b4a54',
    border: '1px solid var(--border-color)',
    paddingTop: 12,
    paddingBottom: 8,
    borderRadius: 24,
    boxSizing: 'border-box',
    boxShadow: 'var(--shadow-2-color)',
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
    top: 2,
    pointerEvents: 'none',
    '-webkit-font-smoothing': 'antialiased',
    display: 'flex',
    height: 17,
    alignItems: 'center',
  },
});

type Props = {|
  +disable?: ?boolean,
  +project?: ?string,
  +standalone?: ?boolean,
  +children?: ?React$Node,
  +conversation?: ?string,
|};

export default function Composer({
  disable,
  project,
  children,
  standalone,
  conversation,
}: Props): React$Node {
  const [handleOnSubmitAIMessage, sendingMessagePending] = useSendAIMessage(
    conversation ?? '',
    project ?? '',
  );

  return (
    <Padding vertical={8} className={stylex(styles.root)}>
      <div className={stylex(styles.inputContainer)}>
        {children}
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
                // $FlowFixMe
                ErrorBoundary={LexicalErrorBoundary}
                contentEditable={
                  <Content
                    standalone={!!standalone}
                    onSubmitMessage={handleOnSubmitAIMessage}
                    disable={disable || sendingMessagePending}
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
  project: null,
  children: null,
  disable: false,
  standalone: false,
  conversation: null,
};
