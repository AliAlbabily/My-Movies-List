
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
            moviePlot: ''
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

    render() {
        return (
            <div>
                <img src={this.state.moviePoster} alt="" />
                <p className="movie-title">{this.state.movieTitle}</p>
                <p className="movie-genre">{this.state.movieGenre}</p>
                <p className="movie-runtime">{this.state.movieRuntime}</p>
                <p className="movie-plot">{this.state.moviePlot}</p>
            </div>
        );
    }
}

export default MovieInformation;