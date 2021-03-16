module.exports = {buildPlayerIcons};

function buildPlayerIcons(data) {  
  let radiantTeam = "";
  let direTeam = "";
  function buildTeam(curPlayer){
    let playerString = ""
    playerString+= `<div class="pre-game__player" id="${curPlayer.id}">
    <img src="${curPlayer.avatar}" alt="" class="pre-game__player-avatar">
    <div class="pre-game__rank">
      <img src="${curPlayer.rank_icon}" alt="" class="pre-game__player-rank-icon">`;
      if (curPlayer.rank_stars) {
        playerString+=`<img src="${curPlayer.rank_stars}" alt="" class="pre-game__player-rank-stars"></img>`;
      }
      if(curPlayer.rank) {
        playerString+=`<p class="pre-game__player-rank" >${curPlayer.rank}</p>`;
      }
      playerString+=`</div>
      <div class="pre-game__player-matches">${curPlayer.wl.win}-${curPlayer.wl.lose}</div>
    </div>`;

    return playerString;
  }

  data.forEach(element => {
    if (element.side){
      radiantTeam+=buildTeam(element);
    } else {
      direTeam+=buildTeam(element);
    }
  });

  let playerIconHtml = `<div class='pre-game 1080p'>
    <div class="pre-game__team" id="radiant">
      ${radiantTeam}
    </div>
    <div class="pre-game__team" id="dire">
      ${direTeam}
    </div>
  </div>`;

    return playerIconHtml;
}