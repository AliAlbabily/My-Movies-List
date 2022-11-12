
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
                    setDisplayedMovies(response.data.map((movieObj, index) => {
                        return <SavedMovie movie={movieObj} number={index+1} deleteMovie={deleteMovie} key={movieObj._id} />
                    }))
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }, []) /// empty array [] means this useEffect will run once similar to componentDidMount()

    function filterMoviesList(selectedMovieStatus) {
        if (selectedMovieStatus === "none") updateMoviesList()
        else {
            let itemNumberCounter = 0
            axios.get('http://localhost:5000/movies').then(
                response => {
                    setDisplayedMovies(
                        response.data.map(movieObj => {
                            if (movieObj.status === selectedMovieStatus) {
                                return <SavedMovie movie={movieObj} number={++itemNumberCounter} deleteMovie={deleteMovie} key={movieObj._id} />
                            }
                        })
                    )
                }
            )
            .catch((error) => {console.log(error)})
        }
    }

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
                        filterMoviesList("none")
                    }}>
                    All Movies
                </div>
                <div 
                    className={currentlyWatchingBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} 
                    onClick={() => {
                        resetPreviousBtn("currentlyWatchingBtn")
                        setCurrentlyWatchingBtnIsClicked(true)
                        filterMoviesList("Watching")
                    }}>
                    Watching
                </div>
                <div 
                    className={planningToWatchBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} 
                    onClick={() => {
                        resetPreviousBtn("planningToWatchBtn")
                        setPlanningToWatchBtnIsClicked(true)
                        filterMoviesList("Watch later")
                    }}>
                    Plan to Watch
                </div>
                <div 
                    className={watchedMoviesBtnIsClicked ? "moviesList-c1-filter-btn filter-is-clicked" : "moviesList-c1-filter-btn"} 
                    onClick={() => {
                        resetPreviousBtn("watchedMoviesBtn")
                        setWatchedMoviesBtnIsClicked(true)
                        filterMoviesList("Watched")
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