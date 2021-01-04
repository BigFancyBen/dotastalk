const { app, BrowserWindow } = require('electron');
const path = require ('path');
const electron = require('electron');
const { setMainMenu } = require('./main/main-menu');
const { parseLog } = require('./main/logwatch');
const { setStorage } = require('./main/setStorage');
//require('electron-debug')({showDevTools: true});
const storage = require('electron-json-storage');
const ipc = electron.ipcMain;
var watch = require('node-watch');
var d2gsi = require('dota2-gsi');
var server = new d2gsi({tokens:"dotastalk"});

let mainWindow;
let logPath;
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    resizable: true,
    width: 850,
    'minWidth': 500,
    'minHeight': 600,
    nodeIntegration: true,
    unsafeEval: true,
    height: 925,
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
    } else {
      mainWindow.webContents.send('pickLog');
    }
  })

  ipc.on('updatePlayer', function (event, arg){
    storage.set('currentUser', {player: arg}, function(error) {
      if (error) throw error;
    });
    mainWindow.webContents.send('currentPlayer', arg);
  })

  server.events.on('newclient', function(client) {
      console.log("New client connection, IP address: " + client.ip);
      if (client.auth && client.auth.token) {
          console.log("Auth token: " + client.auth.token);
      } else {
          console.log("No Auth token");
      }
  
      client.on('player:activity', function(activity) {
          if (activity == 'playing') console.log("Game started!");
      });
      client.on('hero:level', function(level) {
          //console.log("Now level " + level);
          mainWindow.webContents.send('levelUp',level);
      });
      // client.on('abilities:ability0:can_cast', function(can_cast) {
      //     if (can_cast) console.log("Ability0 off cooldown!");
      // });
      client.on('hero:magicimmune', function(is_bkbd) {
        mainWindow.webContents.send('bkbOn',is_bkbd);
      });
      client.on('map:clock_time', function(gameTime) {
        mainWindow.webContents.send('gameTime', gameTime);
      });
      client.on('hero:smoked', function(smoked) {
        mainWindow.webContents.send('smokedUp', smoked);
      });
      ipc.on('getGame', function (event, arg){
        console.log(client.gamestate.hero);
      })
    

      
      //map:clock_time
      //player:xpm
      //player:gpm
      //player:name
      //player:commands_issued
      //hero:name
      //hero:id
      //hero:mana_percent
      //hero:smoked
      //Emitting 'map:game_state' - DOTA_GAMERULES_STATE_PRE_GAME
      //player:gold + player:gold_unreliable and hero:buyback_cost
      //hero:level
  });
});
