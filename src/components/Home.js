import React from 'react';
import Storage from 'electron-json-storage-sync';
import { Redirect } from 'react-router';
import { loadFromServerLog } from '../utilities/helpers';
import '../assets/css/Home.css';
const ipc = require('electron').ipcRenderer;


class Home  extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      redirect: false,
    };
  }  
  componentDidMount() {
    // Storage.clear();
    this.setState({ redirect: false })
    const result = loadFromServerLog();
    ipc.on('updatedMatches', function(event) {
      loadFromServerLog();
    });
    if (!result.data) {
      this.setState({ redirect: true })
    }
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect push to="/onboarding" />;
    }
    return null;
  }
};

export default Home;
