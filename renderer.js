var electron = require('electron');

let match = "0:[U:1:184041598] 1:[U:1:25526493] 2:[U:1:49697106] 3:[U:1:34782480] 4:[U:1:50909919] 5:[U:1:123328198] 6:[U:1:136058418] 7:[U:1:102597362] 8:[U:1:175791687] 9:[U:1:215584294]";
lobbyPlayers(match);

const RANKS = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine"];
const NO_AVATAR_IMG = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

function getPlayer(playerID, side){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.opendota.com/api/players/" + playerID, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        buildPlayer(xhr.responseText, side);
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
}

function buildPlayer(playerObj, side) {
  playerObj = JSON.parse(playerObj);
  let player = document.createElement('div');
  let playerName = document.createElement('div');
  let playerRank = document.createElement('div');
  var playerAvatar = document.createElement("img");
  var playerRankIcon = document.createElement("img");
  var playerRankStars = document.createElement("img");
  let rankStuff;
  player.className = 'player';
  playerName.className = 'player-name';
  playerRank.className = 'player-rank';
  playerAvatar.className = 'player-avatar';
  playerRankIcon.className = 'player-rank-icon';
  playerRankStars.className = 'player-rank-stars';

  if (playerObj.profile != null ) {
    playerName.innerHTML = playerObj.profile.personaname;
    if (playerObj.profile.avatarfull != null){
      playerAvatar.src = playerObj.profile.avatarfull;
    } else {
      playerName.innerHTML = "Unknown";
      playerAvatar.src = NO_AVATAR_IMG;
    }
  } else {
    playerName.innerHTML = "Unknown";
    playerAvatar.src = NO_AVATAR_IMG;
  }

  if (playerObj.rank_tier != null ) {
    rankStuff = getRank(playerObj.rank_tier);
    if(playerObj.leaderboard_rank != null) {
      playerRank.innerHTML = "Rank: " + playerObj.leaderboard_rank;
    } else {
      playerRank.innerHTML = rankStuff[0];
    }
    playerRankIcon.src = "./assets/images/rank_icons/" + rankStuff[1];
    if (rankStuff[2] != 0 ){
      playerRankStars.src = "./assets/images/rank_icons/" + rankStuff[2];
    }
  } else {
    playerRank.innerHTML = "Unranked";
    playerRankIcon.src = "./assets/images/rank_icons/rank_icon_0.png";
  }

  player.appendChild(playerAvatar);
  player.appendChild(playerName);
  player.appendChild(playerRank);
  player.appendChild(playerRankIcon);
  player.appendChild(playerRankStars);
  document.getElementById(side).appendChild(player);
}


function lobbyPlayers(playerIDs){
  players = playerIDs.split("[U:1:");
  players.shift();
  for (var value of players) {
    x = value.split("]");
    curID = x[0];
    curSlot = x[1].charAt(1);
    if(curSlot < 5) {
      getPlayer(curID, "radiant");
    } else {
      getPlayer(curID, "dire");
    }
  }
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
