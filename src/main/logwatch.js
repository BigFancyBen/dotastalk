var readline = require('readline');
var fs = require('fs');


module.exports = {
  parseLog
};

function parseLog(log){
  var lines = fs.readFileSync(log, 'utf-8').split('\n').filter(Boolean);
  let games = [];
  for(i = 0; i <lines.length; i++){
    if(lines[i].includes("] (Lobby ") && !(lines[i].includes("CUSTOM"))){
      games.push(lines[i]);
    }
  }
  let newestGame = games[games.length -1 ];
  let match = {};
  if(newestGame.includes("DOTA_GAMEMODE_CUSTOM")){
    match.gameMode = "Custom";
    return match;
  } else {
    matchRegex = /([DOTA])\w+/;
    match.gameMode = newestGame.match(matchRegex)[0];
  }
  lobbyRegex = /\((Lobby)(.*?)\)/;
  playerIDs = newestGame.match(lobbyRegex)[2].split(" ").splice(3);

  let playersArray = [];
  let curIDRegex = /^(.*?U:1:)/;
  for (var value of playerIDs) {
    let player = {};
    player.slot = value.charAt(0);
    curID= value.replace(curIDRegex, "");
    curID = curID.substr(0, curID.length - 1);
    player.id=(curID);
    playersArray.push(player);
  }
  return playersArray;

}
