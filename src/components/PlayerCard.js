import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { shell } from 'electron';
import '../assets/css/PlayerCard.css';

export default class PlayerCard extends Component {
  openBrowser = e => {
    e.preventDefault();
    
    const { href } = this.props;
    shell.openExternal(href);
  }

  render() {
      const {cardData} = this.props;
      console.log(cardData);
      const Heroes = cardData.playerStats.heroes.splice(0, 3).map((hero, i) => {
      return (
      <div className="recent-hero">
        <img src={hero.url} alt="" className="hero"/>
        <div className="hero-win-loss">
        <div className="hero-wl-inner">{hero.wins}-{hero.losses}</div>
        </div>
      </div>)});
      const backgroundUrl = `url('./assets/images/${cardData.playerStats.cardBg}')`

    return (
        <div className="featured-player" backgroundImage={backgroundUrl}>
         <div className="name-row">
           <h3 className="name">{cardData.name}</h3>
         </div>
         <div className ="card-img">
             <div className="card-bg"><img src={cardData.avatar} alt="" className="card-bg-inner"/></div>
             <img src={cardData.avatar} alt="" className="card-avatar"/>
         </div>
         <div className="info-row">
           <h4 className="role">{cardData.playerStats.ptype}</h4>
           <h4 className="rank"></h4>
           <img src={cardData.rank_icon} alt=""/>
         </div>
         <div className="body-row">
           <div className="description">
              {Heroes}
           </div>
         </div>
         <div className="wl-row">
           <div className="win-loss">
             <div className="wins">{cardData.playerStats.wins}/</div>
             <div className="losses">{cardData.playerStats.losses}</div>
           </div>
         </div>
        </div>
    )
  }
}
