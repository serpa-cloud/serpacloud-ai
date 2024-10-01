const { dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const getIgnoreList = (ignoreFilePath) => {
  try {
    const ignoreFileContent = fs.readFileSync(ignoreFilePath, 'utf-8');
    return ignoreFileContent.split('\n').filter((line) => line.trim() !== '');
  } catch (err) {
    return []; // Si no existe el archivo .scignore, no ignoramos nada
  }
};

const shouldIgnore = (filePath, ignoreList) => {
  const binaryImageFontLockPatterns = /\.(png|jpg|jpeg|gif|bmp|tiff|ico|webp|svg|mp4|mkv|avi|exe|dll|bin|woff|woff2|ttf|otf|lock)$/i;

  return (
    ignoreList.some((pattern) => filePath.includes(pattern)) ||
    filePath.includes('.git') ||
    filePath.includes('serpacloud.json') ||
    filePath.includes('serpacloudManifest.json') ||
    filePath.includes('.DS_Store') ||
    binaryImageFontLockPatterns.test(filePath)
  );
};

const buildTree = (dirPath, ignoreList) => {
  const tree = {};
  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    if (shouldIgnore(fullPath, ignoreList)) {
      return;
    }
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      tree[item] = {
        name: item,
        path: fullPath,
        children: buildTree(fullPath, ignoreList),
      };
    } else {
      tree[item] = {
        name: item,
        path: fullPath,
        children: {},
      };
    }
  });

  return tree;
};

const handleSelectDirectory = (win) => async (event, namespace) => {
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory'],
  });
  if (result.canceled) {
    return null;
  } else {
    const directoryPath = result.filePaths[0];
    const directoryName = path.basename(directoryPath);
    const serpacloudJsonPath = path.join(directoryPath, 'serpacloud.json');
    const ignoreFilePath = path.join(directoryPath, '.scignore');

    let serpacloudData = {
      name: directoryName,
      service: directoryName,
      projectId: namespace,
    };

    if (fs.existsSync(serpacloudJsonPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(serpacloudJsonPath, 'utf-8'));
        if (
          data.name !== directoryName ||
          data.service !== directoryName ||
          data.projectId !== namespace
        ) {
          // Sobrescribir el archivo si no cumple con la validación
          fs.writeFileSync(serpacloudJsonPath, JSON.stringify(serpacloudData, null, 2));
        }
      } catch (error) {
        console.error('Error al leer el archivo serpacloud.json:', error);
        return null;
      }
    } else {
      try {
        fs.writeFileSync(serpacloudJsonPath, JSON.stringify(serpacloudData, null, 2));
      } catch (error) {
        console.error('Error al crear el archivo serpacloud.json:', error);
        return null;
      }
    }

    // Obtener la lista de ignorados
    const ignoreList = getIgnoreList(ignoreFilePath);

    // Construir el árbol de directorios
    const tree = buildTree(directoryPath, ignoreList);

    return { directory: directoryPath, tree };
  }
};

module.exports = {
  handleSelectDirectory,
};
