const { Menu, BrowserWindow } = require('electron');
const { stopWatchmanInstance } = require('./watchman');

function handleContextMenu(event, directoryPath, selectedDirectories, saveSelectedDirectories) {
  const template = [
    {
      label: 'Publicar proyecto en Serpa Cloud',
      click: () => {
        console.log(`Publicar ${directoryPath}`);
        // Aquí puedes agregar la lógica para publicar el directorio
      },
    },
    { type: 'separator' },
    {
      label: 'Eliminar',
      click: () => {
        console.log(`Eliminar ${directoryPath}`);
        // Eliminar el directorio de selectedDirectories
        const index = selectedDirectories.findIndex((dir) => dir.path === directoryPath);
        if (index !== -1) {
          selectedDirectories.splice(index, 1);
          saveSelectedDirectories();
          stopWatchmanInstance(directoryPath);
          // Enviar una señal al proceso de renderizado para actualizar la UI
          event.sender.send('directory-deleted', directoryPath);
        }
      },
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  menu.popup(BrowserWindow.fromWebContents(event.sender));
}

module.exports = { handleContextMenu };
