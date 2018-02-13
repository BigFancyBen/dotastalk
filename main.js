const { app, BrowserWindow } = require('electron');
const path = require ('path');
const electron = require('electron');
const { setMainMenu } = require('./main-menu');
const { parseLog } = require('./logwatch');
const { setStorage } = require('./setStorage');
//require('electron-debug')({showDevTools: true});
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
    height: 720,
    icon: path.join(__dirname, 'icon_64x64.png')
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  setMainMenu(mainWindow);
  setStorage(mainWindow);
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
});

ipc.on('newLog', function (event) {
  if(typeof mainWindow.serverLog != "undefined"){
    event.sender.send('updatedMatches', parseLog(mainWindow.serverLog.path));
  }
})
