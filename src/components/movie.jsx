
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
            <div className="container-movie-item">
                <Link to={"/movies/"+this.state.movieId}>
                    <img src={this.state.movieSource} alt="" />
                </Link>
            </div>
        );
    }
}

export default Movie;