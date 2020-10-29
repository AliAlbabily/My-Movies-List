
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class MovieInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: {},
            selectedValue: 'Watching',
            postMessage: '',
            postMessClasses: ''
        }
    }

    componentDidMount() {
        axios.get('http://www.omdbapi.com/?apikey=71470024&i='+this.props.match.params.id)
            .then(response => {
                console.log(response);

                this.setState({
                    showInfo: response.data
                })
            })
            .catch(function(error){
                console.log(error);
            })
    }

    saveItemToDB(movieObj) {
        axios.post('http://localhost:5000/movies/add', movieObj)
            .then(res => {
                this.setState({
                    postMessage: "The movie was successfully added to your list!",
                    postMessClasses: "successfull-mess"
                });
                console.log(res.data);
            })
            .catch(error => {
                this.setState({
                    postMessage: "Something went wrong!",
                    postMessClasses: "unsuccessfull-mess"
                })
                console.log(error);
            });
    }

    handleSelectChange = event => {
        this.setState({
            selectedValue: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const movie = {
            poster: this.state.showInfo.Poster,
            title: this.state.showInfo.Title,
            genre: this.state.showInfo.Genre,
            type: this.state.showInfo.Type,
            runtime: this.state.showInfo.Runtime,
            plot: this.state.showInfo.Plot,
            imdbid: this.state.showInfo.imdbID,
            status: this.state.selectedValue 
        }

        console.log(movie);

        // loop through all the imdbIDs in the database and compare them to the new imdbID
        axios.get('http://localhost:5000/movies/')
            .then(response => {
                let movieArr = response.data.map(movieDbObj => movieDbObj.imdbid);
                if(movieArr.includes(movie.imdbid)) {
                    this.setState({
                        postMessage: 'This movie already exists in your list!',
                        postMessClasses: ''
                    })
                } 
                else {
                    // Send http post-request to the following endpoint
                    this.saveItemToDB(movie);
                }
            })
    }

    render() {
        return (
            <div className="show-information-container row">
                <div>
                    <img src={this.state.showInfo.Poster} className="show-poster" alt="" />
                </div>
                <div>
                    <div className="show-info-col2-row1">
                        <p className="show-title">{this.state.showInfo.Title}</p>
                        <p className="show-plot">{this.state.showInfo.Plot}</p>
                        <p className="show-genre">{this.state.showInfo.Genre}</p>
                        <p className="show-runtime">{this.state.showInfo.Runtime}</p>
                    </div>
                    <div className="show-info-col2-row2">
                        <form onSubmit={this.handleSubmit}>
                            <div className="show-form-col1">
                                <label className="show-form-label">Add to my list:</label>
                                <select value={this.state.selectedValue} onChange={this.handleSelectChange} required>
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
                        <p className={"post-mess-returned " + this.state.postMessClasses}>{this.state.postMessage}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieInformation;