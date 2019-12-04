
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import SavedMovie from './saved-movie.component';

class MyMoviesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMovies: [],
            currentlyWatching: [],
            planningToWatch: [],
            watchedMovies: [],
            noFilteringIsMade: true,
            runFilter: () => {},
            allMoviesBtnIsClicked: true,
            currentlyWatchingBtnIsClicked: false,
            planningToWatchBtnIsClicked: false,
            watchedMoviesBtnIsClicked: false
        }
    }

    componentDidMount() { 
        // Get all my saved movies from the database
        axios.get('http://localhost:5000/movies')
            .then(
                response => {
                    this.setState({
                        allMovies: response.data,
                        currentlyWatching: response.data.filter(movieObj => movieObj.status === 'Watching'),
                        planningToWatch: response.data.filter(movieObj => movieObj.status === 'Watch later'),
                        watchedMovies: response.data.filter(movieObj => movieObj.status === 'Watched')
                    })
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }

    getAllMovies() {
        let itemNumberCounter = 0; 
        return this.state.allMovies.map(movieObj => {
            itemNumberCounter++;
            return <SavedMovie movie={movieObj} number={itemNumberCounter} deleteMovie={this.deleteMovie} key={movieObj._id} />
        })
    }

    getCurrentlyWatching() {
        let itemNumberCounter = 0; 
        return this.state.currentlyWatching.map(movieObj => {
            itemNumberCounter++;
            return <SavedMovie movie={movieObj} number={itemNumberCounter} deleteMovie={this.deleteMovie} key={movieObj._id} />
        })
    }

    getPlanningToWatch() {
        let itemNumberCounter = 0; 
        return this.state.planningToWatch.map(movieObj => {
            itemNumberCounter++;
            return <SavedMovie movie={movieObj} number={itemNumberCounter} deleteMovie={this.deleteMovie} key={movieObj._id} />
        })
    }

    getWathedMovies() {
        let itemNumberCounter = 0; 
        return this.state.watchedMovies.map(movieObj => {
            itemNumberCounter++;
            return <SavedMovie movie={movieObj} number={itemNumberCounter} deleteMovie={this.deleteMovie} key={movieObj._id} />   
        })
    }

    deleteMovie = (id) => {
        axios.delete('http://localhost:5000/movies/'+id)
            .then(response => { console.log(response.data)});
        this.setState({
            allMovies: this.state.allMovies.filter(el => el._id !== id)
        })
    }

    render() { 
        return ( 
            <div className="moviesList-container">
                <div className="moviesList-c1">
                    <div className={this.state.allMoviesBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} onClick={() => {
                            this.setState({
                                noFilteringIsMade: true,
                                runFilter: this.getAllMovies(),
                                allMoviesBtnIsClicked: true,
                                currentlyWatchingBtnIsClicked: false,
                                planningToWatchBtnIsClicked: false,
                                watchedMoviesBtnIsClicked: false
                            })
                        }}>
                        All Movies
                    </div>
                    <div className={this.state.currentlyWatchingBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} onClick={() => {
                            this.setState({
                                noFilteringIsMade: false,
                                runFilter: this.getCurrentlyWatching(),
                                allMoviesBtnIsClicked: false,
                                currentlyWatchingBtnIsClicked: true,
                                planningToWatchBtnIsClicked: false,
                                watchedMoviesBtnIsClicked: false
                            })
                        }}>
                        Watching
                    </div>
                    <div className={this.state.planningToWatchBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} onClick={() => {
                            this.setState({
                                noFilteringIsMade: false,
                                runFilter: this.getPlanningToWatch(),
                                allMoviesBtnIsClicked: false,
                                currentlyWatchingBtnIsClicked: false,
                                planningToWatchBtnIsClicked: true,
                                watchedMoviesBtnIsClicked: false
                            })
                        }}>
                        Plan to Watch
                    </div>
                    <div className={this.state.watchedMoviesBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} onClick={() => {
                            this.setState({
                                noFilteringIsMade: false,
                                runFilter: this.getWathedMovies(),
                                allMoviesBtnIsClicked: false,
                                currentlyWatchingBtnIsClicked: false,
                                planningToWatchBtnIsClicked: false,
                                watchedMoviesBtnIsClicked: true
                            })
                        }}>
                        Watched
                    </div>
                </div>
                <div className="moviesList-c2">
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
                            {   
                                this.state.noFilteringIsMade ? this.getAllMovies() : this.state.runFilter 
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MyMoviesList;