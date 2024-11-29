/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-cond-assign */
export default function markdownToLexical(markdownText) {
  function parseMarkdown(markdown) {
    const lines = markdown.split('\n');
    const root = { type: 'root', children: [] };

    let currentSection = null;
    let currentList = null;

    lines.forEach((line) => {
      line = line.trim();

      // Heading
      const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        currentSection = {
          type: 'heading',
          tag: `h${level}`,
          children: [{ type: 'text', text: headingMatch[2], format: 0 }],
        };
        root.children.push(currentSection);
        currentList = null; // Reset list context
        return;
      }

      // List
      const listMatch = line.match(/^(\d+\.|-)\s+(.*)/);
      if (listMatch) {
        const isOrdered = /^\d+\./.test(listMatch[1]);
        const listItem = {
          type: 'listitem',
          children: parseInlineText(listMatch[2]),
        };

        if (!currentList || currentList.listType !== (isOrdered ? 'number' : 'bullet')) {
          currentList = {
            type: 'list',
            listType: isOrdered ? 'number' : 'bullet',
            children: [],
          };

          root.children.push(currentList);
        }

        currentList.children.push(listItem);

        listItem.value = currentList.children.indexOf(listItem) + 1;
        return;
      }

      // Code block
      const codeBlockMatch = line.match(/^```(\w*)$/);
      if (codeBlockMatch) {
        const language = codeBlockMatch[1];
        const codeLines = [];
        let isCodeBlock = true;

        while (isCodeBlock && lines.length) {
          const codeLine = lines.shift();
          if (codeLine === '```') {
            isCodeBlock = false;
          } else {
            codeLines.push(codeLine);
          }
        }

        root.children.push({
          type: 'code',
          language,
          children: [{ type: 'text', text: codeLines.join('\n'), format: 0 }],
        });
        return;
      }

      // Inline text
      if (line) {
        const paragraph = {
          type: 'paragraph',
          children: parseInlineText(line),
        };

        // Append to the last section or directly to the root
        if (currentSection) {
          currentSection.children.push(paragraph);
        } else {
          root.children.push(paragraph);
        }

        currentList = null; // Reset list context
        return;
      }

      // Empty lines reset context
      currentList = null;
      currentSection = null;
    });

    return root;
  }

  function parseInlineText(text) {
    const nodes = [];
    const regex = /\*\*(.*?)\*\*|__(.*?)__|\*(.*?)\*|_(.*?)_|~~(.*?)~~|`(.*?)`|(.+?)(?=\*\*|__|\*|_|~~|`|$)/g;

    let match;
    while ((match = regex.exec(text)) !== null) {
      const [
        matched,
        bold,
        boldAlt,
        italic,
        italicAlt,
        strikethrough,
        inlineCode,
        plainText,
      ] = match;

      if (bold || boldAlt) {
        nodes.push({ type: 'text', text: bold || boldAlt, format: 1 }); // Bold
      } else if (italic || italicAlt) {
        nodes.push({ type: 'text', text: italic || italicAlt, format: 2 }); // Italic
      } else if (strikethrough) {
        nodes.push({ type: 'text', text: strikethrough, format: 4 }); // Strikethrough
      } else if (inlineCode) {
        nodes.push({ type: 'text', text: inlineCode, format: 16 }); // Inline code
      } else if (plainText) {
        nodes.push({ type: 'text', text: plainText, format: 0 }); // Plain text
      }
    }

    return nodes;
  }

  return { root: parseMarkdown(markdownText) };
}
