/* eslint-disable react/no-array-index-key */
// @flow
import { useState } from 'react';
import stylex from '@serpa-cloud/stylex';
import { Text, Button, Flexbox, Icon, Modal } from '../shared'; // Importamos InteractiveElement
import DirectoryTree from './DirectoryTree'; // Importamos el nuevo componente DirectoryTree

const styles = stylex.create({
  container: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  directoryList: {
    marginTop: 24,
  },
  directoryRow: {
    width: '100%',
  },
  directoryItem: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
    width: 'calc(100% - 32px)',
  },
  directoryPath: {
    fontFamily: 'var(--font-family-default)',
    fontSize: 12,
    color: 'var(--neutral-color-600)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

// Función auxiliar para obtener el nombre del directorio a partir de la ruta completa
const getDirectoryName = (fullPath) => {
  const parts = fullPath.split('/');
  return parts[parts.length - 1];
};

type Props = {|
  +namespace: string,
|};

export default function Projects({ namespace }: Props): React$Node {
  const [selectedDirectories, setSelectedDirectories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [directoryTree, setDirectoryTree] = useState({});
  const [tempDirectory, setTempDirectory] = useState(null);

  const handleSelectDirectory = async () => {
    // Llamamos al método selectDirectory expuesto en preload.js
    const result = await window.codegen.selectDirectory(namespace);
    const { directory, tree } = result;
    if (directory && !selectedDirectories.some((dir) => dir.path === directory)) {
      setTempDirectory({
        path: directory,
        name: getDirectoryName(directory),
        tree,
      });
      setDirectoryTree(tree);
      setShowModal(true);
    }
  };

  const handleSave = async (selectedItems) => {
    if (tempDirectory) {
      setSelectedDirectories([...selectedDirectories, tempDirectory]);
      setTempDirectory(null);
      await window.codegen.saveSelectedItems(tempDirectory.path, selectedItems);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setTempDirectory(null);
    setShowModal(false);
  };

  return (
    <div className={stylex(styles.container)}>
      <Button onClick={handleSelectDirectory} buttonType="secondary" icon="library_books">
        Seleccionar Directorio
      </Button>
      <Flexbox flexDirection="column" rowGap={24} className={stylex(styles.directoryList)}>
        {selectedDirectories.map((directory, index) => (
          <Flexbox
            alignItems="center"
            key={index}
            columnGap={12}
            className={stylex(styles.directoryRow)}
          >
            <Icon icon="folder" size={20} />

            <div className={stylex(styles.directoryItem)}>
              <Text type="s0b" color="--neutral-color-800">
                {directory.name}
              </Text>
              <span className={stylex(styles.directoryPath)}>{directory.path}</span>
            </div>
          </Flexbox>
        ))}
      </Flexbox>
      {showModal && (
        <Modal title="Selecciona los archivos y carpetas a incluir como Contexto">
          <DirectoryTree tree={directoryTree} onSave={handleSave} onCancel={handleCancel} />
        </Modal>
      )}
    </div>
  );
}
