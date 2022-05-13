import { Component } from 'react';
import './Search.css'
import PropTypes from "prop-types";

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleTimeframeChange = this.handleTimeframeChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    static propTypes = {
        onSearchChange: PropTypes.func,
        onTimeframeChange: PropTypes.func,
        onSortChange: PropTypes.func
    };
    
    static defaultProps = {
        onSearchChange: () => { },
        onTimeframeChange: () => { },
        onSortChange: () => { }
    }
    
    handleSearchChange(event) {
        const onSearchChange = this.props.onSearchChange;
        onSearchChange(event);
    }

    handleTimeframeChange(event) {
        const onTimeframeChange = this.props.onTimeframeChange;
        onTimeframeChange(event);
    }

    handleSortChange(event) {
        const onSortChange = this.props.onSortChange;
        onSortChange(event);
    }
  
    render() {
        return (
            <div className="Search" id = "SearchID">
                <div className = "InputWrapper">
                    <input className="SearchInput" id = "SearchInputID" placeholder="Player Search" onChange={this.handleSearchChange}/>
                </div>
                <div className = "SelectWrapper">
                    <select className="TimeframeSelect" id = "TimeframeSelectID" onChange={this.handleTimeframeChange}>
                        <option value="" disabled selected>Select Timeframe</option>
                        <option value="cur_Pos%">Current</option>
                        <option value="1wk_Pos%">1 Week</option>
                        <option value="2wk_Pos%">2 Weeks</option>
                        <option value="1mth_Pos%">1 Month</option>
                        <option value="2mth_Pos%">2 Months</option>
                        <option value="full_Pos%">Full Season</option>
                    </select>
                </div>
                <div className = "SortWrapper">
                    <label className="SortAsc">
                        <input type="radio" name="optradio" id="asc" onChange={this.handleSortChange}/>Ascending
                    </label>
                    <label className="SortDesc">
                        <input type="radio" name="optradio" id="desc" onChange={this.handleSortChange}/>Descending
                    </label>
                </div>
            </div>
        );
    }
}
  
export default Search;
  