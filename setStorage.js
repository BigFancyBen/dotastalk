const electron = require('electron');
const storage = require('electron-json-storage');
const ipc = electron.ipcMain;
const { parseLog } = require('./logwatch');
var watch = require('node-watch');

module.exports = {setStorage};

function setStorage(mainWindow) {
  storage.get('serverLog', function(error, data) {
    if (error){ throw error;}
    if(data.hasOwnProperty("path")){
      mainWindow.serverLog = {
        'path': data.path[0]
      };
    }
    if(typeof mainWindow.serverLog != "undefined"){
      watch(mainWindow.serverLog.path, { recursive: true }, function(event, name) {
        mainWindow.webContents.send( 'updatedMatches', parseLog(mainWindow.serverLog.path));
      });
    }
  });
}
