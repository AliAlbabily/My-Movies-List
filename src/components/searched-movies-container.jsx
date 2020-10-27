
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
            currentPage: 1
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
        axios.post(`http://www.omdbapi.com/?apikey=71470024&s=${this.state.search}&type=movie`)
            .then(res => {
                console.log(res.data)
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
            .catch(function(error) {
                console.log(error)
            });

        this.setState({ 
            movies: [], // clear list for new results 
            currentPage: 1 // reset page number back to 1
        });
    }

    getMoreData = event => {
        axios.post(`http://www.omdbapi.com/?apikey=71470024&s=${this.state.search}&type=movie&page=${this.state.currentPage+1}`)
            .then(res => {
                console.log(res.data.Search)
                res.data.Search.map(object => { // loop through the array
                    this.setState({
                        movies: [...this.state.movies, object] // push each new object into movies-list inside the state
                    })
                })
            })
            .catch(function(error) {
                console.log(error)
            });

        this.setState({ 
            currentPage: this.state.currentPage+1 // increment page number by 1
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
                <div className="more-results-btn-container">
                    <div onClick={this.getMoreData} className="stylish-btn">Load more results ..</div>
                </div>
            </div> 
        );
    }
}

export default searchMovies;