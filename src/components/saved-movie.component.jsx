
import React, { Component } from 'react';
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
                <td>{this.props.movie.status}</td>
                <td>
                    <i class="far fa-edit"></i> Edit | <i class="fas fa-trash"></i> Remove
                </td>
            </tr>
        );
    }
}

export default SavedMovie;