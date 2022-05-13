import { Component } from 'react';
import './GalleryResults.css'
import {
    Link,
  } from "react-router-dom";

class GalleryResults extends Component {
    render() {
        return (
            <div className = "GalleryResults" id = "GalleryResultsID">
                {this.props.players.map((player) => (
                    <Link className = "GalleryItem" to={"/Detail/" + player.id}>
                        <img className = "GalleryPlayerImage" alt = "headshot of player" src = {"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + player.personId + ".png"}/>
                        <h3 className = "GalleryName">{player.first_name + " " + player.last_name}</h3>
                    </Link>     
                ))}
            </div>
        );  
    }

}
  
export default GalleryResults;