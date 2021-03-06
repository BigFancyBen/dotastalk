const { fpGraph } = require('./fp-graphs.js');
const NO_AVATAR_IMG = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";
module.exports = {buildFeaturedHtml};

function buildFeaturedHtml(data) {
  // let laneGraph = fpGraph(data.playerStats.counts, data.id);
  // let graphHTML = "";
  // let graphRoles = `<div class="graph-roles">Supp: ${data.playerStats.counts.support}<br>Core: ${data.playerStats.counts.core}<br>Mid: ${data.playerStats.counts.mid}</div>`;
  // if (laneGraph){
  //   graphHTML = `<div class="graphs">${graphRoles}<img class="graph-minimap" src="./assets/images/minimap_simple.png"></img><img src="${laneGraph}" class="lane-graph"></img></div>`;
  // }
  let heroSection = "";

  for (let i = 0; i < 3; i++){
    if(data.playerStats.heroes != undefined && data.playerStats.heroes[i]) {
    heroSection += `<div class="recent-hero">
       <img src="${data.playerStats.heroes[i].heroData.url}" alt="" class="hero">
       <div class="hero-win-loss">
         <div class="hero-wl-inner">${data.playerStats.heroes[i].wins} – ${data.playerStats.heroes[i].losses}</div>
       </div>
      </div>`;
    }
  }
  if (heroSection == "") {
    heroSection = `<img src="${NO_AVATAR_IMG}" alt="" class="hero no-heroes"></img><div class="hero-win-loss"></div>`;
  }
  var html = `<div class="player-card" style="background: url('./assets/images/${data.playerStats.cardBg}')">
   <div class="name-row">
     <h3 class="name">${data.name}</h3>
   </div>
   <div class ="card-img">
    <img src=${data.avatar} alt="" class="card-avatar"/>
    <div class="heroes-wrapper">
      ${heroSection}
    </div>
   </div>
   <div class="info-row">
     <h4 class="role">${data.playerStats.ptype}</h4>
     <h4 class="rank"></h4>
     <img src="${data.rank_icon}" alt="">
   </div>
   <div class="body-row">
     <div class="description">
      ${buildRoleGraph(data.playerStats.support, data.playerStats.core)}
      ${buildLane(data.playerStats.lanes)}
     </div>
   </div>
   <div class="wl-row">
     <div class="win-loss">
       <div class="wins">${data.playerStats.wins}/</div>
       <div class="losses">${data.playerStats.losses}</div>
     </div>
   </div>
  </div>`;

  return html;
}

function buildLane(lanes){
  let total = lanes.off+lanes.mid+lanes.roam+lanes.safe;
  if(isNaN(total)){
    return "";
  } else {
    let laneGraphHtml = `<ul>
      <li>Safe: ${Math.round(lanes.safe/total*100)}%</li>
      <li>Off: ${Math.round(lanes.off/total*100)}%</li>
      <li>Mid: ${Math.round(lanes.mid/total*100)}%</li>
      <li>Roam: ${Math.round(lanes.roam/total*100)}%</li>
    </ul>`
    return laneGraphHtml;
  }
}
function buildRoleGraph (numSup, numCore){
  if (numSup == null || numCore == null){
    return "";
  } else {
    let total = numSup + numCore;
    let roleGraphHtml = ` <div class="role-graph"><div style="height:${numSup/total*100}%" class="support-bar role"><p class="role-tooltip">Support</p></div>
      <div style="height:${numCore/total*100}%" class="core-bar role"><p class="role-tooltip">Core</p></div></div>`;
    return roleGraphHtml;
  }
}