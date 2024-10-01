/**
 * Este script recorre recursivamente un directorio, excluyendo los archivos o directorios
 * que estén definidos en un archivo `.scignore`, y automáticamente excluye
 * directorios como `.git`, archivos de imágenes, binarios, fuentes, archivos de bloqueo,
 * y `serpacloud.json`. Por cada archivo se genera un UUID único y un hash del contenido
 * para detectar cambios en el futuro. Además, cachea el path, UUID y hash en un archivo temporal.
 * El resultado se muestra por consola, incluyendo el contenido de cada archivo.
 */

/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

const fs = require('fs');
const path = require('path');
const util = require('util');
const os = require('os');
const crypto = require('crypto');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

const serpacloudConfigPath = path.join(__dirname, '../serpacloud.json');
const serpacloudConfig = JSON.parse(fs.readFileSync(serpacloudConfigPath, 'utf-8'));

const forceRefresh = false;

// Configuración de SerpaCloud para obtener projectId y carpetas a incluir
const { projectId, service, include } = serpacloudConfig;

if (!projectId) throw new Error('Project ID Missing');
if (!service) throw new Error('Service Missing');
if (!include || !Array.isArray(include) || include.length === 0)
  throw new Error('Include paths missing or invalid');

// Convertir fs.readFile y fs.readdir a promesas para facilitar el manejo asíncrono
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

/**
 * Lee el archivo `.scignore` y obtiene una lista de patrones (rutas) a ignorar.
 *
 * @param {string} ignoreFilePath - Ruta completa del archivo .scignore.
 * @returns {Promise<string[]>} - Promesa que resuelve con un array de rutas/patrones a ignorar.
 */
async function getIgnoreList(ignoreFilePath) {
  try {
    const ignoreFileContent = await readFile(ignoreFilePath, 'utf-8');
    return ignoreFileContent.split('\n').filter((line) => line.trim() !== '');
  } catch (err) {
    return []; // Si no existe el archivo .scignore, no ignoramos nada
  }
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
  const binaryImageFontLockPatterns = /\.(png|jpg|jpeg|gif|bmp|tiff|ico|webp|svg|mp4|mkv|avi|exe|dll|bin|woff|woff2|ttf|otf|lock)$/i;

  return (
    ignoreList.some((pattern) => filePath.includes(pattern)) ||
    filePath.includes('.git') ||
    filePath.includes('serpacloud.json') ||
    filePath.includes('serpacloudManifest.json') ||
    filePath.includes('.DS_Store') ||
    binaryImageFontLockPatterns.test(filePath)
  );
}

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
 * Genera un hash SHA-256 a partir del pathname del archivo.
 *
 * @param {string} filePath - El pathname del archivo.
 * @returns {string} - El hash generado del pathname del archivo.
 */
function generatePathHash(userId, projectId, service, relativePath) {
  return crypto
    .createHash('sha256')
    .update(`${userId}/${projectId}/${service}/${relativePath}`)
    .digest('hex');
}

/**
 * Carga o inicializa el archivo de cache que contiene los paths, UUIDs y hashes de los archivos.
 *
 * @param {string} cacheFilePath - Ruta completa del archivo de cache.
 * @returns {Object} - Un objeto con la estructura de los metadatos existentes.
 */
