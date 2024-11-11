export default function $prepopulatedRichText(serializedState) {
  if (!serializedState) return null;

  return (editor) => {
    const parsedState = editor.parseEditorState(serializedState);
    editor.setEditorState(parsedState);
  };
}
