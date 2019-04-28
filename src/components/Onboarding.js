import React from 'react';
const { dialog } = require('electron').remote
import { Redirect } from 'react-router';
import Storage from 'electron-json-storage-sync';
import '../assets/css/Home.css';


class Onboarding extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  } 

  componentDidMount() {

  }

  showDialog = () => {
    dialog.showOpenDialog({ filters: [ {name: 'Text Files', extensions: ['txt']}] }, (filepaths) => {
      if(filepaths) {
        Storage.set('serverLog', { path: filepaths[0] }, function(error) {
          if (error) throw error;
        });
        this.setState({ redirect: true });
      }
    })
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect push to="/home" />;
    }
    return (
      <div>
        Onboarding - Add Graphics And Such Here
        <h1 onClick={this.showDialog}>Step 1: Click Here load Server_TXT</h1>
        <h1 onClick={() => {}}>Step 2: Arrange Players</h1>
      </div>
    );
  }
}

export default Onboarding;
