
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Navbar from './components/navbar.component';
import Home from './components/home-div.component';
import SearchMovies from './components/search-movies.component';
import SearchSeries from './components/search-series.component';
import MyMoviesList from './components/my-movies-list.component';
import MovieInformation from './components/movie-information.component';
import EditMovieInformation from './components/edit-movie-information.component';
import LoginComponent from './components/login.component';

function App() {
  return (
    <Router>
      <div className="start-point-component">
        <Navbar />
        <Route path="/" component={Home} exact />
        <Route path="/searchmovies" component={SearchMovies} />
        <Route path="/searchseries" component={SearchSeries} />
        <Route path="/mymovieslist" component={MyMoviesList} />
        <Route path="/movies/:id" component={MovieInformation} />
        <Route path="/edit-movie-inforamtion/:id" component={EditMovieInformation} />
        <Route path="/login" component={LoginComponent} />
      </div>
    </Router>
  );
}

export default App;
