module.exports = {fetchIfNotCached};

function fetchIfNotCached (requestString){
    if(checkSessionStorage(requestString)){
      console.log("in cache");
      return JSON.parse(sessionStorage.getItem(requestString)).data;
    } else {
      return fetch(requestString).then(function(response){
        if( response.ok){
          return response.json()
        } else {
          return "error";
        }
      }).then(function(responseData) {
        let cacheObj = {data:responseData, time:Date.now()};
        sessionStorage.setItem(requestString, JSON.stringify(cacheObj));
        return responseData;
      });
    }
  }
  
  function checkSessionStorage(apiString) {
    if (sessionStorage.getItem(apiString)){
      let cachedTime = JSON.parse(sessionStorage.getItem(apiString)).time;
      const tenMinutes = 10*60*1000;
      if (((Date.now()) - cachedTime) < tenMinutes){
        return true;
      } else {
        console.log("old");
        return false;
      }
    } else {
      return false;
    }
  }