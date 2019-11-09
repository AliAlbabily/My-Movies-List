
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar-style">
                <div className="">
                    <ul className="">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/searchmovies" className="nav-link">Search for Movies</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;