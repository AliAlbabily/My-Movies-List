import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import LoginComponent from './login-popup';

function Navbar() {
    const [open, setOpen] = useState(false);

    const openLoginPopup = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <div className={"nav-style row autumn"}>
            <ul className="navbar-first-column">
                <li><Link to="/" className="link-style">Home</Link></li>
                <li><Link to="/searchmovies" className="link-style">Search for Movies</Link></li>
                <li><Link to="/searchseries" className="link-style">Search for Series</Link></li>
                <li><Link to="/mymovieslist" className="link-style">My list</Link></li>
            </ul>
            <div className="navbar-second-column">
                <span className="link-style" onClick={openLoginPopup}>Sign in with Google: <i className="fas fa-sign-in-alt"></i></span>
                <LoginComponent open={open} onClose={handleClose} />
            </div>
        </div>
    );
}

export default Navbar;