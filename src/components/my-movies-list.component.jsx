
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import SavedMovie from './saved-movie.component';

class MyMoviesList extends Component {
    constructor(props) {
        super(props);

        this.deleteMovie = this.deleteMovie.bind(this);

        this.state = {
            allMovies: []
        }
    }

    componentDidMount() { 
        // Get all my saved movies from the database
        axios.get('http://localhost:5000/movies')
            .then(
                response => {
                    this.setState({
                        allMovies: response.data 
                    })
                    console.log(this.state.allMovies)
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }

    printMovies() {
        let itemNumberCounter = 0; 
        return this.state.allMovies.map(movieObj => {
            itemNumberCounter++;
            return <SavedMovie movie={movieObj} number={itemNumberCounter} deleteMovie={this.deleteMovie} key={movieObj._id} />
        })
    }

    deleteMovie(id) {
        axios.delete('http://localhost:5000/movies/'+id)
            .then(response => { console.log(response.data)});
        this.setState({
            allMovies: this.state.allMovies.filter(el => el._id !== id)
        })
    }

    render() { 
        return ( 
            <div>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th># <i className="fas fa-sort-numeric-down"></i></th>
                            <th><i className="fas fa-images"></i> Image</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printMovies()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyMoviesList;