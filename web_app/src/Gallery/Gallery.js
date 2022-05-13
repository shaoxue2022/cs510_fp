import { Component } from 'react';
import './Gallery.css'
import PropTypes from "prop-types";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.handlePositionChange = this.handlePositionChange.bind(this);
    }
    static propTypes = {
        onPositionChange: PropTypes.func,
    };
    
    static defaultProps = {
        onPositionChange: () => { }
    }

    handlePositionChange(event) {
        const onPositionChange = this.props.onPositionChange;
        onPositionChange(event);
    }

    render() {
        return (
            <div className="Gallery" id = "GalleryID">
                <button className = "Position" id = "All" onClick={this.handlePositionChange}>All</button>
                <button className = "Position" id = "PG" onClick={this.handlePositionChange}>PG</button>
                <button className = "Position" id = "SG" onClick={this.handlePositionChange}>SG</button>
                <button className = "Position" id = "G" onClick={this.handlePositionChange}>G</button>
                <button className = "Position" id = "SF" onClick={this.handlePositionChange}>SF</button>
                <button className = "Position" id = "PF" onClick={this.handlePositionChange}>PF</button>
                <button className = "Position" id = "F" onClick={this.handlePositionChange}>F</button>
                <button className = "Position" id = "C" onClick={this.handlePositionChange}>C</button>
            </div>
        );
    }
}
  
export default Gallery;
