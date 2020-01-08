
import React, { Component } from 'react';
// import { Waypoint } from 'react-waypoint';
import axios from 'axios';
import '../App.css';

import Movie from './movie.component'

class searchSeries extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            series: [],
            search: '',
        }
    }

    seriesList() {
        return this.state.series.map(currentObj => {
            return <Movie movieObj={currentObj} key={currentObj.imdbID} />;
        })
    }

    onChangeSearch = event => {
        this.setState({ 
            search: event.target.value.substr(0, 20) 
        });
    }

    onSubmit = event => {
        event.preventDefault();

        // Send an http post-request to the following endpoint & bring back info
        axios.post('http://www.omdbapi.com/?apikey=71470024&s='+this.state.search+'&type=series')   
            .then(res => {
                console.log(res.data)
                // 
                if(res.data.Search.length) {
                    this.setState({ 
                        series: res.data.Search
                    })
                } else {
                    this.setState({ 
                        defaultMess: "No Results Found"
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            });

        this.setState({ 
            // clean input-text-field for a new search
            search: '',
            // clear list for new results 
            series: []
        });
    }

    render() { 
        return ( 
            <div>
                <div className="movies-search-section">
                    <form onSubmit={this.onSubmit}>
                        <div> 
                            <label>Enter a Series name: </label>
                            <input type="text"
                                required
                                value={this.state.search}
                                onChange={this.onChangeSearch}
                            />
                        </div>
                        <div>
                            <input type="submit" value="Search" />
                        </div>
                    </form>
                </div>
                <div className="movies-container">
                    {!this.state.series.length ? <h2 className="search-title">Search For Series</h2> : this.seriesList()}
                </div>
            </div> 
        );
    }
}

export default searchSeries;