const fs = require('fs');
const path = require('path');
const util = require('util');
const crypto = require('crypto');
const ignore = require('ignore');
const fetch = require('node-fetch');

const gitignorePatterns = require('./gitIgnorePatterns');

const forceRefresh = false;

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

function isUtf8(filePath) {
  try {
    // Leer el archivo como un buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Intentar convertir el buffer en una cadena UTF-8
    fileBuffer.toString('utf8');

    // Si no lanza error, es un archivo de texto UTF-8
    return true;
  } catch (err) {
    // Si se lanza un error, probablemente no sea UTF-8
    return false;
  }
}

async function existsAndIsFile(pathString) {
  try {
    const stats = await stat(pathString);
    return stats.isFile();
  } catch (err) {
    if (err.code === 'ENOENT') {
      // El archivo no existe
      return false;
    }

    return false;
  }
}

async function getIgnoreList(ignoreFilePath, gitignorePath) {
  let ignoreElements = [];

  try {
    const gitignoreContent = await readFile(gitignorePath, 'utf-8');
    const gitignoreElements = gitignoreContent.split('\n').filter((line) => line.trim() !== '');

    ignoreElements = [...ignoreElements, ...gitignoreElements];
  } catch (e) {}

  try {
    const ignoreFileContent = await readFile(ignoreFilePath, 'utf-8');
    const ignoreFileElements = ignoreFileContent.split('\n').filter((line) => line.trim() !== '');

    ignoreElements = [...ignoreElements, ...ignoreFileElements];
  } catch (e) {}

  return ignoreElements.filter((e) => !e.startsWith('#'));
}

function shouldIgnore(filePath, ignoreList) {
  const binaryImageFontLockPatterns = /\.(png|jpg|jpeg|gif|bmp|tiff|ico|webp|svg|mp4|mkv|avi|exe|dll|bin|woff|woff2|ttf|otf|lock)$/i;

  const ig = ignore().add([...ignoreList, ...gitignorePatterns]);
  const excluded = ig.ignores(filePath);

  return (
    excluded ||
    filePath.includes('.git') ||
    filePath.includes('serpacloud.json') ||
    filePath.includes('serpacloudManifest.json') ||
    filePath.includes('.DS_Store') ||
    binaryImageFontLockPatterns.test(filePath)
  );
}

function generateFileHash(content) {
  return crypto
    .createHash('sha256')
    .update(content)
    .digest('hex');
}

function generatePathHash(userId, projectId, service, relativePath) {
  return crypto
    .createHash('sha256')
    .update(`${userId}/${projectId}/${service}/${relativePath}`)
    .digest('hex');
}

function loadCache(cacheFilePath) {
  if (fs.existsSync(cacheFilePath)) {
    const data = fs.readFileSync(cacheFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return {};
}

function saveCache(cacheFilePath, cacheData) {
  fs.writeFileSync(cacheFilePath, JSON.stringify(cacheData, null, 2));
}

async function sendBatch(filesBatch, cacheData, cacheFilePath, token, isDelete) {
  console.log(`Batch sent with ${filesBatch.length} files, mode = ${isDelete ? 'delete' : 'sync'}`);

  await fetch(`https://serpa.cloud/api/ai/files/sync`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ files: filesBatch, forceRefresh }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        filesBatch.forEach((file) => {
          const isUpdated = res.error.some(
            (updatedFile) =>
              updatedFile.id === file.uuid &&
              updatedFile.error === 'backend.agosto.alreadyProcessed',
          );
          if (isUpdated) {
            cacheData[file.path] = {
              uuid: file.uuid,
              hash: file.hash,
            };
          }

          const isDeleted = res.error.some(
            (updatedFile) => updatedFile.id === file.uuid && updatedFile.status === 'deleted',
          );

          if (isDeleted) {
            delete cacheData[file.path];
          }
        });
      } else {
        filesBatch.forEach((file) => {
          const isUpdated = res.data.some(
            (updatedFile) =>
              updatedFile.datapoint_id === file.uuid ||
              (updatedFile.id === file.uuid &&
                updatedFile.error === 'backend.agosto.alreadyProcessed'),
          );
          if (isUpdated) {
            cacheData[file.path] = {
              uuid: file.uuid,
              hash: file.hash,
            };
          }

          const isDeleted = res.data.some(
            (updatedFile) => updatedFile.id === file.uuid && updatedFile.status === 'deleted',
          );

          if (isDeleted) {
            delete cacheData[file.path];
          }
        });
      }
      saveCache(cacheFilePath, cacheData);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getDirectoryStructure(dir, token, ignoreFile = '.scignore') {
  const serpacloudConfigPath = path.join(dir, 'serpacloud.json');
  const serpacloudConfig = JSON.parse(fs.readFileSync(serpacloudConfigPath, 'utf-8'));

  const userData = await fetch('https://serpa.cloud/api/session', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  const userId = userData?.data?.id;
  if (!userId) throw new Error('User forbidden');

  const { projectId, service } = serpacloudConfig;

  if (!projectId) throw new Error('Project ID Missing');
  if (!service) throw new Error('Service Missing');

  const ignoreList = await getIgnoreList(path.join(dir, ignoreFile), path.join(dir, '.gitignore'));
  const result = {};
  const cacheFilePath = path.join(dir, 'serpacloudManifest.json');
  const cacheData = loadCache(cacheFilePath);
  const filesBatch = new Set();
  const filesToDeleteBatch = new Set();

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
        const isTextUTF = isUtf8(fullPath);

        if (!isTextUTF) {
          continue;
        }

        const content = await readFile(fullPath, 'utf-8');
        const fileHash = generateFileHash(content);
        const pathHash = generatePathHash(userId, projectId, service, relativePath);
        const isInCache = !!cacheData[relativePath];

        if (
          !isInCache ||
          cacheData[relativePath].hash !== fileHash ||
          cacheData[relativePath].uuid !== pathHash ||
          forceRefresh
        ) {
          filesBatch.add({
            userId,
            service,
            projectId,
            path: relativePath,
            uuid: pathHash,
            hash: fileHash,
            content,
          });

          if (filesBatch.size === 8) {
            await sendBatch(Array.from(filesBatch), cacheData, cacheFilePath, token);
            filesBatch.clear();
            await new Promise((resolve) => setTimeout(resolve, 2500));
          }
        }
        result[relativePath] = cacheData[relativePath];
      }
    }
  }

  await readDirectory(dir);

  if (filesBatch.length > 0) {
    await sendBatch(Array.from(filesBatch), cacheData, cacheFilePath, token);
  }

  for (const file in cacheData) {
    const fullPath = path.join(dir, file);
    const exists = await existsAndIsFile(fullPath);
    if (!exists) {
      filesToDeleteBatch.add(file);
    }
  }

  while (filesToDeleteBatch.size > 0) {
    const batchToDelete = Array.from(filesToDeleteBatch).slice(0, 5);

    filesToDeleteBatch.forEach((path) => {
      if (batchToDelete.includes(path)) {
        filesToDeleteBatch.delete(path);
      }
    });

    await sendBatch(
      batchToDelete.map((path) => ({
        userId,
        service,
        projectId,
        path,
        uuid: cacheData[path]?.uuid,
        toDelete: true,
      })),
      cacheData,
      cacheFilePath,
      token,
      true,
    );
  }

  if (filesBatch.size > 0) {
    await sendBatch(Array.from(filesBatch), cacheData, cacheFilePath, token);
  }

  return result;
}

module.exports = {
  indexProject: getDirectoryStructure,
};
