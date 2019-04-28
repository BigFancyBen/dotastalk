const { Menu } = require('electron');
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
        },
        {
          label: 'Where is server_log.txt?',
          click() {
            require('electron').shell.openExternal('https://github.com/BigFancyBen/dotastalk/wiki/Where-to-find-the-server_log.txt');
          }
        },
        {
          label: 'Which player are you?',
          click() {
            mainWindow.webContents.send('selectPlayer');
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}