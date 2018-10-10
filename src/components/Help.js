import React from 'react';
import { ListGroup } from 'reactstrap';
import BrowserListItem from './BrowserListItem';

const Help = () => (
  <ListGroup>
    <BrowserListItem href="https://github.com/tcerdaITBA/electron-react-router-boilerplate">Boilerplate Repository</BrowserListItem>
    <BrowserListItem href="https://github.com/pbarbiero/basic-electron-react-boilerplate">Original Boilerplate Repository</BrowserListItem>
    <BrowserListItem href="https://electronjs.org/">Electron</BrowserListItem>
    <BrowserListItem href="https://nodejs.org/es/">Node</BrowserListItem>
    <BrowserListItem href="https://reactjs.org/">React</BrowserListItem>
    <BrowserListItem href="https://reacttraining.com/react-router/">React Router</BrowserListItem>
    <BrowserListItem href="https://reactstrap.github.io/">Reactstrap</BrowserListItem>
  </ListGroup>  
);

export default Help;
