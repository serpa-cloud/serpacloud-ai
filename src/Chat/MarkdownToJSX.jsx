/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
// @flow
import hljs from 'highlight.js';
import stylex from '@serpa-cloud/stylex';
import { memo, useMemo, useEffect, useState } from 'react';

import 'highlight.js/styles/github.css'; // Puedes usar cualquier estilo disponible

import noiseWhiteUrl from './noise_white.png';
import InteractiveElement from '../shared/InteractiveElement'; // Importar el componente InteractiveElement
import Icon from '../shared/Icon'; // Importar el componente Icon
import Flexbox from '../shared/Flexbox';
import Spinner from '../shared/Spinner';

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
  codeBlockContainer: {
    border: '1px solid var(--border-color)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    boxShadow: 'var(--shadow-1)',
  },
  codeBlock: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 0,
    marginTop: 0, // Para que no haya espacio entre la barra y el bloque de código
    marginBottom: 0, // Para que no haya espacio entre el bloque de código y el siguiente párrafo
  },
  code: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  pathBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--neutral-color-800)',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottom: '1px solid var(--border-color)',
  },
  publishBar: {
    marginTop: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    columnGap: 24,
    paddingRight: 8,
    display: 'block',
  },
  publishHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pathbarClosed: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  pathText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: 'var(--neutral-color-100)',
    marginLeft: 8, // Separación de 8px entre la flecha y el texto
  },
  commitText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: 'var(--neutral-color-100)',
    marginLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 80,
  },
  applyButton: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--primary-color)',
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    cursor: 'pointer',
  },
  applyButtonText: {
    marginLeft: 4,
  },
  confirmationMessage: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--green-300)',
    color: 'var(--neutral-color-100)',
    borderRadius: 4,
    padding: 8,
    position: 'fixed',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    boxShadow: 'var(--shadow-1)',
    transition: 'opacity 0.5s ease-in-out',
  },
  confirmationMessageText: {
    marginLeft: 8,
  },
});

