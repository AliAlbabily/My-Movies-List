
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Navbar from './components/navbar.component';
import Home from './components/home.component';
import SearchMovies from './components/search-movies.component';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" component={Home} exact />
        <Route path="/searchmovies" component={SearchMovies} />
      </div>
    </Router>
  );
}

export default App;
