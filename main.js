const { app, BrowserWindow } = require('electron');
const path = require ('path');
const electron = require('electron');
const { setMainMenu } = require('./main-menu');
const { parseLog } = require('./logwatch');
require('electron-debug')({showDevTools: true});
const storage = require('electron-json-storage');
const ipc = electron.ipcMain;
var watch = require('node-watch');

let mainWindow;
let logPath;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    resizable: true,
    width: 1000,
    height: 900
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  setMainMenu(mainWindow);
  storage.get('serverLog', function(error, data) {
    if (error) throw error;
    mainWindow.serverLog = {
      'path': data.path[0]
    };
    watch(mainWindow.serverLog.path, { recursive: true }, function(evt, name) {
      event.sender.send('updatedMatches', parseLog(mainWindow.serverLog.path));
    });
  });
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
});

ipc.on('newLog', function (event) {
  event.sender.send('updatedMatches', parseLog(mainWindow.serverLog.path));
})
