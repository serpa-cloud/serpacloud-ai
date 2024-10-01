// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { startWatchman, stopWatchman } = require('./watchman');
const { handleSelectDirectory } = require('./directoryHandler');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  ipcMain.on('save-file', (event, { filePath, content }) => {
    fs.writeFileSync(`/Users/emiliagonzalez/serpa/serpacloud-ai/${filePath}`, `${content}\n`);
  });

  ipcMain.handle('select-directory', handleSelectDirectory(win));

  ipcMain.handle('save-selected-items', async (event, { directoryPath, selectedItems }) => {
    const serpacloudJsonPath = path.join(directoryPath, 'serpacloud.json');
    let serpacloudData;

    try {
      serpacloudData = JSON.parse(fs.readFileSync(serpacloudJsonPath, 'utf-8'));
    } catch (error) {
      console.error('Error al leer el archivo serpacloud.json:', error);
      return null;
    }

    const relativePaths = selectedItems.map((item) => path.relative(directoryPath, item));
    serpacloudData.include = relativePaths;

    try {
      fs.writeFileSync(serpacloudJsonPath, JSON.stringify(serpacloudData, null, 2));
    } catch (error) {
      console.error('Error al escribir en el archivo serpacloud.json:', error);
      return null;
    }

    return { success: true };
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();
  // startWatchman(); // Iniciar Watchman al iniciar la aplicación

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopWatchman(); // Detener Watchman al cerrar la aplicación
    app.quit();
  }
});
