
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Navbar from './components/navbar';
import Home from './components/home';
import SearchMovies from './components/searched-movies-container';
import SearchSeries from './components/searched-series-container';
import MyMoviesList from './components/shows-list';
import MovieInformation from './components/show-info-page';
import EditMovieInformation from './components/edit-show-page';

function App() {
  return (
    <div className="start-point-component">
      <Router>
          <Navbar />
          <Route path="/" component={Home} exact />
          <Route path="/searchmovies" component={SearchMovies} />
          <Route path="/searchseries" component={SearchSeries} />
          <Route path="/mymovieslist" component={MyMoviesList} />
          <Route path="/movies/:id" component={MovieInformation} />
          <Route path="/edit-movie-inforamtion/:id" component={EditMovieInformation} />
      </Router>
    </div>
  );
}

export default App;
