var readline = require('readline');
var fs = require('fs');


module.exports = {
  parseLog
};

function parseLog(log){
  var lines = fs.readFileSync(log, 'utf-8').split('\n').filter(Boolean);
  let games = [];
  for(i = 0; i <lines.length; i++){
    if(lines[i].includes("] (Lobby ")){
      games.push(lines[i]);
    }
  }
  return games;
}
