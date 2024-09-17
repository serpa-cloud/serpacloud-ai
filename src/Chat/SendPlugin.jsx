// @flow
import { useCallback, useEffect } from 'react';
import { $getRoot, KEY_ENTER_COMMAND, COMMAND_PRIORITY_CRITICAL } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type PluginProps = {|
  +disable?: ?boolean,
  +onSubmit: (string) => void,
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
    editor.setEditable(!!disable);
  }, [editor, disable]);

  useEffect(() => {
    const removeListener = editor.registerCommand(
      KEY_ENTER_COMMAND,
      (payload) => {
        const event: ?KeyboardEvent = payload;
        event?.preventDefault();

        handleOnSend();
        // Return true to stop propagation.
        return true;
      },
      COMMAND_PRIORITY_CRITICAL,
    );

    return () => removeListener();
  }, [editor, handleOnSend]);

  return null;
}

SendPlugin.defaultProps = {
  disable: false,
};
