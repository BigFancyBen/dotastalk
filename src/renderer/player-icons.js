module.exports = {buildPlayerIcons};

function buildPlayerIcons(data) {
  let radiantTeam = "";
  let direTeam = "";
  console.log(data);
  function buildTeam(curPlayer){
    let playerString = ""
    playerString+=`<div class="player" id="${curPlayer.id}">
    <div class="player-name">${curPlayer.name}<div class="player-matches">${curPlayer.wl.win}-${curPlayer.wl.lose}</div></div>
    <img src="${curPlayer.avatar}" alt="" class="player-avatar">
    <div class="rank">
      <img src="${curPlayer.rank_icon}" alt="" class="player-rank-icon">`;
      if (curPlayer.rank_stars) {
        playerString+=`<img src="${curPlayer.rank_stars}" alt="" class="player-rank-stars"></img>`;
      }
      if(curPlayer.rank) {
        playerString+=`<p class="player-rank" >${curPlayer.rank}</p>`;
      }
      playerString+=`</div>
    </div>`;
    return playerString;
  }

  data.players.forEach(element => {
    if (element.side){
      radiantTeam+=buildTeam(element);
    } else {
      direTeam+=buildTeam(element);
    }
  });
  
  let playerIconHtml = `<div class='main'>
    <div class="team" id="radiant">
      <h2 class="side">Radiant</h2>
      ${radiantTeam}
    </div>
    <div class="team" id="dire">
      <h2 class="side">Dire</h2>
      ${direTeam}
    </div>
  </div>`;

    return playerIconHtml;
}