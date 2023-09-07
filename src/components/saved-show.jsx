import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function SavedMovie(props) {
    return ( 
        <tr>
            <td>{props.number}</td>
            <td>
                <img src={props.movie.poster} alt="" className="table-poster" />
            </td>
            <td>{props.movie.title}</td>
            <td>{props.movie.genre}</td>
            <td>{props.movie.type}</td>
            <td>{props.movie.status}</td>
            <td>
                <Link to={"/edit-movie-inforamtion/"+props.movie._id} className="table-edit-btn">Edit</Link> 
                <span> | </span> 
                <span className="table-remove-btn" onClick={() => { props.deleteMovie(props.movie._id) }}>Remove</span>
            </td>
        </tr>
    );
}

export default SavedMovie;