import React from 'react';
import Home from './Home';
import Help from './Help';
import { MemoryRouter, Switch, Route } from 'react-router';

const ipc = require('electron').ipcRenderer;

ipc.on('updateMatches',function(event, game){
    console.log("game: "+game);
})

const App = () => (
  <MemoryRouter>
    <Switch>
      <Route path="/help" component={Help} />
      <Route path="/" component={Home} />
    </Switch>
  </MemoryRouter>
);

export default App;
