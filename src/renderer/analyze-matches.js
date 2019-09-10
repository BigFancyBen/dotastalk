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
 console.log(heroArray);
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



  // RETHINK LANES
  // if(matchData.mid/matchData.matchCount >= .55){
  //   playerType += "Mid ";
  //   cardBg = "card-bg-red.jpg";
  // }
  // if(matchData.offlane/matchData.matchCount >= .55){
  //   playerType += "Offlane ";
  //   cardBg = "card-bg-green.jpg";
  // }
  // if(matchData.safelane/matchData.matchCount >= .55){
  //   playerType += "Safelane ";
  //   cardBg = "card-bg-blue.jpg";
  // }
  let playerType = "";
  let cardBg= "card-bg-yellow.jpg";

  if(matchData.supportCount/matchData.matchCount >= .55){
    playerType += "Support ";
    cardBg = "card-bg-green.jpg";
  }
  if(matchData.coreCount/matchData.matchCount >= .55){
    playerType += "Core";
    cardBg = "card-bg-red.jpg";
  }
  if(playerType == ""){
    playerType +="Flex";
    cardBg = "card-bg-blue.jpg";
  }
  // if(sortedHeroes[0].count/counts.total > .5){
  //   playerType = sortedHeroes[0].name + " Main";
  // }

  playerStats = {};
  playerStats.ptype = playerType;
  playerStats.wins = matchData.winCount;
  playerStats.losses = matchData.lossCount;
  playerStats.cardBg = cardBg;
  playerStats.heroes = topHeroes;


  return playerStats;
}
