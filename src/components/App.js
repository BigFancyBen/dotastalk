import React from 'react';
import Home from './Home';
import Help from './Help';
import ApiHandler from '../utilities/ApiHandler';
import { MemoryRouter, Switch, Route } from 'react-router';
import storage from 'electron-json-storage';
import '../assets/css/global.css';
const { parseLog } = require('../electron/logwatch');
const ipc = require('electron').ipcRenderer;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    console.log('App Started');
    
    const that = this;
    storage.get('serverLog', function(error, log) {
      if (error) throw error;
      if (log.path) {
        const path = log.path[0];
        try {
          const parsedData = parseLog(path);
          that.setState({ loading: true });
          const players = that.getPlayers(parsedData[parsedData.length - 1]);
          // DERS MAKE YOUR API CALL HERE.
          const res = ApiHandler.grabAllPlayerInfo(players);
            console.log('Response', res);
            if(players.length != 10){
              //Render page where they select which teams each person is on. Return a list of the ID's of players on Radiant and Dire

            }else{
              //activePlayersData = res;
            }
            //If activeUserID is null, show a modal or something to force them to choose their user
         
        } catch (error) {
          console.log('NO FILE FOUND', error);
        }
      }
    });

    ipc.on('updatedMatches', function(event, games) {
      const players = that.getPlayers(games[games.length - 1]);
      // DERS MAKE YOUR API CALL HERE.
    });
  }

  getPlayers(matchInfo) {
    const match = {};
    if(matchInfo.includes("DOTA_GAMEMODE_CUSTOM")){
      match.gameMode = "Custom";
      return match;
    } else {
      const matchRegex = /([DOTA])\w+/;
      match.gameMode = matchInfo.match(matchRegex)[0];
    }
    const lobbyRegex = /\((Lobby)(.*?)\)/;
    const rawPlayerIds = matchInfo.match(lobbyRegex)[2].split(" ").splice(3);
    match.players = [];
    let curIDRegex = /^(.*?U:1:)/;
    const players = [];
    for (var value of rawPlayerIds) {
      const curID = value.replace(curIDRegex, "");
      players.push(curID);
    }
    return players;
  };

  render() {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/help" component={Help} />
          <Route path="/" component={Home} />
        </Switch>
      </MemoryRouter>
    );
  }
};

export default App;
