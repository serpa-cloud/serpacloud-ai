// preload with contextIsolation enabled
// eslint-disable-next-line import/no-extraneous-dependencies
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('codegen', {
  saveFile({ filePath, content }) {
    ipcRenderer.send('save-file', { filePath, content });
  },
  executeBashCommand({ filePath, content }) {
    return ipcRenderer.invoke('execute-bash-command', { filePath, content });
  },
  selectDirectory() {
    return ipcRenderer.invoke('select-directory');
  },
  saveDirectory({ directoryPath, project }) {
    return ipcRenderer.invoke('save-directory', { directoryPath, project });
  },
  getSelectedDirectories(project) {
    return ipcRenderer.invoke('get-selected-directories', project);
  },
  reindexDirectories(project) {
    return ipcRenderer.invoke('reindex-directories', project);
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
