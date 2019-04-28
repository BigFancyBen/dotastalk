import React from 'react';
import Home from './Home';
import Teamview from './Teamview';
import TeamSelctor from './TeamSelector';
import Overview from './Overview';
import Onboarding from './Onboarding';
import { MemoryRouter, Switch, Route } from 'react-router';
import '../assets/css/global.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    console.log('App Started');
  }

  render() {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/overview" component={Overview} />
          <Route path="/teamview" component={Teamview} />
          <Route path="/teamselect" component={TeamSelctor} />
          <Route path="/" component={Home} />
        </Switch>
      </MemoryRouter>
    );
  }
};

export default App;
