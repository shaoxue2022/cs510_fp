import { Component } from 'react';
import './SearchResults.css'
import React from "react";
import playerSentiments from '../JsonData/player_sentiment.json';
import {
  Link,
} from "react-router-dom";


class SearchResults extends Component {  
    constructor(props) {
        super(props);
        this.players = this.props.players;
        this.orderPlayers = this.orderPlayers.bind(this);
        this.getPlayerSentiment = this.getPlayerSentiment.bind(this);
    }
    
    orderPlayers() {
        var timeframeToSort = this.props.timeframe;
        if (this.props.order === "asc") {
          this.players.sort(function(a, b) {
            return a[timeframeToSort] - b[timeframeToSort];
          });
        } else if (this.props.order === "desc") {
          this.players.sort(function(a, b) {
            return b[timeframeToSort] - a[timeframeToSort];
          });
        }
    }

    getPlayerSentiment(firstName, lastName) {
        for (var i = 0; i < playerSentiments.length; i++) {
            var playerName = playerSentiments[i].Player.toLowerCase()
            if (playerName.includes(firstName.toLowerCase()) ||  playerName.includes(lastName.toLowerCase())) {
                return playerSentiments[i][this.props.timeframe]
            }
        }
        return 99
    }

    
    render() {
        this.players = this.props.players;
        this.orderPlayers();

        return (
            <div className = "SearchResults" id = "SearchResultsID"> 
                    
                {this.players.map((player) => (
                    <Link key={player.id} className = "PlayerLink" to={"/Detail/" + player.id}>
                        <div className = "SearchItem">
                            <div className = "PlayerImage">
                                <img className = "SearchImage" alt = "headshot of player" src = {"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + player.personId + ".png"}/> 
                            </div>
                            <div className = "SearchInfo"> 
                                <h3 className = "PlayerName">{player.first_name + " " + player.last_name}</h3>
                                <h3 className = "PlayerStat">{"Positive % : " + player[this.props.timeframe]}</h3>
                            </div>
                            <div className = "TeamImage">
                                <img className="TeamLogo" alt = "logo of team" src={"https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/" + player.team.abbreviation.toLowerCase() + ".png"}/>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ); 
    }

}
  
export default SearchResults;
