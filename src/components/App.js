import React, { ReactText } from 'react';
import Home from './Home';
import Help from './Help';
import ApiHandler from '../utilities/ApiHandler';
import { MemoryRouter, Switch, Route } from 'react-router';
import '../assets/css/global.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  
  componentDidMount() {
    console.log('App Started');
    //When app first loads, start loading
    this.setState({ loading: true });
    var serverLogData = ['84718819', '100449787', '49697106', '34782480', '52528482', '97658618', '185408314', '159418411', '975218', '181490567'];
    var activePlayersData = [];
    var activeUserId = '84718819';

    const res = ApiHandler.grabAllPlayerInfo(serverLogData);
    console.log('Response', res);
    if(serverLogData.length != 10){
      //Render page where they select which teams each person is on. Return a list of the ID's of players on Radiant and Dire

    }else{
      activePlayersData = res;
    }
    //If activeUserID is null, show a modal or something to force them to choose their user
    

    //After we're all done, stop loading
    this.setState({ loading: false });
  }

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
}

export default App;
