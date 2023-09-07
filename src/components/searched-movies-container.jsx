
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

import Movie from './show-card'

function SearchMovies() {
    const searchStringRef = useRef();
    const [searchedMovies, setSearchedMovies] = useState(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    useEffect(() => {
        if (currentPageNumber === 1) return // don't do any change on the first page
        getMoreData(currentPageNumber)
    }, [currentPageNumber]); // display more data on the page on every change to "currentPageNumber"

    function onSubmit(event) {
        event.preventDefault()

        // Send an http post-request to the following endpoint & bring back info
        axios.post(`http://www.omdbapi.com/?apikey=71470024&s=${searchStringRef.current.value}&type=movie`)
            .then(res => {
                if(res.data.Search) {
                    console.log(res.data.Search)
                    setSearchedMovies(res.data.Search.map(movieObj => {
                        return <Movie movieObj={movieObj} key={movieObj.imdbID} />
                    }))
                } 
                else console.log("No results found!")
            })
            .catch(function(error) {
                console.log(error)
            })

        setCurrentPageNumber(1) // reset page number back to 1 when searching for a new result
    }

    function updateData() {
        setCurrentPageNumber(currentNumber => currentNumber + 1)
    }

    function getMoreData(currentPageNumber) {
        axios.post(`http://www.omdbapi.com/?apikey=71470024&s=${searchStringRef.current.value}&type=movie&page=${currentPageNumber}`)
        .then(res => {
            if (res.data.Search.length === 0) return // as long as there is more data

            let tempList = res.data.Search.map(movieObj => {
                return <Movie movieObj={movieObj} key={movieObj.imdbID} />
            })

            setSearchedMovies(prevList => {
                return prevList.concat(tempList)           
            })
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    return ( 
        <div className="row">
            <div className="search-shows-container">
                <form onSubmit={onSubmit}>
                    <input ref={searchStringRef} type="text" placeholder="Enter a movie name" required />
                    <input type="submit" value="Search" className="stylish-btn"/>
                </form>
            </div>
            <div className="shows-container">
                {!searchedMovies ? <h2 className="container-empty-heading">Search For Movies</h2> : searchedMovies}
            </div>
            <div className="more-results-btn-container">
                {/* conditional rendering with short-circuit operator approach. 
                Using double ! to get rid of 0 when the component is rendered */}
                {!!searchedMovies && <div onClick={updateData} className="stylish-btn">Load more results ..</div>}
            </div>
        </div> 
    );
}

export default SearchMovies;