import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { shell } from 'electron';
import '../assets/css/PlayerCard.css';

export default class BrowserListItem extends Component {
  openBrowser = e => {
    e.preventDefault();
    
    const { href } = this.props;
    shell.openExternal(href);
  }

  render() {
      const {cardData} = this.props;
      
    return (
        <div className="">{cardData.name}</div>
    );
  }
}