function loadCache(cacheFilePath) {
  if (fs.existsSync(cacheFilePath)) {
    const data = fs.readFileSync(cacheFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return {};
}

/**
 * Guarda los metadatos actualizados en el archivo de cache.
 *
 * @param {string} cacheFilePath - Ruta completa del archivo de cache.
 * @param {Object} cacheData - El objeto que contiene los paths, UUIDs y hashes actualizados.
 */
function saveCache(cacheFilePath, cacheData) {
  fs.writeFileSync(cacheFilePath, JSON.stringify(cacheData, null, 2));
}

/**
 * Envía archivos en lotes de 3 con un desfase de 30 segundos entre cada lote.
 *
 * @param {Array} filesBatch - El batch de archivos que se enviarán.
 * @param {Object} cacheData - El objeto que contiene los paths, UUIDs y hashes actualizados.
 * @param {string} cacheFilePath - Ruta completa del archivo de cache.
 */
async function sendBatch(filesBatch, cacheData, cacheFilePath) {
  console.log(`Batch sent with ${filesBatch.length} files`);
  await fetch(`http://localhost:7702/api/ai/files/sync`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ files: filesBatch, forceRefresh }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        console.log('Batch procesado correctamente.');
        // Guardar en caché solo si el batch se procesó correctamente
        filesBatch.forEach((file) => {
          cacheData[file.path] = {
            uuid: file.uuid,
            hash: file.hash,
          };
        });
        saveCache(cacheFilePath, cacheData);
      }
    });
}

/**
 * Recorre recursivamente un directorio para obtener las rutas y contenidos de los archivos,
 * excluyendo los que están en el archivo `.scignore` y también archivos binarios, imágenes, .git, fuentes, locks y `serpacloud.json`.
 * Para cada archivo genera un UUID único, un hash del contenido y lo cachea en el archivo temporal.
 *
 * @param {string} dir - El directorio raíz desde donde comenzará la búsqueda.
 * @param {string} userId - El ID del usuario.
 * @param {string} [ignoreFile='.scignore'] - El nombre del archivo que contiene la lista de ignorados.
 * @returns {Promise<Object>} - Un objeto donde las claves son las rutas relativas y los valores son los UUIDs, hashes y contenidos de los archivos.
 */
async function getDirectoryStructure(dir, userId, ignoreFile = '.scignore') {
  const ignoreList = await getIgnoreList(path.join(dir, ignoreFile));
  const result = {};
  const cacheFilePath = path.join(dir, 'serpacloudManifest.json');
  const cacheData = loadCache(cacheFilePath);
  const filesBatch = [];

  /**
   * Función interna para leer un directorio y procesar recursivamente su contenido.
   *
   * @param {string} currentDir - El directorio actual que se está procesando.
   */
  async function readDirectory(currentDir) {
    const files = await readdir(currentDir);

    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      const relativePath = path.relative(dir, fullPath);

      if (shouldIgnore(relativePath, ignoreList)) {
        continue;
      }

      const fileStat = await stat(fullPath);

      if (fileStat.isDirectory()) {
        await readDirectory(fullPath);
      } else {
        const content = await readFile(fullPath, 'utf-8');
        const fileHash = generateFileHash(content);
        const pathHash = generatePathHash(userId, projectId, service, relativePath); // Generar hash del pathname
        const isInCache = !!cacheData[relativePath];

        if (!isInCache || cacheData[relativePath].hash !== fileHash || forceRefresh) {
          filesBatch.push({
            userId,
            service,
            projectId,
            path: relativePath,
            uuid: pathHash,
            hash: fileHash,
            content,
          });

          if (filesBatch.length === 3) {
            await sendBatch(filesBatch, cacheData, cacheFilePath);
            filesBatch.length = 0;
            await new Promise((resolve) => setTimeout(resolve, 30000)); // Desfase de 30 segundos
          }
        }

        result[relativePath] = cacheData[relativePath];
      }
    }
  }

  for (const includePath of include) {
    const fullPath = path.join(dir, includePath);
    await readDirectory(fullPath);
  }

  if (filesBatch.length > 0) {
    await sendBatch(filesBatch, cacheData, cacheFilePath); // Enviar cualquier archivo que quede fuera del batch de 3
  }

  return result;
}

// Ejemplo de uso:
(async () => {
  try {
    const directoryPath = '/Users/emiliagonzalez/serpa/serpacloud-ai'; // Cambia por el directorio que deseas recorrer
    const userId = 'User:083d1780-2e56-11ed-8cc1-ebad2d2dfac7'; // Cambia por el ID del usuario
    await getDirectoryStructure(directoryPath, userId);
  } catch (error) {
    console.error('Error:', error);
  }
})();
