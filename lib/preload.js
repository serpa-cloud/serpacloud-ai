// preload with contextIsolation enabled
// eslint-disable-next-line import/no-extraneous-dependencies
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('codegen', {
  saveFile({ filePath, content }) {
    ipcRenderer.send('save-file', { filePath, content });
  },
  selectDirectory(namespace) {
    return ipcRenderer.invoke('select-directory', namespace);
  },
  saveSelectedItems(directoryPath, selectedItems) {
    return ipcRenderer.invoke('save-selected-items', { directoryPath, selectedItems });
  },
  getSelectedDirectories() {
    return ipcRenderer.invoke('get-selected-directories');
  },
  reindexDirectories() {
    return ipcRenderer.invoke('reindex-directories');
  },
  showContextMenu(directoryPath) {
    ipcRenderer.send('show-context-menu', directoryPath);
  },
  onDirectoryDeleted(callback) {
    ipcRenderer.on('directory-deleted', (event, directoryPath) => callback(directoryPath));
  },
  publishServices: ({ services, commitMessage }) =>
    ipcRenderer.invoke('publish-services', { services, commitMessage }),
});
