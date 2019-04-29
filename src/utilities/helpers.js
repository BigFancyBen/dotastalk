import storage from 'electron-json-storage';
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
    storage.get('serverLog', function(error, log) {
      if (error) throw error;
      if (log.path) {
        const path = log.path[0];
        try {
          const parsedData = parseLog(path);
          const players = getPlayers(parsedData[parsedData.length - 1]);
          const activePlayers = [];
          if (dev) {
            const playerResult = ApiHandler.grabAllPlayerInfo(players);
            console.log('Response', playerResult);
            if(players.length != 10){
              //Render page where they select which teams each person is on. Return a list of the ID's of players on Radiant and Dire
            }else{
              activePlayers = players; 
            }

            const winLoss = ApiHandler.winLoss(activePlayers);
            const matches = ApiHandler.matches(activePlayers);
          }
        } catch (error) {
          console.log('NO FILE FOUND', error);
        }
      }
    });
  }