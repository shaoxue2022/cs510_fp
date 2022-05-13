import { Component } from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import SearchResults from '../Results/SearchResults';
import GalleryResults from '../Results/GalleryResults';
import Gallery from '../Gallery/Gallery';
import Detail from '../Detail/Detail';
import pictureMap from '../JsonData/PlayerRankPictureMap.json';
import allPlayers from '../JsonData/players.json';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      players: [],
      searchPlayers: [],
      timeframe : "cur_Pos%",
      ordering : "",
      galleryPlayers: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTimeframe = this.handleTimeframe.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.getGalleryPlayers = this.getGalleryPlayers.bind(this);
    this.getDetailPlayers = this.getDetailPlayers.bind(this);
    this.getSearchPlayers = this.getSearchPlayers.bind(this);
  }

  componentWillMount() {
      var playerList = [];
      for (var i = 0; i < allPlayers.length; i++) {
        var player = allPlayers[i];
        let curPlayer = {};
        curPlayer.id = player.id;
        curPlayer.first_name = player.first_name;
        curPlayer.last_name = player.last_name;
        curPlayer.height_feet = player.height_feet;
        curPlayer.height_inches = player.height_inches;
        curPlayer.position = player.position;
        curPlayer.team = player.team;
        curPlayer.weight_pounds = player.weight_pounds;
        curPlayer['cur_Pos%'] = player['cur_Pos%']
        curPlayer['1wk_Pos%'] = player['1wk_Pos%']
        curPlayer['2wk_Pos%'] = player['2wk_Pos%']
        curPlayer['1mth_Pos%'] = player['1mth_Pos%']
        curPlayer['2mth_Pos%'] = player['2mth_Pos%']
        curPlayer['full_Pos%'] = player['full_Pos%']
        curPlayer.min = player.min;
        curPlayer.pts = player.pts;
        curPlayer.fgm = player.fgm;
        curPlayer.ftm = player.ftm;
        curPlayer.fg3m = player.fg3m;
        curPlayer.reb = player.reb;
        curPlayer.ast = player.ast;
        curPlayer.stl = player.stl;
        curPlayer.blk = player.blk;
        curPlayer.turnover = player.turnover;
        curPlayer.fg_pct = player.fg_pct;
        curPlayer.ft_pct = player.ft_pct;
        curPlayer.fg3_pct = player.fg3_pct;
        curPlayer.personId = pictureMap[curPlayer.id];
        playerList.push(curPlayer);
      }
      
      this.setState({players : playerList});
      this.setState({galleryPlayers : playerList});
      this.setState({searchPlayers : playerList});
  }

  handleSearch(event) {
    var name = event.target.value;
    name = name.replace(/\s/g,'').toLowerCase();
    var playersToSearch = this.state.players;
    if (this.state.players.length === 0 || this.state.players[0] === undefined) {
      playersToSearch = allPlayers;
    }
    const result = playersToSearch.filter(player => (
      player.first_name.toLowerCase().includes(name) || 
      player.last_name.toLowerCase().includes(name) ||
      player.first_name.toLowerCase().concat(player.last_name.toLowerCase()).includes(name)
    ));
    this.setState({ searchPlayers : result });
  }

  handleTimeframe(event) {
    const index = event.target.selectedIndex;
    const timeframeKey = event.target[index].value;
    this.setState({timeframe : timeframeKey});
  }

  handleSort(event) {
    const sortOrder = event.target.id;
    this.setState({ordering : sortOrder});
  }

  handlePosition(event) {
    const position = event.target.id;
    var result = this.state.players;
    var playersToFilter = this.state.players;
    if (this.state.players.length === 0 || this.state.players[0] === undefined) {
      result = allPlayers;
      playersToFilter = allPlayers;
    }
    switch (position) {
      case "PG":
        result = playersToFilter.filter(player => (
          player.position.includes("G") && !player.position.includes("F")
        ));
        break;
      case "SG":
        result = playersToFilter.filter(player => (
          player.position.includes("G")
        ));
        break;
      case "SF":
        result = playersToFilter.filter(player => (
          player.position.includes("F") && !player.position.includes("C")
        ));
        break;
      case "PF":
        result = playersToFilter.filter(player => (
          player.position.includes("F") && !player.position.includes("G")
        ));
        break;
      case "F":
      case "C":
      case "G":
        result = playersToFilter.filter(player => (
          player.position.includes(position)
        ));
        break;
      default:
        break;
    }
    this.setState({ galleryPlayers : result});
  }

  resetSearch() {
    if (document.getElementById("SearchInputID") != null) {
      document.getElementById("SearchInputID").value = "";
    }
    if (document.getElementById("TimeframeSelectID") != null) {
      document.getElementById("TimeframeSelectID").selectedIndex = 0;
    }
    if (document.getElementById("asc") != null) {
      document.getElementById('asc').checked = false;
    }
    if (document.getElementById("desc") != null) {
      document.getElementById('desc').checked = false;
    }
  }

  getSearchPlayers() {
    return this.state.searchPlayers;
  }

  getGalleryPlayers() {
    return this.state.galleryPlayers;
  }

  getSentimentPlayers() {
    return this.state.sentimentPlayers;
  }

  getDetailPlayers() {
    if (this.state.players.length === 0 || this.state.players[0] === undefined) {
      return allPlayers;
    }
    return this.state.players;
  }
  
  render() {
    return (
        <Router>
        <div className="App">
          <Header />
          <div className="Options">
            <Link className = "SearchLink" to = {"/Search"}>
                <a className="Option1" href="/Search" onClick={this.resetSearch}>Search</a>
            </Link>
            <Link className = "GalleryLink" to = {"/Gallery"}>
                <a className="Option2" href="#Gallery">Gallery</a>
            </Link>
          </div>
        </div>

        <Switch>
            <Route exact path= {`/Search`}>
                <Search onSearchChange={this.handleSearch} onTimeframeChange={this.handleTimeframe} onSortChange={this.handleSort}/>
                <SearchResults players={this.getSearchPlayers()} timeframe={this.state.timeframe} order={this.state.ordering}/>
            </Route>   
            <Route exact path= {`/Gallery`} >
                <Gallery onPositionChange={this.handlePosition}/>
                <GalleryResults players={this.getGalleryPlayers()}/>
            </Route>
            { this.getDetailPlayers().map((player) => (
              <Route key={player.id} exact path= {`/Detail/` + player.id} >
                  <Detail player={player} timeframe={this.state.timeframe} players={this.getDetailPlayers()}/>
              </Route>   
            ))}
          </Switch>
      </Router>
    );
  }
}

export default App;
