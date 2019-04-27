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
        <div className="featured-player">
         <div className="name-row">
           <h3 className="name">{cardData.name}</h3>
         </div>
         <div className ="card-img">
             <div className="card-bg"><img src="{cardData.avatar}" alt="" className="card-bg-inner"/></div>
             <img src="{cardData.avatar}" alt="" className="card-avatar"/>
         </div>
         </div>
         /* <div className="info-row">
           <h4 className="role">{cardData.playerStats.ptype}</h4>
           <h4 className="rank"></h4>
           <img src="{cardData.rank_icon}" alt="">
         </div>
         <div className="body-row">
           <div className="description">
           for (let i = 0; i < 3; i++){
            if( cardData.playerStats.heroes[i] ) {
              <div className="recent-hero">
                <img src="{cardData.playerStats.heroes[i].url}" alt="" className="hero">
                <div className="hero-win-loss">
                <div className="hero-wl-inner">{cardData.playerStats.heroes[i].wins}-{cardData.playerStats.heroes[i].losses}</div>
                </div>
              </div>
            }
          }
           </div>
         </div>
         <div className="wl-row">
           <div className="win-loss">
             <div className="wins">{cardData.playerStats.wins}/</div>
             <div className="losses">{cardData.playerStats.losses}</div>
           </div>
         </div>
        </div> */
    );
  }
}
