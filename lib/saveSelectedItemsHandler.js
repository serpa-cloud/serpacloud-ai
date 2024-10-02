const path = require('path');
const fs = require('fs');
const { session } = require('electron');
const { indexProject } = require('./indexProject');

async function handleSaveSelectedItems(
  event,
  { directoryPath, selectedItems },
  selectedDirectories,
  saveSelectedDirectories,
  startWatchman,
) {
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

  // Verificar si ya existe un registro con el mismo path y sobrescribirlo
  const existingIndex = selectedDirectories.findIndex((dir) => dir.path === directoryPath);
  if (existingIndex !== -1) {
    selectedDirectories[existingIndex] = { path: directoryPath, items: selectedItems };
  } else {
    selectedDirectories.push({ path: directoryPath, items: selectedItems });
  }

  // Guardar los datos en el archivo
  saveSelectedDirectories();

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
    return null;
  }

  // Invocar la función indexProject después de guardar los subdirectorios y archivos
  try {
    await indexProject(directoryPath, token);
  } catch (error) {
    console.error('Error al indexar el proyecto:', error);
    return null;
  }

  startWatchman(directoryPath);

  return { success: true };
}

module.exports = {
  handleSaveSelectedItems,
};
