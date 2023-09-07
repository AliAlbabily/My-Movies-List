
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class EditMovieInformation extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            showInfo: {},
            selectedValue: '',
            postMessage: '',
            // TODO: not a likeable solution
            postMessClasses: ''
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/movies/'+this.props.match.params.id) 
            .then(response => {
                console.log(response)

                this.setState({
                    showInfo: response.data,
                    selectedValue: response.data.status
                })
            })
            .catch(function(error){
                console.log(error);
            })
    }

    handleSelectChange = event => {
        this.setState({
            selectedValue: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const movie = this.state.showInfo // create a new object to send to the database
        movie.status = this.state.selectedValue // add an additional property to the show object

        console.log(movie);

        // Do an update-request
        axios.post('http://localhost:5000/movies/update/'+this.props.match.params.id, movie)
            .then(res => {
                this.setState({
                    postMessage: "Successfully updated!",
                    postMessClasses: " successfull-mess"
                });
                console.log(res.data);
            })
            .catch(error => {
                this.setState({
                    postMessage: "Something went wrong! Couldn't update movie info.",
                    postMessClasses: " unsuccessfull-mess"
                })
                console.log(error);
            });
    }

    render() { 
        return ( 
            <div className="show-information-container row">
                <div>
                    <img src={this.state.showInfo.poster} className="show-poster" alt="" />
                </div>
                <div>
                    <div className="show-info-col2-row1"> 
                        <p className="show-title">{this.state.showInfo.title}</p>
                        <p className="show-genre">{this.state.showInfo.genre}</p>
                        <p className="show-runtime">{this.state.showInfo.runtime}</p>
                        <p className="show-plot">{this.state.showInfo.plot}</p>
                    </div>
                    <div className="show-info-col2-row2">
                        <form onSubmit={this.handleSubmit}>
                            <div className="show-form-col1">
                                <label className="show-form-label">Add to my list: </label>
                                <select value={this.state.selectedValue} onChange={this.handleSelectChange} required>
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
                        <p className={"post-mess-returned" + this.state.postMessClasses}>{this.state.postMessage}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditMovieInformation;