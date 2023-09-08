import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';

function EditMovieInformation(props) {
    const [showInfo, setShowInfo] = useState({});
    const selectedValueRef = useRef("");
    const [postMessage, setPostMessage] = useState("");
    const [postMessClasses, setPostMessClasses] = useState("");

    // get a specific show, on page open, to edit
    useEffect(() => {
        axios.get("http://localhost:5000/movies/"+props.match.params.id) 
            .then(response => {
                console.log(response)
                setShowInfo(response.data)
            })
            .catch(function(error){
                console.log(error)
            })
    }, []) // empty array [] means this useEffect will at least once on render

    const handleSubmit = event => {
        event.preventDefault()
        
        // object spread syntax to create a new object with an updated property
        const updatedObject = {
            ...showInfo,  // copy all properties from "showInfo"
            status: selectedValueRef.current.value  // update the "status" property
        }

        // post request to update the show's status
        axios.post(`http://localhost:5000/movies/update/${props.match.params.id}`, updatedObject)
            .then(response => {
                setPostMessage("Successfully updated!")
                setPostMessClasses("successfull-mess")
                console.log(response.data)
            })
            .catch(error => {
                setPostMessage("Something went wrong! Couldn't update movie info.")
                setPostMessClasses("unsuccessfull-mess")
                console.log(error)
            })
    }

    return ( 
        <div className="show-information-container row">
            <div>
                <img src={showInfo.poster} className="show-poster" alt="" />
            </div>
            <div>
                <div className="show-info-col2-row1"> 
                    <p className="show-title">{showInfo.title}</p>
                    <p className="show-genre">{showInfo.genre}</p>
                    <p className="show-runtime">{showInfo.runtime}</p>
                    <p className="show-plot">{showInfo.plot}</p>
                </div>
                <div className="show-info-col2-row2">
                    <form onSubmit={handleSubmit}>
                        <div className="show-form-col1">
                            <label className="show-form-label">Add to my list: </label>
                            <select ref={selectedValueRef} required> 
                                <option>Watching</option>
                                <option>Watch later</option>
                                <option>Watched</option>   
                            </select>
                        </div>
                        <div className="show-form-col2">
                            <button type="submit" className="show-form-btn stylish-btn">Update option</button>
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

export default EditMovieInformation;