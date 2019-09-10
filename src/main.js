const { app, BrowserWindow } = require('electron');
const path = require ('path');
const electron = require('electron');
const { setMainMenu } = require('./main/main-menu');
const { parseLog } = require('./main/logwatch');
const { setStorage } = require('./main/setStorage');
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
    width: 850,
    nodeIntegration: true,
    unsafeEval: true,
    height: 850,
    icon: path.join(__dirname, 'assets/images/icon_64x64.png')
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  setMainMenu(mainWindow);
  setStorage(mainWindow);
  mainWindow.on('ready-to-show', () => {
    storage.get('currentUser', function(error, data) {
      if (error){ throw error;}
      if(data.hasOwnProperty("player")){
        mainWindow.webContents.send('currentPlayer', data.player);
      }
    });
    mainWindow.show();
  });
  mainWindow.on('closed', () => {
    app.quit();
  });

  ipc.on('newLog', function (event) {
    storage.get('currentUser', function(error, data) {
      if (error){ throw error;}
      if(data.hasOwnProperty("player")){
        mainWindow.webContents.send('currentPlayer', data.player);
      }
    });
    if(typeof mainWindow.serverLog != "undefined"){
      event.sender.send('updatedMatches', parseLog(mainWindow.serverLog.path));
    }
  })

  ipc.on('updatePlayer', function (event, arg){
    storage.set('currentUser', {player: arg}, function(error) {
      if (error) throw error;
    });
    mainWindow.webContents.send('currentPlayer', arg);
  })
});
