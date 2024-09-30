const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const serpacloudConfig = require('../serpacloud.json');

const cacheFilePath = path.join(require('os').tmpdir(), 'serpacloud_cache.json');
const { projectId, service } = serpacloudConfig;

if (!projectId) throw new Error('Project ID Missing');
if (!service) throw new Error('Service Missing');

/**
 * Genera un hash SHA-256 a partir del contenido de un archivo.
 *
 * @param {string} content - El contenido del archivo.
 * @returns {string} - El hash generado del archivo.
 */
function generateFileHash(content) {
  return crypto
    .createHash('sha256')
    .update(content)
    .digest('hex');
}

/**
 * Carga o inicializa el archivo de cache que contiene los paths, UUIDs y hashes de los archivos.
 *
 * @returns {Object} - Un objeto con la estructura de los metadatos existentes.
 */
function loadCache() {
  if (fs.existsSync(cacheFilePath)) {
    const data = fs.readFileSync(cacheFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return {};
}

/**
 * Guarda los metadatos actualizados en el archivo de cache.
 *
 * @param {Object} cacheData - El objeto que contiene los paths, UUIDs y hashes actualizados.
 */
function saveCache(cacheData) {
  fs.writeFileSync(cacheFilePath, JSON.stringify(cacheData, null, 2));
  fs.writeFileSync('serpacloudManifest.json', JSON.stringify(cacheData, null, 2));
}

/**
 * Verifica si un archivo o directorio debería ser ignorado con base en la lista de ignore
 * y también si es un archivo binario, imagen, fuente, lock, `.git` o `serpacloud.json`.
 *
 * @param {string} filePath - La ruta relativa del archivo o directorio.
 * @param {string[]} ignoreList - Lista de patrones de archivos o directorios a ignorar.
 * @returns {boolean} - Retorna true si el archivo debe ser ignorado, false si no.
 */
function shouldIgnore(filePath, ignoreList) {
  // Patrones para archivos binarios, imágenes, fuentes y locks comunes
  const binaryImageFontLockPatterns = /\.(png|jpg|jpeg|gif|bmp|tiff|ico|webp|svg|mp4|mkv|avi|exe|dll|bin|woff|woff2|ttf|otf|lock)$/i;

  // Ignorar si está en la lista de ignore, si es .git, serpacloud.json, o si es un archivo binario/imagen/fuente/lock
  return (
    ignoreList.some((pattern) => filePath.includes(pattern)) ||
    filePath.includes('.git') ||
    filePath.includes('serpacloud.json') ||
    binaryImageFontLockPatterns.test(filePath)
  );
}

/**
 * Maneja los cambios en los archivos.
 *
 * @param {string} filePath - La ruta del archivo que ha cambiado.
 */
async function handleFileChange(filePath) {
  // Leer los patrones de ignorados desde el archivo .scignore
  const ignoreFilePath = path.join(__dirname, '..', '.scignore');
  const ignorePatterns = fs
    .readFileSync(ignoreFilePath, 'utf-8')
    .split('\n')
    .filter((line) => line.trim() !== '');

  // Verificar si es un archivo y no una carpeta
  if (fs.statSync(filePath).isDirectory() || shouldIgnore(filePath, ignorePatterns)) {
    return;
  }

  // Cargar el contenido del archivo modificado
  const content = fs.readFileSync(filePath, 'utf-8');
  const newHash = generateFileHash(content);

  // Cargar el cache
  const cacheData = loadCache();
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);

  // Verificar si el archivo está en el cache y si el hash ha cambiado
  if (!cacheData[relativePath] || cacheData[relativePath].hash !== newHash) {
    // Generar un nuevo UUID si no existe
    const uuid = cacheData[relativePath] ? cacheData[relativePath].uuid : uuidv4();

    // Reindexar el archivo en el servidor
    console.log(`Reindexando archivo: ${filePath}`);

    const response = await fetch('http://localhost:7702/api/ai/files/sync', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        files: [
          {
            service,
            projectId,
            path: relativePath,
            uuid,
            hash: newHash,
            content,
          },
        ],
      }),
    });

    if (response.status === 304) {
      console.log(`Archivo sin cambios: ${relativePath}`);
      // Actualizar el cache
      cacheData[relativePath] = {
        uuid,
        hash: newHash,
      };
      saveCache(cacheData);
    } else {
      const result = await response.json();
      if (result.error) {
        console.log(result.error);
      } else {
        console.log(`Archivo procesado: ${relativePath}`);

        // Actualizar el cache
        cacheData[relativePath] = {
          uuid,
          hash: newHash,
        };
        saveCache(cacheData);
      }
    }
  }
}

module.exports = {
  handleFileChange,
};
