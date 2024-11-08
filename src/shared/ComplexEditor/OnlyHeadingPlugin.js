import { useEffect } from 'react';
import { $getRoot, ParagraphNode } from 'lexical';
import { $createHeadingNode } from '@lexical/rich-text';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function OnlyHeadingPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Transform ParagraphNode to HeadingNode and prevent new lines
    const unregisterParagraphTransform = editor.registerNodeTransform(ParagraphNode, (node) => {
      editor.update(() => {
        const latestNode = node.getLatest();
        if (!latestNode.isAttached()) {
          return;
        }

        // If there is more than one ParagraphNode, merge the text into the first heading
        const root = latestNode.getParent();
        if (root && root.getChildrenSize() > 1) {
          const firstNode = root.getFirstChild();
          if (firstNode && firstNode.getType() === 'heading') {
            const textContent = latestNode.getTextContent();
            if (textContent.trim()) {
              firstNode.append(textContent);
            }
            latestNode.remove();
            return;
          }
        }

        // Transform the ParagraphNode into a HeadingNode
        const headingNode = $createHeadingNode('h1');
        headingNode.append(...latestNode.getChildren());
        latestNode.replace(headingNode);

        // Move selection to the new node
        headingNode.select();
      });
    });

    // Detect when the editor is empty and restore placeholder behavior
    const unregisterUpdateListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot(); // Get the root Lexical node
        const isEmpty = root.getTextContent().trim() === '';

        if (root && root.getChildrenSize() >= 1 && isEmpty) {
          editor.update(() => {
            const firstNode = root.getFirstChild();
            firstNode.remove();
          });
        }
      });
    });

    // Cleanup on unmount
    return () => {
      unregisterParagraphTransform();
      unregisterUpdateListener();
    };
  }, [editor]);

  return null;
}
