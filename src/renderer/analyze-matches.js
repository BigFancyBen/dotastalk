const { fpGraph } = require('./fp-graphs.js');
const { getHeroByID } = require('./heroes.js');
module.exports = {analyzeMatches};


function analyzeMatches(matchData) {
 //Sort by most played heroes by matchData.heroes.matchCount
 //pick the most played 3 and return those 
 //Create role type string from summary numbers

 if (matchData == "") {
  playerStats = {};
  playerStats.wins = "??";
  playerStats.losses = "??";
  playerStats.ptype = "Unknown";
  playerStats.cardBg = "card-bg-yellow.jpg"

  return playerStats;
 }
 let heroArray = [];
 if(matchData.heroes) {
  heroArray = (matchData.heroes.sort((a, b) => b.matchCount - a.matchCount)).slice(0, 3);
 }
 let topHeroes = [];

 heroArray.forEach(function(hero){
  heroStats = {};
  heroStats.heroData = getHeroByID(hero.heroId);
  heroStats.wins = hero.winCount;
  heroStats.losses = hero.matchCount - hero.winCount;
  heroStats.lanes = hero.lanes;
  heroStats.roles = hero.roles;
  topHeroes.push(heroStats);
 });

  function checkLanes(curLane) {
    if (curLane != 0){
      return curLane.matchCount;
    } else {
      return 0;
    }
  }

  let playerLanes = {};
  if(matchData.lanes){
    playerLanes.roam = checkLanes(matchData.lanes.find(x => x.lane == 0)|| 0);
    playerLanes.safe = checkLanes(matchData.lanes.find(x => x.lane == 1)|| 0);
    playerLanes.mid = checkLanes(matchData.lanes.find(x => x.lane == 2)|| 0);
    playerLanes.off = checkLanes(matchData.lanes.find(x => x.lane == 3)|| 0);
  }
  
  let playerType = "";
  let cardBg= "card-bg-yellow.jpg";

  if(playerLanes.off/matchData.matchCount >= .55){
    playerType += "Offlane ";
    cardBg = "card-bg-green.jpg";
  }
  if(playerLanes.safe/matchData.matchCount >= .55){
    playerType += "Safelane ";
    cardBg = "card-bg-blue.jpg";
  }
  if(playerLanes.mid/matchData.matchCount >= .55){
    playerType += "Mid ";
    cardBg = "card-bg-red.jpg";
  } else {
    if(matchData.coreCount/matchData.matchCount >= .6){
      playerType += "Core ";
      cardBg = "card-bg-red.jpg";
    }
  }
  if(matchData.supportCount/matchData.matchCount >= .6){
    playerType += "Support ";
    cardBg = "card-bg-green.jpg";
  }
  
  if(Object.keys(playerLanes).length == 0 && topHeroes.length == 0){
    playerType +="Unknown";
    cardBg = "card-bg-unknown.jpg";
  }

  if(playerType == ""){
    playerType +="Flex";
    cardBg = "card-bg-blue.jpg";
  }
  if(topHeroes[0]){
    if((topHeroes[0].wins + topHeroes[0].losses)/matchData.matchCount > .4){
      playerType += topHeroes[0].heroData.name + " Main";
    }
  }

  playerStats = {};
  playerStats.ptype = playerType;
  playerStats.wins = matchData.winCount || "??";
  playerStats.losses = matchData.lossCount || "??";
  playerStats.cardBg = cardBg;
  playerStats.lanes = playerLanes;
  playerStats.support = matchData.supportCount;
  playerStats.core = matchData.coreCount;
  playerStats.heroes = topHeroes;


  return playerStats;
}
