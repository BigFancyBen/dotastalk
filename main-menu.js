const { app, Menu, BrowserWindow } = require('electron');
const { showOpenDialog } = require('./serverlog');

module.exports = {
  setMainMenu
};

function setMainMenu(mainWindow) {
  const template = [
    {
      label: "Setup",
      submenu: [
        {
          label: 'Find server_log.txt',
          click() {
            showOpenDialog(mainWindow);
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
