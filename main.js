const { app, BrowserWindow } = require('electron');
const path = require ('path');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    resizable: false,
    width: 810,
    height: 740,
    autoHideMenuBar: true

  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
});
