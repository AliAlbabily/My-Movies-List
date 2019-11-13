
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
            selectValue: 'Watching'
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
            selectValue: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        console.log("Working")
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
                                <select value={this.state.selectValue} onChange={this.handleSelectChange} required>
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
                </div>
            </div>
        );
    }
}

export default MovieInformation;