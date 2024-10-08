// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const fs = require('fs');
const util = require('util');

const { startWatchman, stopWatchman } = require('./watchman');
const { handleSelectDirectory } = require('./directoryHandler');
const { handleSaveSelectedItems } = require('./saveSelectedItemsHandler');
const { indexProject } = require('./indexProject');
const { handleContextMenu } = require('./contextMenuHandler');

const exec = util.promisify(require('child_process').exec);

const dataFilePath = path.join(app.getPath('userData'), 'selectedDirectories.json');
let selectedDirectories = [];

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

const saveSelectedDirectories = () => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(selectedDirectories, null, 2));
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
};

async function reindexSelectedDirectories() {
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

  for (const { path: directoryPath } of selectedDirectories) {
    try {
      await indexProject(directoryPath, token);
      startWatchman(directoryPath);
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
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  ipcMain.on('save-file', (event, { filePath, content }) => {
    if (filePath.startsWith('/')) filePath = filePath.replace('/', '');
    const segments = filePath.split(path.sep);
    const firstSegment = segments[0];

    const matchingDirectory = selectedDirectories.find((dir) => {
      const dirSegments = dir.path.split(path.sep);
      return dirSegments[dirSegments.length - 1] === firstSegment;
    });

    if (matchingDirectory) {
      const relativePath = segments.slice(1).join(path.sep);
      const fullPath = path.join(matchingDirectory.path, relativePath);
      fs.writeFileSync(fullPath, `${content}\n`);
    } else {
      throw new Error('No matching directory found for the provided path.');
    }
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

  ipcMain.on('show-context-menu', (event, directoryPath) => {
    handleContextMenu(event, directoryPath, selectedDirectories, saveSelectedDirectories);
  });

  // Nuevo handler IPC para publicar servicios
  ipcMain.handle('publish-services', async (event, { services, commitMessage }) => {
    const results = [];
    for (const service of services) {
      const matchingDirectory = selectedDirectories.find((dir) => {
        const dirSegments = dir.path.split(path.sep);
        return dirSegments[dirSegments.length - 1] === service;
      });

      if (matchingDirectory) {
        try {
          const { stdout, stderr } = await exec(
            `git -C ${matchingDirectory.path} add . && git -C ${
              matchingDirectory.path
            } commit -m '${commitMessage || 'feat: codegen'}' --no-verify && git -C ${
              matchingDirectory.path
            } push origin HEAD`,
          );
          results.push({ service, stdout, stderr });
        } catch (error) {
          results.push({ service, error: error.message });
        }
      } else {
        results.push({ service, error: 'Directorio no encontrado' });
      }
    }
    console.log(results);
    return results;
  });

  win.loadURL('https://serpacloud-ai-default--abundance.yellow-code.workspaces.serpa.cloud');
}

app.whenReady().then(() => {
  loadSelectedDirectories();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopWatchman();
    saveSelectedDirectories();
    app.quit();
  }
});
