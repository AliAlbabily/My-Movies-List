
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

import SavedMovie from './saved-movie.component';

function MyMoviesList() {
    const [filtering, setFiltering] = useState(false);
    const [displayedMovies, setDisplayedMovies] = useState();
    const [allMoviesBtnIsClicked, setAllMoviesBtnIsClicked] = useState(true);
    const [currentlyWatchingBtnIsClicked, setCurrentlyWatchingBtnIsClicked] = useState(false);
    const [planningToWatchBtnIsClicked, setPlanningToWatchBtnIsClicked] = useState(false);
    const [watchedMoviesBtnIsClicked, setWatchedMoviesBtnIsClicked] = useState(false);
    const [latestHighlightedBtnName, setLatestHighlightedBtnName] = useState("allMoviesBtn");

    useEffect(() => {
        // Get all my saved movies from the database
        axios.get('http://localhost:5000/movies')
            .then(
                response => {
                    // this.setState({
                    //     allMovies: response.data,
                    //     currentlyWatching: response.data.filter(movieObj => movieObj.status === 'Watching'),
                    //     planningToWatch: response.data.filter(movieObj => movieObj.status === 'Watch later'),
                    //     watchedMovies: response.data.filter(movieObj => movieObj.status === 'Watched')
                    // })

                    setDisplayedMovies(response.data.map((movieObj, index) => {
                        return <SavedMovie movie={movieObj} number={index+1} deleteMovie={deleteMovie} key={movieObj._id} />
                    }))
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }, []) /// empty array [] means this useEffect will run once similar to componentDidMount()

    // function getAllMovies() {
        // let itemNumberCounter = 0; 
        // return movies.map(movieObj => {
        //     itemNumberCounter++;
        //     return <SavedMovie movie={movieObj} number={itemNumberCounter} deleteMovie={this.deleteMovie} key={movieObj._id} />
        // })
    // }

    // getCurrentlyWatching() {
    //     let itemNumberCounter = 0; 
    //     return this.state.currentlyWatching.map(movieObj => {
    //         itemNumberCounter++;
    //         return <SavedMovie movie={movieObj} number={itemNumberCounter} deleteMovie={this.deleteMovie} key={movieObj._id} />
    //     })
    // }

    // getPlanningToWatch() {
    //     let itemNumberCounter = 0; 
    //     return this.state.planningToWatch.map(movieObj => {
    //         itemNumberCounter++;
    //         return <SavedMovie movie={movieObj} number={itemNumberCounter} deleteMovie={this.deleteMovie} key={movieObj._id} />
    //     })
    // }

    // getWathedMovies() {
    //     let itemNumberCounter = 0; 
    //     return this.state.watchedMovies.map(movieObj => {
    //         itemNumberCounter++;
    //         return <SavedMovie movie={movieObj} number={itemNumberCounter} deleteMovie={this.deleteMovie} key={movieObj._id} />   
    //     })
    // }

    function deleteMovie(id) {
        axios.delete('http://localhost:5000/movies/'+id)
            .then(async response => { // async-await will make sure to print the result before updating the state
                console.log(response.data)
                await updateMoviesList()
            })
    }

    /** update the list of movies by fetching a new movie list from the database */
    async function updateMoviesList() {
        await axios.get('http://localhost:5000/movies')
            .then(
                response => {
                    setDisplayedMovies(response.data.map((movieObj, index) => {
                        return <SavedMovie movie={movieObj} number={index+1} deleteMovie={deleteMovie} key={movieObj._id} />
                    }))
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }

    function resetPreviousBtn(highlightedBtnName) {
        if (latestHighlightedBtnName === "allMoviesBtn") setAllMoviesBtnIsClicked(false)
        else if (latestHighlightedBtnName === "currentlyWatchingBtn") setCurrentlyWatchingBtnIsClicked(false)
        else if (latestHighlightedBtnName === "planningToWatchBtn") setPlanningToWatchBtnIsClicked(false)
        else if (latestHighlightedBtnName === "watchedMoviesBtn") setWatchedMoviesBtnIsClicked(false)
        setLatestHighlightedBtnName(highlightedBtnName)
    }

    return ( 
        <div className="moviesList-container">
            <div className="moviesList-c1">
                <div 
                    className={allMoviesBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} 
                    onClick={() => {
                        resetPreviousBtn("allMoviesBtn")
                        setAllMoviesBtnIsClicked(true)
                    }}>
                    All Movies
                </div>
                <div 
                    className={currentlyWatchingBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} 
                    onClick={() => {
                        resetPreviousBtn("currentlyWatchingBtn")
                        setCurrentlyWatchingBtnIsClicked(true)
                    }}>
                    Watching
                </div>
                <div 
                    className={planningToWatchBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} 
                    onClick={() => {
                        resetPreviousBtn("planningToWatchBtn")
                        setPlanningToWatchBtnIsClicked(true)
                    }}>
                    Plan to Watch
                </div>
                <div 
                    className={watchedMoviesBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} 
                    onClick={() => {
                        resetPreviousBtn("watchedMoviesBtn")
                        setWatchedMoviesBtnIsClicked(true)
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
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{ !filtering ? displayedMovies : console.log("this.state.runFilter") }</tbody>
                </table>
            </div>
        </div>
    );
}

export default MyMoviesList;