
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class Movie extends Component {

    render() {
        return ( 
            <Link to={"/movies/"+this.props.movieObj.imdbID} className="container-movie-link">
                <img src={this.props.movieObj.Poster} alt="" />
            </Link>
        );
    }
}

export default Movie;