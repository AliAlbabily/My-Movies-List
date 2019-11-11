
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import Movie from './movie.component'

// Movie component inside ExercisesList file
// const Movie = props => (
//     <img src={} />
// )

class searchMovies extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            movies: [],
            search: ''
        }
    }

    checkList() {
        let arr = this.state.movies;
        return arr.length === 0 ? <h2>Search for movies and Tv-shows:</h2> : this.moviesList();
    }

    moviesList() {
        return this.state.movies.map(currentObj => {
            return <Movie movieObj={currentObj} key={currentObj.imdbID} />;
        })
    }

    onChangeSearch(event) {
        this.setState({ 
            search: event.target.value.substr(0, 20) 
        });
    }

    onSubmit(e) {
        e.preventDefault();

        // Send an http post-request to the following endpoint & bring back info
        axios.post('http://www.omdbapi.com/?apikey=71470024&s='+this.state.search)
            // .then(res => console.log(res.data))    
            .then(res => {
                this.setState({ 
                    movies: res.data.Search
                })
            });

        // clean input-text-field for a new search
        this.setState({ 
            search: ''
        });
    }

    render() { 
        return ( 
            <div>
                <form onSubmit={this.onSubmit}>
                    <div> 
                        <label>Enter a movie name: </label>
                        <input  type="text"
                            required
                            value={this.state.search}
                            onChange={this.onChangeSearch}
                            />
                    </div>
                    <input type="submit" value="Search" />
                </form>

                <div className="movies-container">
                    {this.checkList()}
                </div>
            </div> 
        );
    }
}

export default searchMovies;