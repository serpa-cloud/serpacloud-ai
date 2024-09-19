// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { startWatchman, stopWatchman } = require('./watchman');

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 600,
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

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();
  startWatchman(); // Iniciar Watchman al iniciar la aplicación

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
