const { dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const handleSelectDirectory = (win) => async (event) => {
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory'],
  });
  if (result.canceled) {
    return null;
  } else {
    const directoryPath = result.filePaths[0];
    const directoryName = path.basename(directoryPath);

    return { directory: directoryPath, directoryName };
  }
};

const handleSaveDirectory = async (
  event,
  { directoryPath, project },
  selectedDirectories,
  saveSelectedDirectories,
  startWatchman,
) => {
  const directoryName = path.basename(directoryPath);
  const serpacloudJsonPath = path.join(directoryPath, 'serpacloud.json');

  let serpacloudData = {
    name: directoryName,
    service: directoryName,
    projectId: project,
  };

  if (fs.existsSync(serpacloudJsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(serpacloudJsonPath, 'utf-8'));
      if (
        data.name !== directoryName ||
        data.service !== directoryName ||
        data.projectId !== project
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

  const existingIndex = selectedDirectories.findIndex((dir) => dir.path === directoryPath);
  if (existingIndex !== -1) {
    selectedDirectories[existingIndex] = { path: directoryPath, project };
  } else {
    selectedDirectories.push({ path: directoryPath, project });
  }

  saveSelectedDirectories();

  return { success: true };
};

module.exports = {
  handleSelectDirectory,
  handleSaveDirectory,
};
