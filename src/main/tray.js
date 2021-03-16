const { app, Menu, BrowserWindow, Tray } = require('electron');
const { showOpenDialog } = require('./serverlog');
const path = require ('path');

module.exports = {
    setTray
  };
  
function setTray(mainWindow) {
  let tray = null
  app.whenReady().then(() => {
    tray = new Tray(path.join(__dirname, '../assets/images/icon_64x64.png'));
    let contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show DotaStalk',
        click() {
          mainWindow.transparent = true;
          mainWindow.alwaysOnTop = true,
          mainWindow.show();
        }
      },
      {
        label: 'Minimize',
        click() {
          mainWindow.hide();
        }
      },
      {
        label: 'Quit', click:  () => {
          app.isQuiting = true;
          app.quit();
        }
      },
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
      ]}
    ]);
    tray.setToolTip('DotaStalk');
    tray.setContextMenu(contextMenu);
    tray.on('right-click', () => {
      tray.popUpContextMenu();
    })
    tray.on('click', () => {
      mainWindow.transparent = true;
      mainWindow.alwaysOnTop = true,
      mainWindow.show();
    });
  }).catch(
    console.log("tray error")
  )
}