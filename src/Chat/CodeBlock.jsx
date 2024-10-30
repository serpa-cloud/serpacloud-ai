// @flow
import { useState } from 'react';
import stylex from '@serpa-cloud/stylex';

import Icon from '../shared/Icon'; // Importar el componente Icon
import Flexbox from '../shared/Flexbox';
import Spinner from '../shared/Spinner';
import InteractiveElement from '../shared/InteractiveElement';

import noiseWhiteUrl from './noise_white.png';

const styles = stylex.create({
  codeBlockContainer: {
    border: '1px solid var(--border-color)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    boxShadow: 'var(--shadow-1)',
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
});

type Props = {|
  +line: string,
  +codeBlock: string,
  +currentPath?: ?string,
  +codeBlockCommand?: ?string,
  +onSuccess?: ?() => void,
|};

export default function CodeBlock({
  line,
  codeBlock,
  currentPath,
  codeBlockCommand,
  onSuccess,
}: Props): React$Node {
  const [commandIsPending, setCommandIsPending] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const filePath = currentPath;

  const handleApplyClick = async () => {
    if (codeBlockCommand === 'PATH') {
      window.codegen.saveFile({
        filePath,
        content: codeBlock,
      });

      if (onSuccess) onSuccess();
    }

    if (codeBlockCommand === 'BASH') {
      setCommandIsPending(true);
      try {
        const result = await window.codegen.executeBashCommand({
          filePath,
          content: `${codeBlock}`,
        });

        console.log(result);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error({ error });
      } finally {
        setCommandIsPending(false);
      }
    }

    // $FlowFixMe
    document.getElementById('webview')?.reloadIgnoringCache?.();
  };

  const isCodeMarkerLine = /^( *|\t*)```/.test(line);

  return (
    <div className={stylex(styles.codeBlockContainer)}>
      {filePath && (
        <div className={stylex(styles.pathBar, !isVisible ? styles.pathbarClosed : null)}>
          {isCodeMarkerLine ? (
            <InteractiveElement onClick={() => setIsVisible((x) => !x)}>
              <Flexbox alignItems="center" columnGap={4}>
                <Icon
                  icon={isVisible ? 'expand_more' : 'chevron_right'}
                  size={16}
                  color="--neutral-color-100"
                />
                <span className={stylex(styles.pathText)}>{filePath}</span>
              </Flexbox>
            </InteractiveElement>
          ) : (
            <span className={stylex(styles.pathText)}>{filePath}</span>
          )}
          {isCodeMarkerLine && !commandIsPending ? (
            <InteractiveElement className={stylex(styles.applyButton)} onClick={handleApplyClick}>
              <Icon icon="motion_play" size={24} color="--neutral-color-100" />
            </InteractiveElement>
          ) : (
            <div className={stylex(styles.applyButton)}>
              <Spinner size={20} color="var(--neutral-color-100)" />
            </div>
          )}
        </div>
      )}
      {(isVisible || !filePath) && (
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

CodeBlock.defaultProps = {
  onSuccess: null,
  currentPath: null,
  codeBlockCommand: 'PATH',
};
