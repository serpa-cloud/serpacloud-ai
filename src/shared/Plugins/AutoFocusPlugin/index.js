import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function AutoFocusPlugin({ focus = false }: { focus?: ?boolean }): React$Node {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (focus) editor.focus();
  }, [editor, focus]);

  return null;
}
