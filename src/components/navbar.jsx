
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
            <div className={"nav-style row " + this.getSeasonalBackgrounds()}>
                <ul className="navbar-first-column">
                    <li><Link to="/" className="link-style">Home</Link></li>
                    <li><Link to="/searchmovies" className="link-style">Search for Movies</Link></li>
                    <li><Link to="/searchseries" className="link-style">Search for Series</Link></li>
                    <li><Link to="/mymovieslist" className="link-style">My list</Link></li>
                </ul>
                <div className="navbar-second-column">
                    <Link to="/login" className="link-style">Sign in with Google <i className="fas fa-sign-in-alt"></i></Link>
                </div>
            </div>
        );
    }
}

export default Navbar;