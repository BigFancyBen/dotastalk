var electron = require('electron');
const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;

document.getElementById("reset").onclick = function() {resetGame()};

const RANKS = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine"];
const NO_AVATAR_IMG = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

resetGame();

function resetGame(){
  ipc.send('newLog');
}

ipc.on('updatedMatches', function (event, games) {
  buildMatch(games[games.length - 1]);
})

function buildMatch(matchInfo) {
  //make api calls to get data for all players
  //build match object to return
  let match = {};
  if(matchInfo.includes("DOTA_GAMEMODE_CUSTOM")){
    match.gameMode = "Custom";
  } else {
    matchRegex = /([DOTA])\w+/;
    match.gameMode = matchInfo.match(matchRegex)[0];
  }
  lobbyRegex = /\((Lobby)(.*?)\)/;
  playerIDs = matchInfo.match(lobbyRegex)[2].split(" ").splice(3);
  match.players = [];
  for (var value of playerIDs) {
    curID= value.substr(7);
    curID = curID.substr(0, curID.length - 1);
    curSlot = value.charAt(0);
    // getPlayer(curID, curSlot, function(results) {
    //   match.players.push(results);

    // });
    getPlayer(curID, curSlot).then((data) => {
      match.players.push(data);
      if (match.players.length > 9) {
        //console.log(match);
        console.log(JSON.stringify(match));
        //match.players.map(console.log)
      }
    })
  }
}

function getPlayer(playerID, slot) {
  return window.fetch(`https://api.opendota.com/api/players/${playerID}`, {method: 'get'})
      .then((response) => response.json())
      .then((data) => buildPlayer(data, slot))
}

// function getPlayer(playerID, slot, callback){
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "https://api.opendota.com/api/players/" + playerID, true);
//   xhr.onload = function (e) {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         callback(buildPlayer(xhr.responseText, slot));
//       } else {
//         console.error(xhr.statusText);
//       }
//     }
//   };
//   xhr.onerror = function (e) {
//     console.error(xhr.statusText);
//   };
//   xhr.send(null);
// }

function buildPlayer(playerInfo, slotNum){
  playerObj = playerInfo;
  let rankStuff;
  let playerData = {};
  playerData.name = "Unknown";
  playerData.avatar = NO_AVATAR_IMG;

    if (playerObj.profile != null ) {
      playerData.name = playerObj.profile.personaname;
      if (playerObj.profile.avatarfull != null){
        playerData.avatar = playerObj.profile.avatarfull;
      }
    }
    if (playerObj.rank_tier != null ) {
      rankStuff = getRank(playerObj.rank_tier);
      if(playerObj.leaderboard_rank != null) {
        playerData.rank = "Rank: " + playerObj.leaderboard_rank;
      } else {
        playerData.rank = rankStuff[0];
      }
      playerData.rank_icon = "./assets/images/rank_icons/" + rankStuff[1];
      if (rankStuff[2] != 0 ){
        playerData.rank_stars = "./assets/images/rank_icons/" + rankStuff[2];
      }
    } else {
      playerData.rank = "Unranked";
      playerData.rank_icon = "./assets/images/rank_icons/rank_icon_0.png";
    }

    playerData.side = (slotNum < 5 ) ? 'Radiant' : "Dire";
    return playerData;
}

function getRank(rankNum){
  tier = parseInt(rankNum.toString().charAt(0));
  stars = parseInt(rankNum.toString().charAt(1));
  let rank = [];
  rank[0] = RANKS[tier-1] + " " + stars;
  rank[1] = "rank_icon_" + tier + ".png";
  if (stars != 0) {
    rank[2] = "rank_star_" + stars + ".png";
  } else {
    rank[2] = 0;
  }

  return rank;
}
