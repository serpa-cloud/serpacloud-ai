// preload with contextIsolation enabled
// eslint-disable-next-line import/no-extraneous-dependencies
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('codegen', {
  saveFile({ filePath, content }) {
    ipcRenderer.send('save-file', { filePath, content });
  },
});
