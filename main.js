const { app, BrowserWindow } = require('electron');
const path = require ('path');
const { setMainMenu } = require('./main-menu');
require('electron-debug')({showDevTools: true});
const storage = require('electron-json-storage');

let mainWindow;
let logPath;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    resizable: false,
    width: 810,
    height: 760
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  setMainMenu(mainWindow);
  storage.get('serverLog', function(error, data) {
    if (error) throw error;
    mainWindow.serverLog = {
      'path': data.path[0]
    };
  });
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
});
