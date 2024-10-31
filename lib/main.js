import('fix-path').then((fixPath) => {
  fixPath.default();
});

const log = require('electron-log');
const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { autoUpdater } = require('electron-updater');

const { startWatchman, stopWatchman } = require('./watchman');
const { handleSelectDirectory, handleSaveDirectory } = require('./directoryHandler');
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

async function reindexSelectedDirectories(project) {
  let token;
  try {
    stopWatchman();
    const cookies = await session.defaultSession.cookies.get({ name: 'x-token' });
    if (cookies.length === 0) {
      throw new Error('Token no encontrado en las cookies');
    }
    token = cookies[0].value;
  } catch (error) {
    console.error('Error al obtener la cookie x-token:', error);
    return;
  }

  const currentDir = selectedDirectories.find((dir) => dir.project === project);

  if (currentDir) {
    const { path: directoryPath } = currentDir;
    try {
      await indexProject(directoryPath, token);
      startWatchman(directoryPath);
    } catch (error) {
      console.error(`Error al reindexar el directorio ${directoryPath}:`, error);
    }
  }
}

function createDirectoryRecursive(filePath) {
  try {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
    return true;
  } catch (error) {
    console.error('Error al crear directorios:', error);
    return false;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 12 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
      webviewTag: true,
      devTools: true,
    },
  });

  win.once('ready-to-show', () => {
    win.maximize();
    win.show();
  });

  ipcMain.on('save-file', (event, { filePath, content }) => {
    if (filePath.startsWith(path.sep)) filePath = filePath.replace(path.sep, '');
    const segments = filePath.split(path.sep);
    const firstSegment = segments[0];

    const matchingDirectory = selectedDirectories.find((dir) => {
      const dirSegments = dir.path.split(path.sep);
      return dirSegments[dirSegments.length - 1] === firstSegment;
    });

    if (matchingDirectory) {
      const relativePath = segments.slice(1).join(path.sep);
      const fullPath = path.join(matchingDirectory.path, relativePath);

      if (createDirectoryRecursive(fullPath)) {
        try {
          fs.writeFileSync(fullPath, `${content}\n`);
        } catch (error) {
          console.error('Error al guardar el archivo:', error);
        }
      } else {
        console.error('No se pudo crear la ruta del archivo.');
      }
    } else {
      throw new Error('No matching directory found for the provided path.');
    }
  });

  ipcMain.handle('execute-bash-command', async (event, { filePath, content }) => {
    if (filePath.startsWith(path.sep)) filePath = filePath.replace(path.sep, '');
    const segments = filePath.split(path.sep);
    const firstSegment = segments[0];

    const matchingDirectory = selectedDirectories.find((dir) => {
      const dirSegments = dir.path.split(path.sep);
      return dirSegments[dirSegments.length - 1] === firstSegment;
    });

    if (matchingDirectory) {
      try {
        const { stdout, stderr } = await exec(`cd ${matchingDirectory.path} && ${content}`);
        return { stdout, stderr, path: process.env.PATH };
      } catch (error) {
        return { error, path: process.env.PATH };
      }
    } else {
      throw new Error(`No matching directory found for the provided path. ${process.env.PATH}`);
    }
  });

  ipcMain.handle('select-directory', async (event, namespace) => {
    const result = await handleSelectDirectory(win)(event, namespace);
    return result;
  });

  ipcMain.handle('save-directory', async (event, args) => {
    return handleSaveDirectory(
      event,
      args,
      selectedDirectories,
      saveSelectedDirectories,
      startWatchman,
    );
  });

  ipcMain.handle('get-selected-directories', async (event, project) => {
    return selectedDirectories.filter((dir) => dir.project === project);
  });

  ipcMain.handle('reindex-directories', async (event, project) => {
    await reindexSelectedDirectories(project);
    return { success: true };
  });

  ipcMain.on('show-context-menu', (event, directoryPath) => {
    handleContextMenu(event, directoryPath, selectedDirectories, saveSelectedDirectories);
  });

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
            } push origin HEAD --force`,
          );
          results.push({ service, stdout, stderr });
        } catch (error) {
          results.push({ service, error: error.message });
        }
      } else {
        results.push({ service, error: 'Directorio no encontrado' });
      }
    }

    return results;
  });

  win.loadURL('https://serpacloud-ai-default--abundance.yellow-code.workspaces.serpa.cloud');
  // win.loadURL('http://localhost:3000');

  function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
  }

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });
  autoUpdater.on('update-available', () => {
    sendStatusToWindow('Update available.');
  });
  autoUpdater.on('update-not-available', () => {
    sendStatusToWindow('Update not available.');
  });
  autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
    sendStatusToWindow(log_message);
  });
  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');

    setTimeout(() => {
      autoUpdater.quitAndInstall();
      app.exit();
    }, 10000);
  });
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
  ipcMain.removeHandler('select-directory');
  ipcMain.removeHandler('save-directory');
  ipcMain.removeHandler('execute-bash-command');
  ipcMain.removeHandler('get-selected-directories');
  ipcMain.removeHandler('reindex-directories');
  ipcMain.removeHandler('publish-services');
  ipcMain.removeAllListeners('show-context-menu');
  ipcMain.removeAllListeners('save-file');

  if (process.platform !== 'darwin') {
    stopWatchman();
    saveSelectedDirectories();
    app.quit();
  }
});
