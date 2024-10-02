// @flow
import { useCallback, useEffect } from 'react';
import { $getRoot, KEY_ENTER_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type PluginProps = {|
  +disable?: ?boolean,
  +onSubmit: (string) => Promise<void> | void,
|};

export default function SendPlugin({ onSubmit, disable }: PluginProps): React$Node {
  const [editor] = useLexicalComposerContext();

  const handleOnSend = useCallback(() => {
    editor.getEditorState().read(() => {
      const text = $getRoot().getTextContent();
      onSubmit(text);
    });

    editor.update(() => {
      $getRoot().clear();
    });
  }, [editor, onSubmit]);

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

  return null;
}

SendPlugin.defaultProps = {
  disable: false,
};
