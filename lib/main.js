// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const fs = require('fs');

const { startWatchman, stopWatchman } = require('./watchman');
const { handleSelectDirectory } = require('./directoryHandler');
const { handleSaveSelectedItems } = require('./saveSelectedItemsHandler'); // Importar el nuevo manejador
const { indexProject } = require('./indexProject'); // Importar la función indexProject

const dataFilePath = path.join(app.getPath('userData'), 'selectedDirectories.json');
let selectedDirectories = []; // Variable global para almacenar los datos seleccionados

// Función para cargar los datos guardados desde el archivo
const loadSelectedDirectories = () => {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf-8');
      selectedDirectories = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error al cargar los datos guardados:', error);
  }
};

// Función para guardar los datos en el archivo
const saveSelectedDirectories = () => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(selectedDirectories, null, 2));
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
};

async function reindexSelectedDirectories() {
  // Obtener la cookie x-token
  let token;
  try {
    const cookies = await session.defaultSession.cookies.get({ name: 'x-token' });
    if (cookies.length === 0) {
      throw new Error('Token no encontrado en las cookies');
    }
    token = cookies[0].value;
  } catch (error) {
    console.error('Error al obtener la cookie x-token:', error);
    return;
  }

  console.log({ selectedDirectories });

  // Reindexar cada directorio seleccionado
  for (const { path: directoryPath } of selectedDirectories) {
    try {
      await indexProject(directoryPath, token);
      startWatchman(directoryPath); // Iniciar Watchman para cada directorio después de reindexar
    } catch (error) {
      console.error(`Error al reindexar el directorio ${directoryPath}:`, error);
    }
  }
}

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

  ipcMain.handle('select-directory', async (event, namespace) => {
    const result = await handleSelectDirectory(win)(event, namespace);
    return result;
  });

  ipcMain.handle('save-selected-items', async (event, args) => {
    return handleSaveSelectedItems(
      event,
      args,
      selectedDirectories,
      saveSelectedDirectories,
      startWatchman,
    );
  });

  ipcMain.handle('get-selected-directories', async () => {
    return selectedDirectories;
  });

  ipcMain.handle('reindex-directories', async () => {
    await reindexSelectedDirectories();
    return { success: true };
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  loadSelectedDirectories(); // Cargar los datos guardados al iniciar la aplicación
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopWatchman(); // Detener Watchman al cerrar la aplicación
    saveSelectedDirectories(); // Guardar los datos al cerrar la aplicación
    app.quit();
  }
});
