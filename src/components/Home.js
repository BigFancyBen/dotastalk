import React from 'react';
import { Jumbotron } from 'reactstrap';
import PlayerCard from './PlayerCard'
import { Link } from 'react-router-dom';
import '../assets/css/Home.css';

class Home extends React.Component {
  componentDidMount() {
    console.log('Mounted!');
  }
  render() {
    const cardData = {"wl":{"win":544,"lose":527},"matches":[{"match_id":4559608003,"player_slot":1,"radiant_win":false,"hero_id":84,"start_time":1553220796,"duration":827,"game_mode":22,"lobby_type":0,"version":21,"kills":0,"deaths":5,"assists":3,"skill":3,"xp_per_min":212,"gold_per_min":208,"hero_damage":2483,"tower_damage":0,"hero_healing":0,"last_hits":2,"lane":3,"lane_role":3,"is_roaming":false,"cluster":111,"leaver_status":1,"party_size":5},{"match_id":4505006409,"player_slot":129,"radiant_win":true,"hero_id":8,"start_time":1552018093,"duration":3102,"game_mode":22,"lobby_type":0,"version":21,"kills":9,"deaths":6,"assists":18,"skill":3,"xp_per_min":717,"gold_per_min":558,"hero_damage":42993,"tower_damage":1557,"hero_healing":10367,"last_hits":369,"lane":3,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":5},{"match_id":4504941139,"player_slot":129,"radiant_win":true,"hero_id":6,"start_time":1552015990,"duration":1519,"game_mode":22,"lobby_type":0,"version":21,"kills":0,"deaths":7,"assists":8,"skill":3,"xp_per_min":411,"gold_per_min":288,"hero_damage":3499,"tower_damage":0,"hero_healing":0,"last_hits":84,"lane":3,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":5},{"match_id":4493486777,"player_slot":131,"radiant_win":true,"hero_id":30,"start_time":1551757202,"duration":1859,"game_mode":22,"lobby_type":0,"version":21,"kills":2,"deaths":18,"assists":7,"skill":3,"xp_per_min":234,"gold_per_min":198,"hero_damage":5716,"tower_damage":0,"hero_healing":812,"last_hits":5,"lane":3,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":4},{"match_id":4493372703,"player_slot":4,"radiant_win":true,"hero_id":84,"start_time":1551753019,"duration":2727,"game_mode":22,"lobby_type":0,"version":21,"kills":5,"deaths":12,"assists":19,"skill":3,"xp_per_min":611,"gold_per_min":472,"hero_damage":19959,"tower_damage":1710,"hero_healing":0,"last_hits":86,"lane":1,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":5},{"match_id":4488918450,"player_slot":129,"radiant_win":false,"hero_id":8,"start_time":1551645793,"duration":3086,"game_mode":22,"lobby_type":0,"version":21,"kills":12,"deaths":4,"assists":9,"skill":3,"xp_per_min":720,"gold_per_min":655,"hero_damage":28917,"tower_damage":6834,"hero_healing":4324,"last_hits":406,"lane":3,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":4},{"match_id":4488844931,"player_slot":130,"radiant_win":true,"hero_id":21,"start_time":1551643444,"duration":1974,"game_mode":22,"lobby_type":0,"version":21,"kills":1,"deaths":8,"assists":4,"skill":3,"xp_per_min":369,"gold_per_min":294,"hero_damage":8895,"tower_damage":1174,"hero_healing":400,"last_hits":102,"lane":2,"lane_role":2,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":null},{"match_id":4488775729,"player_slot":129,"radiant_win":false,"hero_id":84,"start_time":1551641321,"duration":1512,"game_mode":22,"lobby_type":0,"version":21,"kills":5,"deaths":4,"assists":21,"skill":3,"xp_per_min":471,"gold_per_min":449,"hero_damage":9690,"tower_damage":2622,"hero_healing":0,"last_hits":32,"lane":3,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":null},{"match_id":4484474271,"player_slot":3,"radiant_win":true,"hero_id":84,"start_time":1551574048,"duration":1992,"game_mode":22,"lobby_type":0,"version":21,"kills":7,"deaths":5,"assists":24,"skill":3,"xp_per_min":427,"gold_per_min":454,"hero_damage":14570,"tower_damage":3060,"hero_healing":0,"last_hits":43,"lane":1,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":4},{"match_id":4484386470,"player_slot":131,"radiant_win":true,"hero_id":50,"start_time":1551570130,"duration":2576,"game_mode":22,"lobby_type":0,"version":21,"kills":2,"deaths":10,"assists":6,"skill":3,"xp_per_min":338,"gold_per_min":276,"hero_damage":4433,"tower_damage":450,"hero_healing":4583,"last_hits":83,"lane":3,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":4},{"match_id":4484275814,"player_slot":2,"radiant_win":true,"hero_id":84,"start_time":1551566056,"duration":3100,"game_mode":22,"lobby_type":0,"version":21,"kills":5,"deaths":14,"assists":22,"skill":3,"xp_per_min":465,"gold_per_min":474,"hero_damage":25837,"tower_damage":1032,"hero_healing":0,"last_hits":43,"lane":1,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":4},{"match_id":4459348657,"player_slot":0,"radiant_win":true,"hero_id":84,"start_time":1551073103,"duration":1765,"game_mode":22,"lobby_type":0,"version":21,"kills":5,"deaths":4,"assists":17,"skill":3,"xp_per_min":429,"gold_per_min":367,"hero_damage":9171,"tower_damage":1094,"hero_healing":0,"last_hits":28,"lane":1,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":5},{"match_id":4459301632,"player_slot":128,"radiant_win":false,"hero_id":27,"start_time":1551071775,"duration":658,"game_mode":22,"lobby_type":0,"version":21,"kills":1,"deaths":1,"assists":2,"skill":3,"xp_per_min":261,"gold_per_min":187,"hero_damage":2365,"tower_damage":0,"hero_healing":0,"last_hits":6,"lane":3,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":5},{"match_id":4459202749,"player_slot":0,"radiant_win":false,"hero_id":22,"start_time":1551068941,"duration":2222,"game_mode":22,"lobby_type":0,"version":21,"kills":3,"deaths":7,"assists":4,"skill":2,"xp_per_min":359,"gold_per_min":281,"hero_damage":18639,"tower_damage":0,"hero_healing":0,"last_hits":118,"lane":2,"lane_role":2,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":4},{"match_id":4459121328,"player_slot":3,"radiant_win":true,"hero_id":23,"start_time":1551066379,"duration":1891,"game_mode":22,"lobby_type":0,"version":21,"kills":3,"deaths":6,"assists":20,"skill":1,"xp_per_min":461,"gold_per_min":406,"hero_damage":13258,"tower_damage":3563,"hero_healing":0,"last_hits":114,"lane":2,"lane_role":2,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":2},{"match_id":4458520522,"player_slot":4,"radiant_win":true,"hero_id":64,"start_time":1551039140,"duration":3168,"game_mode":22,"lobby_type":0,"version":21,"kills":3,"deaths":9,"assists":19,"skill":3,"xp_per_min":557,"gold_per_min":367,"hero_damage":15794,"tower_damage":1554,"hero_healing":0,"last_hits":101,"lane":1,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":5},{"match_id":4455424467,"player_slot":4,"radiant_win":false,"hero_id":84,"start_time":1550985403,"duration":2682,"game_mode":22,"lobby_type":0,"version":21,"kills":2,"deaths":12,"assists":16,"skill":3,"xp_per_min":349,"gold_per_min":347,"hero_damage":10768,"tower_damage":489,"hero_healing":0,"last_hits":45,"lane":1,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":null},{"match_id":4397439240,"player_slot":4,"radiant_win":true,"hero_id":47,"start_time":1549493859,"duration":2160,"game_mode":22,"lobby_type":0,"version":21,"kills":5,"deaths":6,"assists":10,"skill":1,"xp_per_min":700,"gold_per_min":479,"hero_damage":26680,"tower_damage":2625,"hero_healing":0,"last_hits":141,"lane":2,"lane_role":2,"is_roaming":false,"cluster":121,"leaver_status":0,"party_size":1},{"match_id":4391808122,"player_slot":130,"radiant_win":false,"hero_id":84,"start_time":1549337653,"duration":3900,"game_mode":22,"lobby_type":0,"version":21,"kills":9,"deaths":15,"assists":26,"skill":3,"xp_per_min":561,"gold_per_min":491,"hero_damage":33761,"tower_damage":610,"hero_healing":0,"last_hits":103,"lane":3,"lane_role":1,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":4},{"match_id":4391511667,"player_slot":131,"radiant_win":true,"hero_id":23,"start_time":1549324157,"duration":2384,"game_mode":22,"lobby_type":0,"version":21,"kills":2,"deaths":9,"assists":14,"skill":1,"xp_per_min":527,"gold_per_min":371,"hero_damage":11467,"tower_damage":156,"hero_healing":0,"last_hits":148,"lane":1,"lane_role":3,"is_roaming":false,"cluster":111,"leaver_status":0,"party_size":1}],"name":"RTZ GOAT","avatar":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/be/becaa33ef42f202ad840d411aa0eb32de2779886_full.jpg","id":78029867,"rank":"~4112 MMR","rank_icon":"assets/images/rank_icons/rank_icon_0.png","side":true,"playerStats":{"ptype":"Safelane Core","wins":11,"losses":9,"counts":{"support":2,"core":14,"mid":4,"safelane":14,"offlane":2,"wins":11,"total":20,"laneTotal":20,"roleTotal":20},"cardBg":"card-bg-blue.jpg","heroes":[{"id":84,"name":"Ogre Magi","url":"https://api.opendota.com/apps/dota2/images/heroes/ogre_magi_full.png","count":8,"wins":6,"losses":2},{"id":8,"name":"Juggernaut","url":"https://api.opendota.com/apps/dota2/images/heroes/juggernaut_full.png","count":2,"wins":1,"losses":1},{"id":23,"name":"Kunkka","url":"https://api.opendota.com/apps/dota2/images/heroes/kunkka_full.png","count":2,"wins":1,"losses":1},{"id":30,"name":"Witch Doctor","url":"https://api.opendota.com/apps/dota2/images/heroes/witch_doctor_full.png","count":1,"wins":0,"losses":1},{"id":21,"name":"Windranger","url":"https://api.opendota.com/apps/dota2/images/heroes/windrunner_full.png","count":1,"wins":0,"losses":1},{"id":47,"name":"Viper","url":"https://api.opendota.com/apps/dota2/images/heroes/viper_full.png","count":1,"wins":1,"losses":0},{"id":27,"name":"Shadow Shaman","url":"https://api.opendota.com/apps/dota2/images/heroes/shadow_shaman_full.png","count":1,"wins":1,"losses":0},{"id":22,"name":"Zeus","url":"https://api.opendota.com/apps/dota2/images/heroes/zuus_full.png","count":1,"wins":0,"losses":1},{"id":6,"name":"Drow Ranger","url":"https://api.opendota.com/apps/dota2/images/heroes/drow_ranger_full.png","count":1,"wins":0,"losses":1},{"id":64,"name":"Jakiro","url":"https://api.opendota.com/apps/dota2/images/heroes/jakiro_full.png","count":1,"wins":1,"losses":0},{"id":50,"name":"Dazzle","url":"https://api.opendota.com/apps/dota2/images/heroes/dazzle_full.png","count":1,"wins":0,"losses":1}]}};
    return (
      <div>
        <PlayerCard cardData={cardData}></PlayerCard>
      </div>
    );
  }
}

export default Home;
