
import React, { Component } from 'react';
import axios from 'axios';

class MovieInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movieName: ''
        }
    }

    componentDidMount() {
        axios.get('http://www.omdbapi.com/?apikey=71470024&i='+this.props.match.params.id)
            .then(response => {
                this.setState({
                    movieName: response.data.Title
                })
            })
            .catch(function(error){
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <p>{this.state.movieName}</p>
            </div>
        );
    }
}

export default MovieInformation;