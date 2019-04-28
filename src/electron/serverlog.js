const { dialog, app } = require('electron');
const storage = require('electron-json-storage-sync');
const { parseLog } = require('./logwatch');
var watch = require('node-watch');
module.exports = {showOpenDialog};

function showOpenDialog(browserWindow) {
  dialog.showOpenDialog(browserWindow, {
    defaultPath: app.getPath('home'),
    filters: [ {name: 'Text Files', extensions: ['txt']} ] //"Text Files" displays on Windows in lower right, but not on Mac
  }, (filepaths) => {
    if(filepaths) {
      storage.set('serverLog', { path: filepaths }, function(error) {
        if (error) throw error;
      });
      storage.getAll(function(error, data) {
        if (error) throw error;
      
        console.log("data from GetAll: ",data);
      });
      browserWindow.webContents.send( 'updatedMatches', parseLog(filepaths[0]));

      watch(filepaths[0], { recursive: true }, function(event, name) {
        browserWindow.webContents.send( 'updatedMatches', parseLog(filepaths[0]));
      });
      return;
    }
  });
}