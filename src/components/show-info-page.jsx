import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';

function MovieInformation(props) {
    const [showInfo, setShowInfo] = useState({});
    const selectedValueRef = useRef("");
    const [postMessage, setPostMessage] = useState("");
    const [postMessClasses, setPostMessClasses] = useState("");
    const [showIsAlreadyAdded, setShowIsAlreadyAdded] = useState(false);

    // get a specific show, on page open, to view
    useEffect(() => {
        axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDBAPI_API_KEY}&i=${props.match.params.id}`)
            .then(response => {
                console.log(response)
                setShowInfo(response.data)
            })
            .catch(function(error) {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        checkIfShowExistsInDB()
    }, [showInfo])

    const checkIfShowExistsInDB = () => {
        axios.get("http://localhost:5000/movies/")
            .then(response => {
                if (response.data) {
                    // loop through all the shows in the database to check and compare each imdbID with the current one
                    const showsArrayOfIDs = response.data.map(showDBObj => showDBObj.imdbid)
                    if (showsArrayOfIDs.includes(showInfo.imdbID)) {
                        setPostMessage("This show already exists in your list!")
                        setPostMessClasses("")
                        setShowIsAlreadyAdded(true)
                    }
                }
                else throw new Error("Error checking the shows from the database.")
            })
            .catch(error => {
                console.error(error)
            })
    }

    const saveShowToDB = movieObj => {
        axios.post('http://localhost:5000/movies/add', movieObj)
            .then(response => {
                if (response.data) {
                    setPostMessage("The show was successfully added to your list!")
                    setPostMessClasses("successfull-mess")
                }
                else throw new Error("Adding the show has failed.")
            })
            .catch(error => {
                console.error(error)
                setPostMessage("Something went wrong!")
                setPostMessClasses("unsuccessfull-mess")
            })
    }

    const handleSubmit = event => {
        event.preventDefault()

        const movie = {
            poster: showInfo.Poster,
            title: showInfo.Title,
            genre: showInfo.Genre,
            type: showInfo.Type,
            runtime: showInfo.Runtime,
            plot: showInfo.Plot,
            imdbid: showInfo.imdbID,
            status: selectedValueRef.current.value 
        }

        if (showIsAlreadyAdded) {
            setPostMessage("You have already added this show to your list.")
            setPostMessClasses("unsuccessfull-mess")
        }
        else {
            saveShowToDB(movie)
            setShowIsAlreadyAdded(true) // to prevent adding the same show more than one time
        }
    }

    return ( 
        <div className="show-information-container row">
            <div>
                <img src={showInfo.Poster} className="show-poster" alt="" />
            </div>
            <div>
                <div className="show-info-col2-row1">
                    <p className="show-title">{showInfo.Title}</p>
                    <p className="show-plot">{showInfo.Plot}</p>
                    <p className="show-genre">{showInfo.Genre}</p>
                    <p className="show-runtime">{showInfo.Runtime}</p>
                </div>
                <div className="show-info-col2-row2">
                    <form onSubmit={handleSubmit}>
                        <div className="show-form-col1">
                            <label className="show-form-label">Add to my list:</label>
                            <select ref={selectedValueRef} required>
                                <option>Watching</option>
                                <option>Watch later</option>
                                <option>Watched</option>   
                            </select>
                        </div>
                        <div className="show-form-col2">
                            <button type="submit" className="show-form-btn stylish-btn">Save option</button>
                        </div>
                    </form>
                </div>
                <div className="show-content-col2-row3">
                    <p className={"post-mess-returned " + postMessClasses}>{postMessage}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieInformation;