import { Component } from 'react';
import './Detail.css'
import positionMap from '../JsonData/PositionMap.json';
import teamColorMap from '../JsonData/TeamColorMap.json'
import React from "react";
import {
    Link,
  } from "react-router-dom";

function mod(n, m) {
    return ((n % m) + m) % m;
}


class Detail extends Component {
    constructor(props) {
        super(props);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);
    }  

    setBackgroundColor() {
        if (document.getElementById("DetailID" + this.props.player.id) != null) {
            document.getElementById("DetailID" + this.props.player.id).style.backgroundColor = teamColorMap[this.props.player.team.abbreviation];
        }
    }

    render() {
        var timeframeSort = this.props.timeframe;

        this.props.players.sort(function(a,b) {
            return a[timeframeSort] - b[timeframeSort];
        });
        var curIndex = this.props.players.findIndex(player => player.id===this.props.player.id);
        var prevPlayer = mod(curIndex - 1, this.props.players.length);
        var nextPlayer = mod(curIndex + 1, this.props.players.length);

        return (
            <div className="Detail" id = {"DetailID" + this.props.player.id} onLoad= {this.setBackgroundColor}>
                <div className = "DetailLogo">
                    <img className="DetailTeamLogo" alt = "logo of team" src={"https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/" + this.props.player.team.abbreviation.toLowerCase() + ".png"}/>
                </div>
                <div className = "DetailInfo">
                    <Link className = "DetailArrow" to={"/Detail/" + this.props.players[prevPlayer].id}>
                        <a className="prev" href="/#">&#10094;</a>
                    </Link>
                    <img className="DetailPlayerImage" alt = "headshot of player" src={"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + this.props.player.personId + ".png"}/>
                    <div className = "DetailPlayerInfo">
                        <h3 className = "TeamPosition">{this.props.player.team.full_name + " | " + positionMap[this.props.player.position]}</h3>
                        <h1 className = "DetailPlayerFirstName">{this.props.player.first_name}</h1>
                        <h1 className = "DetailPlayerLastName">{this.props.player.last_name}</h1>
                        <h3 className = "HeightWeight">{"Height: " + this.props.player.height_feet + "'" + this.props.player.height_inches + "\" | Weight: " + this.props.player.weight_pounds + "lb"}</h3>
                        <h3 className = "HeightWeight">{"Current Positive%: " + this.props.player['cur_Pos%']}</h3>
                    </div>
                    <Link className = "DetailArrow" to={"/Detail/" + this.props.players[nextPlayer].id}>
                        <a className="next" href="/#">&#10095;</a>
                    </Link> 
                </div>
                <div className = "DetailPlayerStats">
                    <div className = "DetailStat">
                        <p className = "Stat">PPG</p>
                        <p className = "StatNumber">{this.props.player.pts}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">REB</p>
                        <p className = "StatNumber">{this.props.player.reb}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">AST</p>
                        <p className = "StatNumber">{this.props.player.ast}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">STL</p>
                        <p className = "StatNumber">{this.props.player.stl}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">BLK</p>
                        <p className = "StatNumber">{this.props.player.blk}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">MIN</p>
                        <p className = "StatNumber">{this.props.player.min}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">FG%</p>
                        <p className = "StatNumber">{this.props.player.fg_pct}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">FT%</p>
                        <p className = "StatNumber">{this.props.player.ft_pct}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">3P%</p>
                        <p className = "StatNumber">{this.props.player.fg3_pct}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">TOV</p>
                        <p className = "StatNumber">{this.props.player.turnover}</p>
                    </div>  

                    <div className = "DetailStat">
                        <p className = "Stat">1WK Pos%</p>
                        <p className = "StatNumber">{this.props.player['1wk_Pos%']}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">2WK Pos%</p>
                        <p className = "StatNumber">{this.props.player['2wk_Pos%']}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">1Mo Pos%</p>
                        <p className = "StatNumber">{this.props.player['1mth_Pos%']}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">2Mo Pos%</p>
                        <p className = "StatNumber">{this.props.player['2mth_Pos%']}</p>
                    </div>
                    <div className = "DetailStat">
                        <p className = "Stat">Season Pos%</p>
                        <p className = "StatNumber">{this.props.player['full_Pos%']}</p>
                    </div>  
                </div>  
                <div className = "DetailSentimentGraph">
                    <img className="DetailGraphImage" alt = "sentiment graph" src={"graphs/" + this.props.player.first_name + "_" + this.props.player.last_name + ".png"}/>
                </div> 
            </div>
        );
    }

}

  
export default Detail;