// Componente memoizado usando React.memo
const MarkdownToJsx: React$AbstractComponent<Props, mixed> = memo<Props>(function MarkdownToJsx({
  markdownText,
}: Props): React$Node {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [visibleCodeBlocks, setVisibleCodeBlocks] = useState({});

  const toggleCodeBlockVisibility = (index) => {
    setVisibleCodeBlocks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const markdownToJsx = useMemo(() => {
    const lines = markdownText.split('\n');
    let inCodeBlock = false;
    let codeBlockContent = [];
    let currentPath = null;

    // Mapeamos cada línea para convertirla en un componente JSX
    return lines.map((line, index) => {
      // Omitir líneas que solo contienen [SUMMARY] o [CODE]
      if (line.trim() === '[SUMMARY]' || line.trim() === '[CODE]') {
        return null;
      }

      let commitMessage = null;
      const publishMatch = line.match(/^\[PUBLISH: (.+)\]$/);
      if (publishMatch) {
        // eslint-disable-next-line prefer-destructuring
        commitMessage = publishMatch[1];
      }
      // Detectar etiqueta [PUBLISH]
      if (publishMatch) {
        let arrayContent = '';
        let i = index + 2;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          if (!lines[i].trim()) i++;
          else {
            arrayContent += lines[i].trim();
            i++;
          }
        }
        try {
          const array = JSON.parse(arrayContent);
          if (Array.isArray(array)) {
            const handlePublishClick = () => {
              window.codegen.publishServices({ services: array, commitMessage });
            };

            return (
              <div key={index} className={stylex(styles.pathBar, styles.publishBar)}>
                <div className={stylex(styles.publishHeader)}>
                  <span className={stylex(styles.pathText)}>Publicar {array.join(', ')}</span>
                  <InteractiveElement
                    className={stylex(styles.applyButton)}
                    onClick={handlePublishClick}
                  >
                    <Icon icon="motion_play" size={24} color="--neutral-color-100" />
                  </InteractiveElement>
                </div>
                <div className={stylex(styles.commitText)}>{commitMessage}</div>
              </div>
            );
          }
        } catch (e) {
          // No hacer nada si no es un JSON válido
        }
        return null;
      }

      // Detectar etiquetas de ruta de archivo
      const pathMatch = line.match(/^\[PATH: (.+)\]$/);
      if (pathMatch) {
        // eslint-disable-next-line prefer-destructuring
        currentPath = pathMatch[1];
        return null; // No renderizar la línea de la etiqueta
      }

      const isPartialCode = inCodeBlock && index === lines.length - 1;
      // Detectar inicio o fin de un bloque de código
      if (/^```/.test(line) || isPartialCode) {
        if (inCodeBlock) {
          // Fin del bloque de código
          inCodeBlock = false;
          const codeBlockPatch = currentPath;
          const codeBlock = codeBlockContent.join('\n'); // Unir el contenido acumulado
          codeBlockContent = []; // Limpiar el contenido del bloque

          const handleApplyClick = () => {
            window.codegen.saveFile({ filePath: codeBlockPatch, content: codeBlock });
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 5000);
          };

          return (
            <div key={index} className={stylex(styles.codeBlockContainer)}>
              {currentPath && (
                <div
                  className={stylex(
                    styles.pathBar,
                    !visibleCodeBlocks[index] ? styles.pathbarClosed : null,
                  )}
                >
                  {/^```/.test(line) ? (
                    <InteractiveElement onClick={() => toggleCodeBlockVisibility(index)}>
                      <Flexbox alignItems="center" columnGap={4}>
                        <Icon
                          icon={visibleCodeBlocks[index] ? 'expand_more' : 'chevron_right'}
                          size={16}
                          color="--neutral-color-100"
                        />
                        <span className={stylex(styles.pathText)}>{currentPath}</span>
                      </Flexbox>
                    </InteractiveElement>
                  ) : (
                    <span className={stylex(styles.pathText)}>{currentPath}</span>
                  )}
                  {/^```/.test(line) ? (
                    <InteractiveElement
                      className={stylex(styles.applyButton)}
                      onClick={handleApplyClick}
                    >
                      <Icon icon="motion_play" size={24} color="--neutral-color-100" />
                    </InteractiveElement>
                  ) : (
                    <div className={stylex(styles.applyButton)}>
                      <Spinner size={20} color="var(--neutral-color-100)" />
                    </div>
                  )}
                </div>
              )}
              {(visibleCodeBlocks[index] || !codeBlockPatch) && (
                <pre
                  className={stylex(styles.codeBlock)}
                  style={{
                    backgroundImage: `url("${noiseWhiteUrl}")`,
                  }}
                >
                  <code className={`hljs ${stylex(styles.code)}`}>{codeBlock}</code>
                </pre>
              )}
            </div>
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
        return (
          <h3 style={{ fontSize: 16, lineHeight: 1.4 }} key={index}>
            {line.replace(/^### (.*$)/, '$1')}
          </h3>
        );
      }
      if (/^## (.*$)/.test(line)) {
        return (
          <h2 key={index} style={{ fontSize: 16, lineHeight: 1.4 }}>
            {line.replace(/^## (.*$)/, '$1')}
          </h2>
        );
      }
      if (/^# (.*$)/.test(line)) {
        return (
          <h1 key={index} style={{ fontSize: 20, lineHeight: 1.4 }}>
            {line.replace(/^# (.*$)/, '$1')}
          </h1>
        );
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
  }, [markdownText, visibleCodeBlocks]); // Memoizar la conversión en función de `markdownText` y `visibleCodeBlocks`

  // Usamos useEffect para aplicar el resaltado de código cuando el contenido se renderiza
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block); // Resaltado de código sintáctico
    });
  }, [markdownToJsx]); // Se ejecuta cada vez que el JSX generado cambia

  return (
    <div>
      {markdownToJsx}
      {showConfirmation && (
        <div className={stylex(styles.confirmationMessage)}>
          <Icon icon="done" size={16} color="--always-white" />
          <span className={stylex(styles.confirmationMessageText)}>Cambio aplicado</span>
        </div>
      )}
    </div>
  );
});

export default MarkdownToJsx;
