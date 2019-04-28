import storage from 'electron-json-storage-sync';
import ApiHandler from '../utilities/ApiHandler';
const { parseLog } = require('../electron/logwatch');

export function getPlayers(matchInfo) {
    const match = {};
    if(matchInfo.includes("DOTA_GAMEMODE_CUSTOM")){
      match.gameMode = "Custom";
      return match;
    } else {
      const matchRegex = /([DOTA])\w+/;
      match.gameMode = matchInfo.match(matchRegex)[0];
    }
    const lobbyRegex = /\((Lobby)(.*?)\)/;
    const rawPlayerIds = matchInfo.match(lobbyRegex)[2].split(" ").splice(3);
    match.players = [];
    let curIDRegex = /^(.*?U:1:)/;
    const players = [];
    for (var value of rawPlayerIds) {
      const curID = value.replace(curIDRegex, "");
      players.push(curID.substring(0, curID.length - 1));
    }
    return players;
  };

  export function loadFromServerLog() {
    const dev = false;
    return storage.get('serverLog', function(error, log) {
      if (error) throw error;
      if (log.path) {
        console.log('PATH', log.path);
        const path = Array.isArray(log.path) ? log.path.length[0] : log.path;
        try {
          const parsedData = parseLog(path);
          const players = getPlayers(parsedData[parsedData.length - 1]);
          if (dev) {
            const res = ApiHandler.grabAllPlayerInfo(players);
            console.log('Response', res);
            if(players.length != 10){
              //Render page where they select which teams each person is on. Return a list of the ID's of players on Radiant and Dire
              return true;
            }else{
              //activePlayersData = res;
              return true;
            }
          }
        } catch (error) {
          console.log('NO FILE FOUND', error);
        }
      }
      return false;
    });
  }