
import React, { Component } from 'react';

class SavedMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() { 
        return ( 
            <div>
                <p>Movie name: {this.props.movie.title}</p>
            </div>
        );
    }
}

export default SavedMovie;