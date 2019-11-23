
import React, { Component } from 'react';
import axios from 'axios';

import SavedMovie from './saved-movie.component';

class MyMoviesList extends Component {
    constructor(props) {
        super(props);

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
        return this.state.allMovies.map(movieObj => {
            return <SavedMovie movie={movieObj} key={movieObj.imdbid} />
        })
    }

    render() { 
        return ( 
            <div>
                {this.printMovies()}
            </div>
        );
    }
}

export default MyMoviesList;