
import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

function Movie(props) {

    return ( 
        <Link to={"/movies/"+props.movieObj.imdbID} className="container-movie-link">
            <img src={props.movieObj.Poster} alt="" />
        </Link>
    );
}

export default Movie;