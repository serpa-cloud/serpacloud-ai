/* eslint-disable react/no-array-index-key */
// @flow
import { useState, useEffect } from 'react';
import stylex from '@serpa-cloud/stylex';
import { Text, Button, Flexbox, Modal, Padding } from '../shared'; // Importamos InteractiveElement
import DirectoryTree from './DirectoryTree'; // Importamos el nuevo componente DirectoryTree
import Loader from '../Chat/Loader'; // Importamos el componente Loader
import ProjectItem from './ProjectItem'; // Importamos el nuevo componente ProjectItem

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
  indexingMessage: {
    marginTop: 16,
    color: 'var(--neutral-color-800)',
    fontSize: 16,
    textAlign: 'center',
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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSelectedDirectories = async () => {
      const directories = await window.codegen.getSelectedDirectories();
      setSelectedDirectories(directories.map((d) => ({ ...d, name: getDirectoryName(d.path) })));
    };

    fetchSelectedDirectories();

    // Escuchar la señal de eliminación de directorio
    const handleDirectoryDeleted = (directoryPath) => {
      setSelectedDirectories((prevDirectories) =>
        prevDirectories.filter((dir) => dir.path !== directoryPath),
      );
    };

    window.codegen.onDirectoryDeleted(handleDirectoryDeleted);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.codegen.onDirectoryDeleted(() => {});
    };
  }, []);

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
      setIsSaving(true);
      setSelectedDirectories([...selectedDirectories, tempDirectory]);
      setTempDirectory(null);
      await window.codegen.saveSelectedItems(tempDirectory.path, selectedItems);
      setIsSaving(false);
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    if (!isSaving) {
      setTempDirectory(null);
      setShowModal(false);
    }
  };

  return (
    <div className={stylex(styles.container)}>
      <Button onClick={handleSelectDirectory} buttonType="secondary" icon="library_books">
        Seleccionar Directorio
      </Button>
      <Flexbox flexDirection="column" rowGap={24} className={stylex(styles.directoryList)}>
        {selectedDirectories.map((directory) => (
          <ProjectItem key={directory.name} directory={directory} />
        ))}
      </Flexbox>
      {showModal && (
        <Modal
          title={
            isSaving ? undefined : 'Selecciona los archivos y carpetas a incluir como Contexto'
          }
        >
          {isSaving ? (
            <Padding vertical={80} horizontal={24}>
              <Flexbox flexDirection="column" rowGap={32} alignItems="center">
                <Loader />
                <Flexbox flexDirection="column" rowGap={12}>
                  <Text type="s2b" color="--primary-color-1" textAlign="center">
                    Indexando Proyecto
                  </Text>
                  <Text type="s1m" color="--neutral-color-600" textAlign="center">
                    Por favor no cierres la aplicación
                  </Text>
                </Flexbox>
              </Flexbox>
            </Padding>
          ) : (
            <DirectoryTree tree={directoryTree} onSave={handleSave} onCancel={handleCancel} />
          )}
        </Modal>
      )}
    </div>
  );
}
