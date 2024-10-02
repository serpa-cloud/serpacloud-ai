/* eslint-disable react/no-array-index-key */
// @flow
import stylex from '@serpa-cloud/stylex';
import { useState, useEffect, useCallback } from 'react';
import { Text, Icon, Checkbox, InteractiveElement, Button, Flexbox } from '../shared';

const styles = stylex.create({
  root: {
    paddingLeft: 16,
  },
  treeNode: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12, // Añadimos espacio vertical entre los elementos
  },
  treeNodeContent: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
  treeNodeChildren: {
    paddingLeft: 16,
  },
  chevronContainer: {
    position: 'absolute',
    left: -20,
    width: 16, // Aseguramos que el espacio ocupado por el chevron sea consistente
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    paddingTop: 24,
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#fff',
  },
});

type DirectoryTreeProps = {|
  +tree: Object,
  +onSave: (selectedItems: Array<string>) => Promise<void> | void,
  +onCancel: () => Promise<void> | void,
|};

export default function DirectoryTree({ tree, onSave, onCancel }: DirectoryTreeProps): React$Node {
  const [checkedItems, setCheckedItems] = useState({});
  const [collapsedNodes, setCollapsedNodes] = useState({});

  // Función para inicializar los nodos colapsados
  const initializeCollapsedNodes = useCallback((treeData, parentPath = '') => {
    const collapsed = {};
    Object.keys(treeData).forEach((key) => {
      const node = treeData[key];
      const nodePath = parentPath ? `${parentPath}/${key}` : key;
      if (Object.keys(node.children).length > 0) {
        collapsed[nodePath] = true;
        Object.assign(collapsed, initializeCollapsedNodes(node.children, nodePath));
      }
    });
    return collapsed;
  }, []);

  useEffect(() => {
    setCollapsedNodes(initializeCollapsedNodes(tree));
  }, [initializeCollapsedNodes, tree]);

  const handleCheckboxChange = (path) => {
    setCheckedItems((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleToggleCollapse = (path) => {
    setCollapsedNodes((prev) => ({
      ...prev,
      // $FlowExpectedError
      [path]: !prev[path],
    }));
  };

  const handleSave = () => {
    const selectedItems = Object.keys(checkedItems).filter((key) => checkedItems[key]);
    onSave(selectedItems);
  };

  const renderTree = (treeData, parentPath = '') => {
    return Object.keys(treeData).map((key) => {
      const node = treeData[key];
      const nodePath = parentPath ? `${parentPath}/${key}` : key;
      const isCollapsed = collapsedNodes[nodePath];
      const hasChildren = Object.keys(node.children).length > 0;

      return (
        <div key={node.path} className={stylex(styles.treeNode)}>
          <div className={stylex(styles.treeNodeContent)}>
            {hasChildren && (
              <InteractiveElement
                className={stylex(styles.chevronContainer)}
                onClick={() => handleToggleCollapse(nodePath)}
              >
                <Icon icon={isCollapsed ? 'chevron_right' : 'expand_more'} size={16} />
              </InteractiveElement>
            )}
            <Flexbox alignItems="center" columnGap={8}>
              <Checkbox
                checked={!!checkedItems[node.path]}
                onChange={() => handleCheckboxChange(node.path)}
              />
              <Text type="s0r">{node.name}</Text>
            </Flexbox>
          </div>
          {hasChildren && !isCollapsed && (
            <div className={stylex(styles.treeNodeChildren, styles.treeNode)}>
              {renderTree(node.children, nodePath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div className={stylex(styles.root)}>
        <div className={stylex(styles.treeNode)}>{renderTree(tree)}</div>
      </div>
      <Flexbox alignItems="center" justifyContent="space-between" className={stylex(styles.footer)}>
        <Button onClick={onCancel} buttonType="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave}>Guardar</Button>
      </Flexbox>
    </>
  );
}
