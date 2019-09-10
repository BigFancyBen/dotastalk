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

 let heroArray = (matchData.heroes.sort((a, b) => b.matchCount - a.matchCount)).slice(0, 3);
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
  
  let playerLanes = {};
    //playerLanes.roam = matchData.lanes.find(x => x.lane == 0).matchCount;
  playerLanes.safe = matchData.lanes.find(x => x.lane == 1).matchCount;
  playerLanes.mid = matchData.lanes.find(x => x.lane == 2).matchCount;
  playerLanes.off = matchData.lanes.find(x => x.lane == 3).matchCount;

  console.log(playerLanes.mid, matchData);
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
      playerType += "Core";
      cardBg = "card-bg-red.jpg";
    }
  }
  if(matchData.supportCount/matchData.matchCount >= .6){
    playerType += "Support";
    cardBg = "card-bg-green.jpg";
  }

  if(playerType == ""){
    playerType +="Flex";
    cardBg = "card-bg-blue.jpg";
  }
  if((topHeroes[0].wins + topHeroes[0].losses)/matchData.matchCount > .4){
    playerType += topHeroes[0].heroData.name + " Main";
  }

  playerStats = {};
  playerStats.ptype = playerType;
  playerStats.wins = matchData.winCount;
  playerStats.losses = matchData.lossCount;
  playerStats.cardBg = cardBg;
  playerStats.heroes = topHeroes;


  return playerStats;
}
