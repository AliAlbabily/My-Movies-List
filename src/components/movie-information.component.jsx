
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class MovieInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moviePoster: '', 
            movieTitle: '',
            movieGenre: '',
            movieRuntime: '',
            moviePlot: '',
            selectedValue: 'Watching',
            postMessage: '',
            // TODO: not a likeable solution
            postMessClasses: ''
        }
    }

    componentDidMount() {
        axios.get('http://www.omdbapi.com/?apikey=71470024&i='+this.props.match.params.id)
            .then(response => {
                this.setState({
                    moviePoster: response.data.Poster, 
                    movieTitle: response.data.Title,
                    movieGenre: response.data.Genre,
                    movieRuntime: response.data.Runtime,
                    moviePlot: response.data.Plot
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

        const movie = {
            poster: this.state.moviePoster,
            title: this.state.movieTitle,
            genre: this.state.movieGenre,
            runtime: this.state.movieRuntime,
            plot: this.state.moviePlot,
            status: this.state.selectedValue 
        }

        console.log(movie);

        // Send http post-request to the following endpoint
        axios.post('http://localhost:5000/movies/add', movie)
            .then(res => {
                this.setState({
                    postMessage: "The movie was successfully added to your list!",
                    postMessClasses: "post-mess-returned successfull-mess-return"
                });
                console.log(res.data);
            })
            // TODO: Not sure if this is a good way of returning an error
            .catch(error => {
                this.setState({
                    postMessage: "Something went wrong!",
                    postMessClasses: "post-mess-returned unsuccessfull-mess-return"
                })
                console.log(error);
            });
    }

    render() {
        return (
            <div className="movie-content-container">
                <div className="movie-content-container-c1">
                    <img src={this.state.moviePoster} className="movie-poster-mini" alt="" />
                </div>
                <div className="movie-content-container-c2">
                    <div className="movie-content-container-c2-r1"> 
                        <p className="movie-title">{this.state.movieTitle}</p>
                        <p className="movie-genre">{this.state.movieGenre}</p>
                        <p className="movie-runtime">{this.state.movieRuntime}</p>
                        <p className="movie-plot">{this.state.moviePlot}</p>
                    </div>
                    <div className="movie-content-container-c2-r2">
                        <form onSubmit={this.handleSubmit}>
                            <div className="movie-form-c1">
                                <label className="movie-form-label">Add to my list: </label>
                                <select value={this.state.selectedValue} onChange={this.handleSelectChange} required>
                                    <option>Watching</option>
                                    <option>Watch later</option>
                                    <option>Watched</option>   
                                </select>
                            </div>
                            <div className="movie-form-c2">
                                <button type="submit" className="movie-form-btn">Save option</button>
                            </div>
                        </form>
                    </div>
                    <div className="movie-content-container-c2-r3">
                        <p className={this.state.postMessClasses}>{this.state.postMessage}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieInformation;