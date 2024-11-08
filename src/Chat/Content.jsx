// @flow
import stylex from '@serpa-cloud/stylex';
import { useEffect, useCallback } from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { $getRoot, KEY_ENTER_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const styles = stylex.create({
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
    minHeight: 17,
  },
  expanded: {
    maxHeight: 'none',
    minHeight: 120,
  },
  dialog: {
    borderRadius: 8,
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-1)',
    outline: 'none',
    minWidth: 480,
    boxSizing: 'border-box',
    padding: 0,
  },
  settingElement: {
    padding: 16,
  },
  input: {
    flex: 1,
  },
  repoFallback: {
    width: '100%',
    height: 32,
    borderRadius: 4,
    backgroundColor: 'var(--neutral-color-200)',
  },
  currentDirectory: {
    backgroundColor: 'var(--neutral-color-800)',
    borderRadius: 4,
  },
  modeType: {
    borderRadius: 4,
    backgroundColor: 'var(--neutral-color-200)',
  },
});

type Props = {|
  +standalone: boolean,
  +disable?: ?boolean,
  +onSubmitMessage: (message: string) => Promise<void> | void,
|};

export default function Content({ disable, standalone, onSubmitMessage }: Props): React$Node {
  // Lexical hook to get the editor context
  const [editor] = useLexicalComposerContext();

  const handleOnSend = useCallback(() => {
    editor.getEditorState().read(async () => {
      const text = $getRoot().getTextContent();

      onSubmitMessage(text.trim());

      editor.update(() => {
        $getRoot().clear();
      });
    });
  }, [editor, onSubmitMessage]);

  useEffect(() => {
    editor.focus();
    editor.setEditable(!disable);
  }, [editor, disable]);

  useEffect(() => {
    const removeEnterListener = editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        if (event?.shiftKey || event?.ctrlKey || event?.metaKey) {
          return false;
        }
        event?.preventDefault();
        handleOnSend();
        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );

    return () => removeEnterListener();
  }, [editor, handleOnSend]);

  const showSettings = !!standalone;

  return (
    <div>
      <ContentEditable className={stylex(styles.editable, showSettings ? styles.expanded : null)} />
    </div>
  );
}

Content.defaultProps = {
  disable: false,
};
