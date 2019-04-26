const { fpGraph } = require('./fp-graphs.js');
const { getHeroByID } = require('./heroes.js');
module.exports = {analyzeMatches};


function analyzeMatches(matchData) {
  //lane, role, win-loss, hero-id
  let counts = {}
  counts.support = 0;
  counts.core = 0;
  counts.mid = 0;
  counts.safelane = 0;
  counts.offlane = 0;
  counts.wins = 0;
  counts.total = 0;
  let heroPicks = [];

  matchData.forEach(function (match){
    wonGame = false;
    counts.total++;
    if(match.player_slot >= 128 && match.radiant_win == false) {
      counts.wins++;
      wonGame = true;
    }
    if(match.player_slot < 128 && match.radiant_win == true) {
      counts.wins++;
      wonGame = true;
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

    let curHero = getHeroByID(match.hero_id);
    if (heroPicks.some(x => x.id == match.hero_id)){
      pHero = heroPicks.find(x => x.id == match.hero_id);
      pHero.count++;
      if (wonGame) {
        pHero.wins++
      } else {
        pHero.losses++;
      }
    } else {
      curHero.count = 1;
      if (wonGame) {
        curHero.wins = 1;
        curHero.losses = 0;
      } else {
        curHero.wins = 0;
        curHero.losses = 1;
      }
      heroPicks.push(curHero);
    }
  });
  let sortedHeroes = heroPicks.sort((a, b) => b.count - a.count);
  let playerType = "";
  let cardBg = "";
  counts.laneTotal = counts.mid+counts.safelane+counts.offlane;
  counts.roleTotal = counts.core+counts.mid+counts.support;
  if(counts.mid/counts.roleTotal >= .55){
    playerType += "Mid ";
    cardBg = "card-bg-red.jpg";
  }
  if(counts.offlane/counts.laneTotal >= .55){
    playerType += "Offlane ";
    cardBg = "card-bg-green.jpg";
  }
  if(counts.safelane/counts.laneTotal >= .55){
    playerType += "Safelane ";
    cardBg = "card-bg-blue.jpg";
  }
  if(counts.support/counts.roleTotal >= .55){
    playerType += "Support ";
    cardBg = "card-bg-white.jpg";
  }
  if(counts.core/counts.roleTotal >= .55){
    playerType += "Core";
  }
  if(playerType == ""){
    playerType +="Flex";
    cardBg = "card-bg-yellow.jpg";
  }
  if(sortedHeroes[0].count/counts.total > .5){
    playerType = sortedHeroes[0].name + " Main";
  }

  playerStats = {};
  playerStats.ptype = playerType;
  playerStats.wins = counts.wins;
  playerStats.losses = counts.total - counts.wins;
  playerStats.counts = counts;
  playerStats.cardBg = cardBg;
  playerStats.heroes = sortedHeroes;

  return playerStats;
}
