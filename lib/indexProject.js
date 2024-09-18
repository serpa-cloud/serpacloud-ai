/**
 * Este script recorre recursivamente un directorio, excluyendo los archivos o directorios
 * que estén definidos en un archivo `.serpacloudignore`, y automáticamente excluye
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
const serpacloudConfig = require('../serpacloud.json');

// Configuración de SerpaCloud para obtener projectId
const { projectId, service } = serpacloudConfig;

if (!projectId) throw new Error('Project ID Missing');
if (!service) throw new Error('Service Missing');

// Convertir fs.readFile y fs.readdir a promesas para facilitar el manejo asíncrono
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

// Definir el archivo de cache en el directorio temporal del sistema operativo
const cacheFilePath = path.join(os.tmpdir(), 'serpacloud_cache.json');

/**
 * Lee el archivo `.serpacloudignore` y obtiene una lista de patrones (rutas) a ignorar.
 *
 * @param {string} ignoreFilePath - Ruta completa del archivo .serpacloudignore.
 * @returns {Promise<string[]>} - Promesa que resuelve con un array de rutas/patrones a ignorar.
 */
async function getIgnoreList(ignoreFilePath) {
  try {
    const ignoreFileContent = await readFile(ignoreFilePath, 'utf-8');
    return ignoreFileContent.split('\n').filter((line) => line.trim() !== '');
  } catch (err) {
    return []; // Si no existe el archivo .serpacloudignore, no ignoramos nada
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
 * Recorre recursivamente un directorio para obtener las rutas y contenidos de los archivos,
 * excluyendo los que están en el archivo `.serpacloudignore` y también archivos binarios, imágenes, .git, fuentes, locks y `serpacloud.json`.
 * Para cada archivo genera un UUID único, un hash del contenido y lo cachea en el archivo temporal.
 *
 * @param {string} dir - El directorio raíz desde donde comenzará la búsqueda.
 * @param {string} [ignoreFile='.serpacloudignore'] - El nombre del archivo que contiene la lista de ignorados.
 * @returns {Promise<Object>} - Un objeto donde las claves son las rutas relativas y los valores son los UUIDs, hashes y contenidos de los archivos.
 */
async function getDirectoryStructure(dir, ignoreFile = '.serpacloudignore') {
  const ignoreList = await getIgnoreList(path.join(dir, ignoreFile)); // Obtener la lista de ignorados
  const result = {};
  const cacheData = loadCache(); // Cargar los datos del cache

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

      // Si el archivo está en la lista de ignorados, omitirlo
      if (shouldIgnore(relativePath, ignoreList)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const fileStat = await stat(fullPath);

      if (fileStat.isDirectory()) {
        // Si es un directorio, recorrerlo recursivamente
        await readDirectory(fullPath);
      } else {
        // Si es un archivo, leer su contenido
        const content = await readFile(fullPath, 'utf-8');
        const fileHash = generateFileHash(content);

        // Verificar si ya existe un UUID para este archivo en el cache
        if (!cacheData[relativePath]) {
          cacheData[relativePath] = {
            uuid: uuidv4(),
            hash: fileHash,
          };
        } else {
          // Actualizar el hash si el contenido ha cambiado
          cacheData[relativePath].hash = fileHash;
        }

        result[relativePath] = cacheData[relativePath];

        // Procesar el contenido en el servidor
        await fetch(`http://localhost:7702/api/ai/files/sync`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            service,
            projectId,
            path: relativePath,
            uuid: cacheData[relativePath].uuid,
            hash: cacheData[relativePath].hash,
            content,
          }),
        })
          .then((res) => {
            if (res.status === 304) {
              return console.log(`Archivo sin cambios: ${relativePath}`);
            }
            return res.json();
          })
          .then((res) => {
            if (res) {
              if (res.error) {
                console.log(res.error);
              } else {
                console.log(`Archivo procesado: ${relativePath}`);
              }
            }
          });
      }
    }
  }

  // Comenzar la lectura desde el directorio raíz
  await readDirectory(dir);

  // Guardar el cache actualizado
  saveCache(cacheData);

  return result;
}

// Ejemplo de uso:
(async () => {
  try {
    const directoryPath = '/Users/emiliagonzalez/serpa/serpacloud-ai'; // Cambia por el directorio que deseas recorrer
    await getDirectoryStructure(directoryPath);
  } catch (error) {
    console.error('Error:', error);
  }
})();
