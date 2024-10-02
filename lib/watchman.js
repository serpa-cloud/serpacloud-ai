const watchman = require('fb-watchman');
const path = require('path');
const { indexProject } = require('./indexProject');

// Mapa para almacenar las instancias de watch y subscription por directorio
const watchmanInstances = new Map();

// Ruta al archivo .scignore
const ignoreFilePath = path.join(__dirname, '..', '.scignore');

// Leer los patrones de ignorados desde el archivo .scignore
const ignorePatterns = require('fs')
  .readFileSync(ignoreFilePath, 'utf-8')
  .split('\n')
  .filter((line) => line.trim() !== '');

// Función para iniciar Watchman
function startWatchman(directoryPath = path.join(__dirname, '..')) {
  // Verificar si ya existe una instancia para el directorio
  if (watchmanInstances.has(directoryPath)) {
    console.log(`Watchman ya está instanciado para el directorio: ${directoryPath}`);
    return;
  }

  const client = new watchman.Client();

  client.capabilityCheck({ required: ['relative_root'] }, (error, resp) => {
    if (error) {
      console.error('Error en capabilityCheck:', error);
      return;
    }

    client.command(['watch-project', directoryPath], (error, resp) => {
      if (error) {
        console.error('Error en watch-project:', error);
        return;
      }

      const watch = resp.watch;
      const relativePath = resp.relative_path || '';

      const sub = {
        expression: [
          'allof',
          ['type', 'f'], // Solo archivos
          // Solo archivos
          ['not', ['dirname', 'node_modules']],
          ['not', ['dirname', '.git']],
        ],
        fields: ['name', 'size', 'mtime_ms', 'exists', 'type'],
        relative_root: relativePath,
      };

      client.command(['subscribe', watch, 'file-change-subscription', sub], (error, resp) => {
        if (error) {
          console.error('Error en subscribe:', error);
          return;
        }
        const subscription = resp.subscription;
        watchmanInstances.set(directoryPath, { client, watch, subscription });
        console.log(`Suscripción a Watchman configurada para ${directoryPath}:`, resp);
      });
    });
  });

  client.on('subscription', async (resp) => {
    if (resp.subscription !== 'file-change-subscription') return;

    const token = await getToken(); // Obtener el token de autenticación
    await indexProject(directoryPath, token);

    console.log('Todos los archivos han sido procesados.');
  });
}

// Función para detener Watchman
function stopWatchman() {
  for (const { client, watch, subscription } of watchmanInstances.values()) {
    if (subscription) {
      client.command(['unsubscribe', watch, 'file-change-subscription'], (error, resp) => {
        if (error) {
          console.error('Error en unsubscribe:', error);
          return;
        }
        console.log('Suscripción a Watchman cancelada:', resp);
      });
    }

    client.end();
  }

  watchmanInstances.clear();
}

// Función para detener una instancia específica de Watchman
function stopWatchmanInstance(directoryPath) {
  const instance = watchmanInstances.get(directoryPath);
  if (instance) {
    const { client, watch, subscription } = instance;
    if (subscription) {
      client.command(['unsubscribe', watch, 'file-change-subscription'], (error, resp) => {
        if (error) {
          console.error('Error en unsubscribe:', error);
          return;
        }
        console.log(`Suscripción a Watchman cancelada para ${directoryPath}:`, resp);
      });
    }

    client.end();
    watchmanInstances.delete(directoryPath);
  }
}

async function getToken() {
  const { session } = require('electron');
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
  return token;
}

module.exports = {
  startWatchman,
  stopWatchman,
  stopWatchmanInstance,
};
