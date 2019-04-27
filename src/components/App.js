import React from 'react';
import Home from './Home';
import Help from './Help';
import ApiHandler from '../utilities/ApiHandler';
import { MemoryRouter, Switch, Route } from 'react-router';
import { loadFromServerLog } from '../utilities/helpers';
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
    loadFromServerLog();
    ipc.on('updatedMatches', function(event) {
      loadFromServerLog()
    });
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
};

export default App;
