import React, { Component } from 'react';
import { shell } from 'electron';
import '../assets/css/PlayerCard.scss';

export default class PlayerCard extends Component {
  openBrowser = e => {
    e.preventDefault();
    
    const { href } = this.props;
    shell.openExternal(href);
  }

  render() {
      const {cardData} = this.props;
      console.log(cardData);
      console.log(process.env.PUBLIC_URL);
      const Heroes = cardData.playerStats.heroes.splice(0, 3).map((hero, i) => {
      return (
      <div key={`key-${i}`} className="recent-hero">
        <img src={hero.url} alt="" className="hero"/>
        <div className="hero-win-loss">
        <div className="hero-wl-inner">{hero.wins}-{hero.losses}</div>
        </div>
      </div>)});
      const rankIcon = require('.' + cardData.rank_icon);
      const bgImg = require('./images/' + cardData.playerStats.cardBg);
      const bgStyle = {backgroundImage: `url(${bgImg})`};

    return (
        <div className="player-card" style={bgStyle}>
         <div className="name-row">
           <h3 className="name">{cardData.name}</h3>
         </div>
         <div className ="card-img">
            <img src={cardData.avatar} alt="" className="card-avatar"/>
            <div className="heroes-wrapper">
              {Heroes}
            </div>
         </div>
         <div className="info-row">
           <h4 className="role">{cardData.playerStats.ptype}</h4>
           <h4 className="rank"></h4>
           <img src={rankIcon} alt=""/>
         </div>
         <div className="body-row">

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
