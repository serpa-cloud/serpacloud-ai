// @flow
import stylex from '@serpa-cloud/stylex';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

import SendPlugin from './SendPlugin';

import { Text, Padding } from '../shared';
import useSendAIMessage from '../shared/hooks/useSendAIMessage';

const styles = stylex.create({
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
    backgroundColor: 'var(--always-white)',
  },
  editorParagraph: {
    margin: 0,
  },
  pseudoInput: {
    backgroundColor: 'white',
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
  },
  pseudoInputInnerContainer: {
    position: 'relative',
  },
  editable: {
    userSelect: 'text',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxHeight: '100px',
    overflowX: 'hidden',
    overflowY: 'auto',
    overflowWrap: 'break-word',
    outline: 'none',
    paddingTop: 2,
    paddingBottom: 2,
    fontFamily: 'var(--font-family-default)',
    color: 'var(--neutral-color-800)',
    fontSize: 14,
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
  +conversation: string,
|};

export default function Composer({ conversation, disable }: Props): React$Node {
  const [handleOnSubmit] = useSendAIMessage(conversation);

  return (
    <Padding horizontal={8} vertical={8}>
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
              <SendPlugin onSubmit={handleOnSubmit} disable={disable} />
              <PlainTextPlugin
                ErrorBoundary={LexicalErrorBoundary}
                contentEditable={<ContentEditable className={stylex(styles.editable)} />}
                placeholder={
                  <div className={stylex(styles.placeholder)}>
                    <Text type="s0m" color="--neutral-color-500" id="serpaAIPlaceholder" />
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
};
