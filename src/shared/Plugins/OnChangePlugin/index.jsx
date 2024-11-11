// @flow
import { $getRoot, KEY_ENTER_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { forwardRef, useEffect, useImperativeHandle, useCallback } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// eslint-disable-next-line react/prop-types
function OnChangePluginInterface({ onChange, onSubmit }, ref): React$Node {
  const [editor] = useLexicalComposerContext();

  const handleOnSend = useCallback(() => {
    editor.getEditorState().read(async () => {
      const text = $getRoot().getTextContent();
      const editorState = editor.getEditorState();
      const serializedState = editorState.toJSON();

      if (onSubmit) onSubmit({ plainText: text, state: serializedState });
    });
  }, [editor, onSubmit]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleOnSend();
    },
  }));

  const handleOnChange = useCallback(() => {
    editor.getEditorState().read(() => {
      const text = $getRoot().getTextContent();
      const editorState = editor.getEditorState();
      const serializedState = editorState.toJSON();

      if (onChange) onChange({ plainText: text, state: serializedState });
    });
  }, [editor, onChange]);

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

    // Register the listener for editor changes
    const removeChangeListener = editor.registerUpdateListener(() => {
      handleOnChange();
    });

    return () => {
      removeEnterListener();
      removeChangeListener();
    };
  }, [editor, handleOnChange, handleOnSend, onChange]);

  return null;
}

OnChangePluginInterface.defaultProps = {
  onSubmit: null,
};

const OnChangePlugin: React$AbstractComponent<
  { onSubmit?: ?(any) => void | Promise<void>, onChange?: ?(any) => void | Promise<void> },
  mixed,
> = forwardRef(OnChangePluginInterface);

export default OnChangePlugin;
