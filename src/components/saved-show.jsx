
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class SavedMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() { 
        return ( 
            <tr>
                <td>{this.props.number}</td>
                <td>
                    <img src={this.props.movie.poster} alt="" className="table-poster" />
                </td>
                <td>{this.props.movie.title}</td>
                <td>{this.props.movie.genre}</td>
                <td>{this.props.movie.type}</td>
                <td>{this.props.movie.status}</td>
                <td>
                    <Link to={"/edit-movie-inforamtion/"+this.props.movie._id} className="table-edit-btn">Edit</Link> 
                    <span> | </span> 
                    <span className="table-remove-btn" onClick={() => { this.props.deleteMovie(this.props.movie._id) }}>Remove</span>
                </td>
            </tr>
        );
    }
}

export default SavedMovie;