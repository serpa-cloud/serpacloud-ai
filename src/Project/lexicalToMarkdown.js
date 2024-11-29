/* eslint-disable no-bitwise */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */

export default function lexicalToMarkdown(serializedState) {
  function processNode(node) {
    if (!node) return '';

    switch (node.type) {
      case 'root':
        return node.children.map(processNode).join('\n');

      case 'heading': {
        const level =
          { h1: '#', h2: '##', h3: '###', h4: '####', h5: '#####', h6: '######' }[node.tag] || '##';
        return `${level} ${node.children.map(processNode).join('')}`;
      }

      case 'paragraph':
        return node.children.map(processNode).join('');

      case 'text': {
        let text = node.text || '';
        if (node.format & 1) text = `**${text}**`; // Bold
        if (node.format & 2) text = `*${text}*`; // Italic
        if (node.format & 4) text = `~~${text}~~`; // Strikethrough
        if (node.format & 16) text = `\`\`\`${text}\`\`\``; // Strikethrough
        return text;
      }

      case 'image':
        const altText = 'image';
        const imageId = node.id || '';
        return `![${altText}](https://static.serpa.cloud/${imageId}/0/0/0/image?fit=cover)`;

      case 'list': {
        const isOrdered = node.listType === 'number';
        return node.children
          .map((child, index) => {
            const prefix = isOrdered ? `${index + 1}.` : '-';
            return `${prefix} ${processNode(child)}`;
          })
          .join('\n');
      }

      case 'listitem':
        return node.children.map(processNode).join('');

      case 'code': {
        const language = node.language || '';
        const code = node.children.map(processNode).join('');
        return `\`\`\`${language}\n${code}\n\`\`\``;
      }

      case 'code-highlight':
        return node.text || '';

      default:
        return '';
    }
  }

  if (!serializedState || typeof serializedState !== 'object') {
    throw new Error('Invalid serialized state');
  }

  return processNode(serializedState.root);
}
