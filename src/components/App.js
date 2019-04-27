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
    var serverLogData = [];
    ApiHandler.parseData(serverLogData);
    this.setState({ loading: true });
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
