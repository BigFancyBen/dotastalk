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
      const Heroes = cardData.playerStats.heroes.splice(0, 3).map((hero, i) => {        
      return (
      <div key={`key-${i}`} className={"recent-hero " + hero.name.toLowerCase().replace(/\s+/g, '-')}>
        <img src={hero.url} alt="" className="hero"/>
        <div className="hero-win-loss">
        <div className="hero-wl-inner">{hero.wins}-{hero.losses}</div>
        </div>
      </div>)}
      );
      const rankIcon = require('.' + cardData.rank_icon);
      const bgImg = require('./images/' + cardData.playerStats.cardBg);
      const bgStyle = {backgroundImage: `url(${bgImg})`};
      const midPercent = Math.floor((cardData.playerStats.counts.mid/cardData.playerStats.counts.total)*100) + '%';
      const safePercent = Math.floor((cardData.playerStats.counts.safelane/cardData.playerStats.counts.total)*100) + '%';
      const offPercent = Math.floor((cardData.playerStats.counts.offlane/cardData.playerStats.counts.total)*100) + '%';

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
          <div className="description">
            <div className="player-wrapper">
              <p>Mid {midPercent}</p>
              <p>Safelane {safePercent}</p>
              <p>Offlane {offPercent}</p>
              <p>Support:{cardData.playerStats.counts.support} Core:{cardData.playerStats.counts.core} Mid:{cardData.playerStats.counts.mid}</p>
            </div>
            <div className="hero-wrapper1">
              <p>Ogre</p>
            </div>
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
