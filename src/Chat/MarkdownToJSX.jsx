/* eslint-disable react/no-array-index-key */
// @flow
import hljs from 'highlight.js';
import stylex from '@serpa-cloud/stylex';
import { memo, useMemo, useEffect, useState } from 'react';

import 'highlight.js/styles/github.css'; // Puedes usar cualquier estilo disponible

import noiseWhiteUrl from './noise_white.png';
import InteractiveElement from '../shared/InteractiveElement'; // Importar el componente InteractiveElement
import Icon from '../shared/Icon'; // Importar el componente Icon

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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 0,
    boxShadow: 'var(--shadow-1)',
    marginTop: 0, // Para que no haya espacio entre la barra y el bloque de código
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
    backgroundColor: 'var(--primary-color-1)',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: '1px solid var(--border-color)',
  },
  pathText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: 'var(--neutral-color-100)',
  },
  applyButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    border: '1px solid var(--primary-color)',
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

  const markdownToJsx = useMemo(() => {
    const lines = markdownText.split('\n');
    let inCodeBlock = false;
    let codeBlockContent = [];
    let currentPath = null;

    // Mapeamos cada línea para convertirla en un componente JSX
    return lines.map((line, index) => {
      // Detectar etiquetas de ruta de archivo
      const pathMatch = line.match(/^\[PATH: (.+)\]$/);
      if (pathMatch) {
        // eslint-disable-next-line prefer-destructuring
        currentPath = pathMatch[1];
        return null; // No renderizar la línea de la etiqueta
      }

      // Detectar inicio o fin de un bloque de código
      if (/^```/.test(line)) {
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
            <div key={index}>
              {currentPath && (
                <div className={stylex(styles.pathBar)}>
                  <span className={stylex(styles.pathText)}>{currentPath}</span>
                  <InteractiveElement
                    className={stylex(styles.applyButton)}
                    onClick={handleApplyClick}
                  >
                    <Icon icon="save" size={16} />
                    <span className={stylex(styles.applyButtonText)}>Aplicar</span>
                  </InteractiveElement>
                </div>
              )}
              <pre
                className={stylex(styles.codeBlock)}
                style={{
                  backgroundImage: `url("${noiseWhiteUrl}")`,
                }}
              >
                <code className={`hljs ${stylex(styles.code)}`}>{codeBlock}</code>
              </pre>
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
