import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

import SavedMovie from './saved-show';

function MyMoviesList() {
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
        if (selectedMovieStatus === "none") getAllShows()
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

    function updateList(id) {
        setDisplayedMovies(prevList => {
            return prevList.map(showObj => {
                if (!showObj) return
                if (showObj.props.movie._id != id) return showObj
            })
        })
    }

    function deleteMovie(id) {
        axios.delete('http://localhost:5000/movies/'+id)
            .then(response => {
                console.log(response.data)
                updateList(id)
            })
    }

    /** fetch a new list of shows from the database */
    async function getAllShows() {
        await axios.get('http://localhost:5000/movies')
            .then(
                response => {
                    setDisplayedMovies(response.data.map((movieObj, index) => {
                        return <SavedMovie movie={movieObj} number={index+1} deleteMovie={deleteMovie} key={movieObj._id} />
                    }))
                }
            )
            .catch((error) => console.log(error))
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
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{displayedMovies}</tbody>
                </table>
            </div>
        </div>
    );
}

export default MyMoviesList;