
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import Movie from './show-link'

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

    inputSearch = event => {
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
            <div className="row">
                <div className="search-shows-container">
                    <form onSubmit={this.onSubmit}>
                        <input type="text"
                            required
                            placeholder="Enter a series name"
                            value={this.state.search}
                            onChange={this.inputSearch}
                        />
                        <input type="submit" value="Search" className="stylish-btn"/>
                    </form>
                </div>
                <div className="shows-container">
                    {!this.state.series.length ? <h2 className="container-empty-heading">Search For Series</h2> : this.seriesList()}
                </div>
            </div> 
        );
    }
}

export default searchSeries;