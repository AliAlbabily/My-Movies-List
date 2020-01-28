
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class Navbar extends Component {
    state = {
        time: Date(),
        winterStarts: new Date(2019, 11, 22), // Dec
        springStarts: new Date(2020, 2, 20), // Mars
        summerStarts: new Date(2020, 5, 20), // Juni
        autumnStarts: new Date(2020, 8, 22), // Sep
    }

    componentDidMount() { 
        let current_formatted_datetime = new Date();

        this.setState({
            time: current_formatted_datetime
        })
    }

    getSeasonalBackgrounds = () => {
        if (this.state.time >= this.state.winterStarts && this.state.time < this.state.springStarts) {
            return "winter";
        } 
        if (this.state.time >= this.state.springStarts && this.state.time < this.state.summerStarts) {
            return "spring";
        } 
        if (this.state.time >= this.state.summerStarts && this.state.time < this.state.autumnStarts) {
            return "summer";
        }
        if (this.state.time >= this.state.autumnStarts) {
            return "autumn";
        }
    }

    render() {
        return (
            <div className="nav-style">
                <div className={"navbar-first-column " + this.getSeasonalBackgrounds()}>
                    <Link to="/" className="li-style">Home</Link>
                    <Link to="/searchmovies" className="li-style">Search for Movies</Link>
                    <Link to="/searchseries" className="li-style">Search for Series</Link>
                    <Link to="/mymovieslist" className="li-style">My list</Link>
                </div>
                <div className="navbar-second-column">
                    <Link to="/login" className="li-style">Sign in with Google <i className="fas fa-sign-in-alt"></i></Link>
                </div>
            </div>
        );
    }
}

export default Navbar;