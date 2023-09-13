import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../App.css';

import Movie from './show-card'

function SearchSeries() {
    const searchStringRef = useRef("");
    const [searchedSeries, setSearchedSeries] = useState(null);

    const seriesList = () => {
        return searchedSeries.map(currentObj => {
            return <Movie movieObj={currentObj} key={currentObj.imdbID} />
        })
    }

    const handleOnSubmit = event => {
        event.preventDefault()

        // send an http post-request to the following endpoint & bring back info
        axios.post(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDBAPI_API_KEY}&s=${searchStringRef.current.value}&type=series`)
            .then(res => {
                console.log(res.data)
                if(res.data.Response === "True") {
                    setSearchedSeries(res.data.Search)
                } 
                else throw new Error('Search failed')
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    return ( 
        <div className="row">
            <div className="search-shows-container">
                <form onSubmit={handleOnSubmit}>
                    <input type="text" placeholder="Enter a series name" ref={searchStringRef} required />
                    <input type="submit" value="Search" className="stylish-btn"/>
                </form>
            </div>
            <div className="shows-container">
                {!searchedSeries ? <h2 className="container-empty-heading">Search For Series</h2> : seriesList()}
            </div>
        </div>
    );
}

export default SearchSeries;