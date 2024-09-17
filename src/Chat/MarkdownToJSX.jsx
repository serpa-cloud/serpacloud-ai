/* eslint-disable react/no-array-index-key */
// @flow
import hljs from 'highlight.js';
import stylex from '@serpa-cloud/stylex';
import { memo, useMemo, useEffect } from 'react';

import 'highlight.js/styles/github.css'; // Puedes usar cualquier estilo disponible

import noiseWhiteUrl from './noise_white.png';

// Definir los tipos de las props usando Flow
type Props = {
  markdownText: string,
};

const styles = stylex.create({
  inlineCode: {
    backgroundColor: 'var(--neutral-color-300)',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 3,
    color: 'var(--red-400)',
  },
  codeBlock: {
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    padding: 0,
    boxShadow: 'var(--shadow-1)',
  },
  code: {
    borderRadius: 8,
  },
});

// Componente memoizado usando React.memo
const MarkdownToJsx: React$AbstractComponent<Props, mixed> = memo<Props>(function MarkdownToJsx({
  markdownText,
}: Props): React$Node {
  const markdownToJsx = useMemo(() => {
    const lines = markdownText.split('\n');
    let inCodeBlock = false;
    let codeBlockContent = [];

    // Mapeamos cada línea para convertirla en un componente JSX
    return lines.map((line, index) => {
      // Detectar inicio o fin de un bloque de código
      if (/^```/.test(line)) {
        if (inCodeBlock) {
          // Fin del bloque de código
          inCodeBlock = false;
          const codeBlock = codeBlockContent.join('\n'); // Unir el contenido acumulado
          codeBlockContent = []; // Limpiar el contenido del bloque

          // Al usar 'pre' y 'code', le aplicaremos el resaltado sintáctico
          return (
            <pre
              key={index}
              className={stylex(styles.codeBlock)}
              style={{
                backgroundImage: `url("${noiseWhiteUrl}")`,
              }}
            >
              <code className={`hljs ${stylex(styles.code)}`}>{codeBlock}</code>
            </pre>
          );
        }
        // Inicio del bloque de código
        inCodeBlock = true;
        return null; // No renderizar la línea de apertura del bloque de código
      }

      // Si estamos en un bloque de código, acumular el contenido
      if (inCodeBlock) {
        codeBlockContent.push(line);
        return null; // No renderizar las líneas dentro del bloque hasta que termine
      }

      // Convertir encabezados
      if (/^### (.*$)/.test(line)) {
        return <h3 key={index}>{line.replace(/^### (.*$)/, '$1')}</h3>;
      }
      if (/^## (.*$)/.test(line)) {
        return <h2 key={index}>{line.replace(/^## (.*$)/, '$1')}</h2>;
      }
      if (/^# (.*$)/.test(line)) {
        return <h1 key={index}>{line.replace(/^# (.*$)/, '$1')}</h1>;
      }

      // Procesar línea para negritas, cursivas y código en línea
      const parts = [];
      let remainingText = line;

      // Bucle para encontrar coincidencias de negritas, cursivas y código en línea
      let match;
      while (remainingText) {
        // Crear un nuevo objeto RegExp en cada iteración
        const regex = /(\*\*(.*?)\*\*)|(\*(.*?)\*)|(`(.*?)`)/g;

        match = regex.exec(remainingText);

        if (match) {
          const beforeMatch = remainingText.slice(0, match.index);
          if (beforeMatch) {
            parts.push(beforeMatch); // Texto antes del match
          }

          // Verifica si es negrita
          if (match[1]) {
            parts.push(<strong key={parts.length}>{match[2]}</strong>);
          }
          // Verifica si es cursiva
          if (match[3]) {
            parts.push(<em key={parts.length}>{match[4]}</em>);
          }
          // Verifica si es código en línea
          if (match[5]) {
            parts.push(
              <code key={parts.length} className={stylex(styles.inlineCode)}>
                {match[6]}
              </code>,
            );
          }

          remainingText = remainingText.slice(match.index + match[0].length);
        } else {
          // Si no hay más coincidencias, agregamos el texto restante
          parts.push(remainingText);
          remainingText = '';
        }
      }

      return <p key={index}>{parts}</p>;
    });
  }, [markdownText]); // Memoizar la conversión en función de `markdownText`

  // Usamos useEffect para aplicar el resaltado de código cuando el contenido se renderiza
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block); // Resaltado de código sintáctico
    });
  }, [markdownToJsx]); // Se ejecuta cada vez que el JSX generado cambia

  return <div>{markdownToJsx}</div>;
});

export default MarkdownToJsx;
