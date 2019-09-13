var electron = require('electron');
const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;
const shell = require('electron').shell;
const { buildFeaturedHtml } = require('./featured-player.js');
const { getHeroByID } = require('./heroes.js');
const { analyzeMatches } = require('./analyze-matches.js');
const { buildPlayerIcons } = require('./player-icons.js');
const { pickSides } = require('./pick-sides.js');


const RANKS = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine"];
const NO_AVATAR_IMG = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

window.onload = function(){
  ipc.send('newLog');
  document.getElementById("reset").onclick = function(){resetGame()};
};

function resetGame(){
  localStorage.removeItem("lastMatch");
  localStorage.removeItem("lastMatchData");
  location.reload();
}

ipc.on('currentPlayer', function(event, playerID) {
  localStorage.setItem("activePlayer", playerID);
});

ipc.on('updatedMatches', function (event, playerArray) {
  buildMatch(playerArray);
})

ipc.on('selectPlayer', function(event){
  var players = document.getElementsByClassName("player");
  for (var i = 0; i < players.length; i++) {
    players[i].addEventListener('click', selectUser, false);
    players[i].removeEventListener('click', showFeature, false);
    players[i].removeEventListener('click', pickableTeams, false);
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
    players[i].classList.remove("currently-featured");
  }
  curCard = "featured-player-" + playerID;
  cur = document.getElementById(curCard);
  if (cur != null) {
    cur.classList.add("currently-featured");
  }
}

function buildPlayerCard (data) {
  if (data.id != undefined) {
    data.playerStats = analyzeMatches(data.matches);
    fp = document.createElement("div");
    fp.setAttribute('class', 'featured-outer');
    fp.id = "featured-player-" + data.id;
    fp.onclick = function() {shell.openExternal("https://www.opendota.com/players/" + data.id)};
    fp.innerHTML = buildFeaturedHtml(data);
    let cardWrapper = document.getElementsByClassName("card-wrapper")[0];
    cardWrapper.appendChild(fp);
  }
}

function clickToShowPlayer() {
  var players = document.getElementsByClassName("player");
  for (var i = 0; i < players.length; i++) {
    players[i].addEventListener("click", showFeature);
    players[i].removeEventListener('click', selectUser, false);
    players[i].removeEventListener('click', pickableTeams, false);
    players[i].classList.remove("fade-out");
  }
}

function buildMatch(playerArray) {
  //make api calls to get data for all players
  let match = [];
  let side = playerArray.find(x => x.id == localStorage.getItem("activePlayer")).slot>=5 ? false : true;

  //"cache" the most recent match;
  if (playerArray == localStorage.getItem("lastMatch") && localStorage.getItem("lastMatchData")){
    document.getElementsByTagName("BODY")[0].innerHTML = localStorage.getItem("lastMatchData");
    console.log("cached html");
    document.getElementById("reset").onclick = function(){resetGame()};
    clickToShowPlayer();
  } else {
    localStorage.setItem("lastMatch" , playerArray);
    for (var value of playerArray) {
      getPlayer(value.id, value.slot, side).then((data) => {
        match.push(data);
        if (match.length == playerArray.length) {
          if (match.length > 10) {
            var html = pickSides(match);
            document.getElementById("game").innerHTML = html;
            pickTeamsClicks();
          } else {
            var html = buildPlayerIcons(match.sort((a, b) => a.slot - b.slot));
            document.getElementById("game").innerHTML = html;
            localStorage.setItem("lastMatchData" , document.getElementsByTagName("BODY")[0].innerHTML);
            clickToShowPlayer();
          }
        }
      })
    }
  }
}

function pickTeamsClicks(){
  var players = document.getElementsByClassName("player");
  for (var i = 0; i < players.length; i++) {
    players[i].addEventListener("click", pickableTeams);
    players[i].removeEventListener('click', selectUser, false);
    players[i].removeEventListener('click', showFeature, false);
    players[i].classList.remove("fade-out");
  }
  document.getElementsByClassName("card-wrapper")[0].innerHTML = "";
  let trashCans = document.getElementsByClassName("trash-icon");
  Array.from(trashCans).forEach((element) => {
    element.addEventListener('click', deleteElement, false);
  });
}

function pickableTeams(){
  let dire = document.getElementById("dire");
  let radiant = document.getElementById("radiant");
  if (this.parentNode && this.parentNode.id == "dire"){
    radiant.appendChild(this);
  } else if (this.parentNode && this.parentNode.id == "radiant") {
    dire.appendChild(this);
  }
  checkTeams();
}

function deleteElement(){
  if(this.parentNode){
    this.parentNode.remove();
  }
  checkTeams();
}

function checkTeams(){
  let dire = document.getElementById("dire");
  let radiant = document.getElementById("radiant");
  let submitTeams = document.getElementById("accept-teams-button");
  if(dire.childElementCount == 6 && radiant.childElementCount == 6){
    submitTeams.classList.remove("not-ready");
    submitTeams.addEventListener("click", rebuildTeam);
  } else {
    submitTeams.classList.add("not-ready");
    submitTeams.removeEventListener("click", rebuildTeam, false);
  }
}

function rebuildTeam(){
  let dire = document.getElementById("dire");
  let radiant = document.getElementById("radiant");
  document.getElementById("game").innerHTML = '<div class="loading-animation"><div></div><div></div><div></div></div>';
  playerIdArray =[];

  Array.from(radiant.childNodes).forEach(function (element) {
    if(element.id){
      let curPlayer = {};
      curPlayer.id = element.id;
      playerIdArray.push(curPlayer);
    }
  });

  Array.from(dire.childNodes).forEach(function (element) {
    if(element.id){
      let curPlayer = {};
      curPlayer.id = element.id;
      playerIdArray.push(curPlayer);
    }
  });

  playerIdArray.forEach(function(value, i){
    playerIdArray[i].slot = i;
  });

  buildMatch(playerIdArray);
}

function getPlayer(playerID, slot, side) {
  let activePlayer = localStorage.getItem("activePlayer");
  if(activePlayer != "" && playerID != undefined) {
    if((side && slot >= 5) || (!side && slot < 5)){
      var apiRequest1 = fetch(`https://api.opendota.com/api/players/${activePlayer}/wl?against_account_id=${playerID}`).then(function(response){
          return response.json()
      });
    } else if ((side && slot < 5) || (!side && slot >=5)) {
      var apiRequest1 = fetch(`https://api.opendota.com/api/players/${activePlayer}/wl?with_account_id=${playerID}`).then(function(response){
          return response.json()
      });
    }
    var apiRequest2 = fetch(`https://api.stratz.com/api/v1/player/${playerID}/behaviorChart?take=100`).then(function(response){
        if( response.ok){
          return response.json()
        } else {
          return "";
        }
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
  playerData.slot = slotNum;

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
      if (playerObj.mmr_estimate != undefined && playerObj.mmr_estimate.estimate != undefined  ){
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
