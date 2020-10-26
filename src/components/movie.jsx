
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class Movie extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            movieId: props.movieObj.imdbID,
            movieSource: props.movieObj.Poster
        }
    }

    render() { 
        return ( 
            <Link to={"/movies/"+this.state.movieId} className="container-movie-link">
                <img src={this.state.movieSource} alt="" />
            </Link>
        );
    }
}

export default Movie;