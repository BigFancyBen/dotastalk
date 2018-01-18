const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');
const storage = require('electron-json-storage');

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
      return;
    }
  });
}
