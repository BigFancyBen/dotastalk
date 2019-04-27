import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import BrowserListItem from './BrowserListItem';
import '../assets/css/Home.css';

class Help extends React.Component {
  componentDidMount() {
    console.log('Mounted, faggot');
  }

  render() {
    return (
      <div>
        <ListGroup>
          <BrowserListItem href="https://github.com/tcerdaITBA/electron-react-router-boilerplate">Boilerplate Repository</BrowserListItem>
          <BrowserListItem href="https://github.com/pbarbiero/basic-electron-react-boilerplate">Original Boilerplate Repository</BrowserListItem>
          <BrowserListItem href="https://electronjs.org/">Electron</BrowserListItem>
          <BrowserListItem href="https://nodejs.org/es/">Node</BrowserListItem>
          <BrowserListItem href="https://reactjs.org/">React</BrowserListItem>
          <BrowserListItem href="https://reacttraining.com/react-router/">React Router</BrowserListItem>
          <BrowserListItem href="https://reactstrap.github.io/">Reactstrap</BrowserListItem>
          <ListGroupItem>
            <Link to="/">Go Back.</Link>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default Help;
