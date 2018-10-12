var electron = require('electron');
const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;
const Handlebars = require('handlebars');
var template = Handlebars.compile(document.getElementById("teams-overview").innerHTML);
document.getElementById("reset").onclick = function() {resetGame()};
const shell = require('electron').shell;
const { buildFeaturedHtml } = require('./featured-player.js');

const RANKS = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine"];
const NO_AVATAR_IMG = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

resetGame();

function resetGame(){
  ipc.send('newLog');
}

ipc.on('currentPlayer', function(event, playerID) {
  localStorage.setItem("activePlayer", playerID);
});

ipc.on('updatedMatches', function (event, games) {
  buildMatch(games[games.length - 1]);
})

ipc.on('selectPlayer', function(event){
  var players = document.getElementsByClassName("player");
  for (var i = 0; i < players.length; i++) {
    players[i].addEventListener('click', selectUser, false);
    players[i].removeEventListener('click', showFeature, false);
    players[i].classList.add("fade-out");
  }
})

function selectUser(){
  ipc.send('updatePlayer', this.id);
  clickToShowPlayer();
}

function showFeature(){
  playerID = this.id;
  var players = document.getElementsByClassName("featured-outer");
  for (var i = 0; i < players.length; i++) {
    players[i].setAttribute("style", "opacity: 0; display: none;");
  }
  curCard = "featured-player-" + playerID;
  cur = document.getElementById(curCard);
  if (cur != null) {
    cur.setAttribute("style", "opacity: 1; display: block;");
  }
}

function buildPlayerCard (data) {
  if (data.id != undefined) {
    data.playerStats = analyzeMatches(data.matches);
    fp = document.createElement("div");
    fp.setAttribute('class', 'featured-outer');
    fp.style.opacity = 0;
    fp.style.display = "none";
    fp.id = "featured-player-" + data.id;
    fp.onclick = function() {shell.openExternal("https://www.opendota.com/players/" + data.id)};
    fp.innerHTML = buildFeaturedHtml(data);
    document.body.appendChild(fp);
  }
}

function analyzeMatches(matchData) {
  //lane, role, win-loss, hero-id
  let counts = {}
  counts.support = 0;
  counts.core = 0;
  counts.mid = 0;
  counts.safelane = 0;
  counts.offlane = 0;
  counts.wins = 0;

  matchData.forEach(function (match){
    if(match.player_slot >= 128 && match.radiant_win == false) {
      counts.wins++;
    }
    if(match.player_slot < 128 && match.radiant_win == true) {
      counts.wins++;
    }
    if(match.lane == 1) {
      if(match.player_slot >= 128) {
        counts.offlane ++;
      }else {
        counts.safelane++;
      }
    }
    if(match.lane == 3) {
      if(match.player_slot >= 128) {
        counts.safelane ++;
      }else {
        counts.offlane++;
      }
    }

    if(match.lane_role == 1) {
      counts.core++;
    }
    if(match.lane_role == 2) {
      counts.mid++;
    }
    if(match.lane_role == 3) {
      counts.support++;
    }
  });
  let playerType = "";
  let cardBg = "";
  if(counts.mid >= 10){
    playerType += "Mid ";
    cardBg = "card-bg-red.jpg";
  }
  if(counts.offlane >= 10){
    playerType += "Offlane ";
    cardBg = "card-bg-green.jpg";
  }
  if(counts.safelane >= 10){
    playerType += "Safelane ";
    cardBg = "card-bg-blue.jpg";
  }
  if(counts.support >= 12){
    playerType += "Support ";
    // + Math.floor((counts.support / 20)*100) + "%"
    cardBg = "card-bg-white.jpg";
  }
  if(counts.roaming >= 12){
    playerType += "Roamer";
  }
  if(counts.core >= 12){
    playerType += "Core";
  }
  if(playerType == ""){
    playerType +="Flex";
    cardBg = "card-bg-yellow.jpg";
  }
  playerStats = {};
  playerStats.ptype = playerType;
  playerStats.wins = counts.wins;
  playerStats.losses = 20 - counts.wins;
  playerStats.cardBg = cardBg;

  return playerStats;
}

function clickToShowPlayer() {
  var players = document.getElementsByClassName("player");
  for (var i = 0; i < players.length; i++) {
    players[i].addEventListener("click", showFeature);
    players[i].removeEventListener('click', selectUser, false);
    players[i].classList.remove("fade-out");
  }
}

function buildMatch(matchInfo) {
  //make api calls to get data for all players
  //build match object to return
  let match = {};
  if(matchInfo.includes("DOTA_GAMEMODE_CUSTOM")){
    match.gameMode = "Custom";
    return match;
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
    getPlayer(curID, curSlot).then((data) => {
      match.players.push(data);
      if (match.players.length > 9) {
        var html = template(match);
        document.getElementById("game").innerHTML = html;
        clickToShowPlayer();
      }
    })
  }
}

function getPlayer(playerID, slot) {
  let activePlayer = localStorage.getItem("activePlayer");
  if(activePlayer != "" && playerID != undefined) {
    var apiRequest1 = fetch(`https://api.opendota.com/api/players/${activePlayer}/wl?included_account_id=${playerID}`).then(function(response){
        return response.json()
    });
    var apiRequest2 = fetch(`https://api.opendota.com/api/players/${playerID}/recentMatches?significant=0`).then(function(response){
        return response.json()
    });
    var apiRequest3 = fetch(`https://api.opendota.com/api/players/${playerID}`).then(function(response){
        return response.json()
    });

    return Promise.all([apiRequest1,apiRequest2,apiRequest3]).then(function(values){
      namedObj = {};
      namedObj["wl"] = values[0]
      namedObj["matches"] = values[1]
      namedObj["player"] = values[2]
      return buildPlayer(namedObj, slot);
    });
  }
}

function buildPlayer(playerInfo, slotNum){
  let rankStuff;
  let playerData = {};
  playerData.wl = playerInfo["wl"];
  playerData.matches= playerInfo["matches"];
  playerObj = playerInfo["player"];
  playerData.name = "Unknown";
  playerData.avatar = NO_AVATAR_IMG;

    if (playerObj.profile != null ) {
      playerData.name = playerObj.profile.personaname;
      playerData.id = playerObj.profile.account_id;
      if (playerObj.profile.avatarfull != null){
        playerData.avatar = playerObj.profile.avatarfull;
      }
    }
    if (playerObj.rank_tier != null ) {
      rankStuff = getRank(playerObj.rank_tier);
      if(playerObj.leaderboard_rank != null) {
        playerData.rank = playerObj.leaderboard_rank;
      }
      playerData.rank_icon = "./assets/images/rank_icons/" + rankStuff[1];
      if (rankStuff[2] != 0 ){
        playerData.rank_stars = "./assets/images/rank_icons/" + rankStuff[2];
      }
    } else {
      if (playerObj.mmr_estimate.estimate != undefined ){
        playerData.rank = "~" + playerObj.mmr_estimate.estimate +  " MMR";
      }
      playerData.rank_icon = "./assets/images/rank_icons/rank_icon_0.png";
    }

    playerData.side = (slotNum < 5 ) ? true : false;
    buildPlayerCard(playerData);
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
