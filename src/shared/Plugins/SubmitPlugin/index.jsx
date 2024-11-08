// @flow
import { $getRoot, KEY_ENTER_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { forwardRef, useEffect, useImperativeHandle, useCallback } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

function OnChangePluginInterface({ onSubmit }: { onSubmit?: ?(any) => void }, ref): React$Node {
  const [editor] = useLexicalComposerContext();

  const handleOnSend = useCallback(() => {
    editor.getEditorState().read(async () => {
      editor.getEditorState().read(() => {
        const text = $getRoot().getTextContent();
        if (onSubmit) onSubmit({ plainText: text });
      });
    });
  }, [editor, onSubmit]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleOnSend();
    },
  }));

  useEffect(() => {
    const removeEnterListener = editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        const mustSend = event?.shiftKey || event?.ctrlKey || event?.metaKey;
        if (!mustSend) {
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

OnChangePluginInterface.defaultProps = {
  onSubmit: null,
};

const OnChangePlugin: React$AbstractComponent<{ onSubmit?: ?(any) => void }, mixed> = forwardRef(
  OnChangePluginInterface,
);

export default OnChangePlugin;
