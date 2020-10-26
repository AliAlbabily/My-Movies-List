
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import Movie from './movie'

class searchMovies extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            movies: [],
            search: '',
        }
    }

    moviesList() {
        return this.state.movies.map(currentObj => {
            return <Movie movieObj={currentObj} key={currentObj.imdbID} />;
        })
    }

    inputSearch = event => {
        this.setState({ 
            search: event.target.value.substr(0, 20) 
        });
    }

    onSubmit = event => {
        event.preventDefault();

        // Send an http post-request to the following endpoint & bring back info
        axios.post('http://www.omdbapi.com/?apikey=71470024&s='+this.state.search+'&type=movie')   
            .then(res => {
                console.log(res.data)
                // 
                if(res.data.Search.length) {
                    this.setState({ 
                        movies: res.data.Search
                    })
                } else {
                    this.setState({ 
                        defaultMess: "No Results Found"
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            });

        this.setState({ 
            // clear list for new results 
            movies: []
        });
    }

    render() { 
        return ( 
            <div className="row">
                <div className="search-movies-container">
                    <form onSubmit={this.onSubmit}>
                        <input type="text"
                            required
                            placeholder="Enter a movie name"
                            value={this.state.search}
                            onChange={this.inputSearch}
                        />
                        <input type="submit" value="Search" className="stylish-btn"/>
                    </form>
                </div>
                <div className="movies-container">
                    {!this.state.movies.length ? <h2 className="container-empty-heading">Search For Movies</h2> : this.moviesList()}
                </div>
            </div> 
        );
    }
}

export default searchMovies;