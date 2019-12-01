
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Navbar from './components/navbar.component';
import Home from './components/home.component';
import SearchMovies from './components/search-movies.component';
import MyMoviesList from './components/my-movies-list.component';
import MovieInformation from './components/movie-information.component';
import EditMovieInformation from './components/edit-movie-information.component';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" component={Home} exact />
        <Route path="/searchmovies" component={SearchMovies} />
        <Route path="/mymovieslist" component={MyMoviesList} />
        <Route path="/movies/:id" component={MovieInformation} />
        <Route path="/edit-movie-inforamtion/:id" component={EditMovieInformation} />
      </div>
    </Router>
  );
}

export default App;
