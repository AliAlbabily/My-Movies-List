
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class Navbar extends Component {
    render() {
        return (
            <div className="nav-style">
                <div className="navbar-first-column">
                    <Link to="/" className="li-style">Home</Link>
                    <Link to="/searchmovies" className="li-style">Search for movies</Link>
                    <Link to="/mymovieslist" className="li-style">My movies list</Link>
                </div>
                <div className="navbar-second-column">
                    <Link to="/login" className="li-style">Log in</Link>
                </div>
            </div>
        );
    }
}

export default Navbar;