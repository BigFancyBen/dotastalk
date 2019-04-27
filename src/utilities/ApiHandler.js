

exports.parseData = (playerIds) => {
  console.log('Player Data', playerIds);
  
  
  // Return match data structure
  return(null);
}



// Code from Ben's V1 app
// function getPlayer(playerID, slot, side) {
//   let activePlayer = localStorage.getItem("activePlayer");
//   if(activePlayer != "" && playerID != undefined) {
//     if((side && slot >= 5) || (!side && slot < 5)){
//       var apiRequest1 = fetch(`https://api.opendota.com/api/players/${activePlayer}/wl?against_account_id=${playerID}`).then(function(response){
//           return response.json()
//       });
//     } else if ((side && slot < 5) || (!side && slot >=5)) {
//       var apiRequest1 = fetch(`https://api.opendota.com/api/players/${activePlayer}/wl?with_account_id=${playerID}`).then(function(response){
//           return response.json()
//       });
//     }
//     var apiRequest2 = fetch(`https://api.opendota.com/api/players/${playerID}/recentMatches?significant=0`).then(function(response){
//         return response.json()
//     });
//     var apiRequest3 = fetch(`https://api.opendota.com/api/players/${playerID}`).then(function(response){
//         return response.json()
//     });

//     return Promise.all([apiRequest1,apiRequest2,apiRequest3]).then(function(values){
//       namedObj = {};
//       namedObj["wl"] = values[0]
//       namedObj["matches"] = values[1]
//       namedObj["player"] = values[2]
//       return buildPlayer(namedObj, slot);
//     });
//   }
// }

