module.exports = {pickSides};

function pickSides(data) {
  let radiantTeam = "";
  let direTeam = "";
  function buildTeam(curPlayer){
    let playerString = ""
    playerString+=`<div class="player" id="${curPlayer.id}">
    <div class="player-name">${curPlayer.name}</div>
    <svg class="trash-icon" enable-background="new 0 0 268.476 268.476" version="1.1" viewBox="0 0 268.476 268.476" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
	    <path d="m63.119 250.25s3.999 18.222 24.583 18.222h93.072c20.583 0 24.582-18.222 24.582-18.222l18.374-178.66h-178.98l18.373 178.66zm106.92-151.81c0-4.943 4.006-8.949 8.949-8.949s8.95 4.006 8.95 8.949l-8.95 134.24c0 4.943-4.007 8.949-8.949 8.949s-8.949-4.007-8.949-8.949l8.949-134.24zm-44.746 0c0-4.943 4.007-8.949 8.949-8.949 4.943 0 8.949 4.006 8.949 8.949v134.24c0 4.943-4.006 8.949-8.949 8.949s-8.949-4.007-8.949-8.949v-134.24zm-35.797-8.95c4.943 0 8.949 4.006 8.949 8.949l8.95 134.24c0 4.943-4.007 8.949-8.95 8.949-4.942 0-8.949-4.007-8.949-8.949l-8.949-134.24c0-4.943 4.007-8.95 8.949-8.95zm128.87-53.681h-39.376v-17.912c0-13.577-4.391-17.899-17.898-17.899h-53.696c-12.389 0-17.898 6.001-17.898 17.899v17.913h-39.376c-7.914 0-14.319 6.007-14.319 13.43 0 7.424 6.405 13.431 14.319 13.431h168.24c7.914 0 14.319-6.007 14.319-13.431 0-7.423-6.405-13.431-14.319-13.431zm-57.274 0h-53.695l1e-3 -17.913h53.695v17.913z" clip-rule="evenodd" fill-rule="evenodd"/>
    </svg>

    <img src="${curPlayer.avatar}" alt="" class="player-avatar"></div>`
    return playerString;
  }

  data.forEach(element => {
    if (element.side){
      radiantTeam+=buildTeam(element);
    } else {
      direTeam+=buildTeam(element);
    }
  });

  let playerPickHtml = `<div class='main pick-sides'>
    <div class="team" id="radiant">
      <h2 class="side">Radiant</h2>
      ${radiantTeam}
    </div>
    <div class="team" id="dire">
      <h2 class="side">Dire</h2>
      ${direTeam}
    </div>
  </div><div class="not-ready" id="accept-teams-button">Done Fixing Teams</div>`;

    return playerPickHtml;
}