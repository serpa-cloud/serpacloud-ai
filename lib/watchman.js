const watchman = require('fb-watchman');
const path = require('path');
const { handleFileChange } = require('./fileChangeHandler');

const client = new watchman.Client();
let watch = null;
let subscription = null;

// Ruta al archivo .scignore
const ignoreFilePath = path.join(__dirname, '..', '.scignore');

// Leer los patrones de ignorados desde el archivo .scignore
const ignorePatterns = require('fs')
  .readFileSync(ignoreFilePath, 'utf-8')
  .split('\n')
  .filter((line) => line.trim() !== '');

// Función para iniciar Watchman
function startWatchman() {
  client.capabilityCheck({ required: ['relative_root'] }, (error, resp) => {
    if (error) {
      console.error('Error en capabilityCheck:', error);
      return;
    }

    client.command(['watch-project', path.join(__dirname, '..')], (error, resp) => {
      if (error) {
        console.error('Error en watch-project:', error);
        return;
      }

      watch = resp.watch;
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
        subscription = resp.subscription;
        console.log('Suscripción a Watchman configurada:', resp);
      });
    });
  });

  client.on('subscription', async (resp) => {
    if (resp.subscription !== 'file-change-subscription') return;

    for (const file of resp.files) {
      const filePath = path.join(__dirname, '..', file.name);
      await handleFileChange(filePath);
    }

    console.log('Todos los archivos han sido procesados.');
  });
}

// Función para detener Watchman
function stopWatchman() {
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

module.exports = {
  startWatchman,
  stopWatchman,
};
