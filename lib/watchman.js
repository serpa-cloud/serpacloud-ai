const path = require('path');
const { indexProject } = require('./indexProject');

// Mapa para almacenar las instancias de intervalos por directorio
const intervalInstances = new Map();

// Función para iniciar Watchman (simulado con setInterval)
function startWatchman(directoryPath = path.join(__dirname, '..')) {
  // Verificar si ya existe una instancia para el directorio
  if (intervalInstances.has(directoryPath)) {
    console.log(`Intervalo ya está configurado para el directorio: ${directoryPath}`);
    return;
  }

  // Establecer un intervalo de 5000ms para procesar el directorio
  const intervalId = setInterval(async () => {
    const token = await getToken(); // Obtener el token de autenticación
    await indexProject(directoryPath, token);
  }, 5000);

  // Almacenar la referencia al intervalo
  intervalInstances.set(directoryPath, intervalId);
  console.log(`Intervalo configurado para ${directoryPath} cada 5000ms`);
}

// Función para detener Watchman (ahora detiene los intervalos)
function stopWatchman() {
  for (const [directoryPath, intervalId] of intervalInstances.entries()) {
    clearInterval(intervalId);
    console.log(`Intervalo detenido para ${directoryPath}`);
  }

  intervalInstances.clear();
}

// Función para detener una instancia específica de Watchman (ahora detiene un intervalo específico)
function stopWatchmanInstance(directoryPath) {
  const intervalId = intervalInstances.get(directoryPath);
  if (intervalId) {
    clearInterval(intervalId);
    console.log(`Intervalo detenido para ${directoryPath}`);
    intervalInstances.delete(directoryPath);
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
