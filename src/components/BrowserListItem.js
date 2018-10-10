import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { shell } from 'electron';

export default class BrowserListItem extends Component {
  openBrowser = e => {
    e.preventDefault();
    
    const { href } = this.props;
    shell.openExternal(href);
  }

  render() {
    return <ListGroupItem tag="a" href="#" onClick={this.openBrowser}>{this.props.children}</ListGroupItem>
  }
}
