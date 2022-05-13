
import { Component } from 'react';
import './Header.css'
import {
  Link
} from "react-router-dom";

class Header extends Component {
    render() {
        return (
          <Link className = "HeaderLink" to = {`/Search`}>
            <div className = "Header">
              NBA Player Twitter Sentiment
            </div>
          </Link>
        );
      }
  }

  export default Header;