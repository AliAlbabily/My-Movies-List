
const router = require('express').Router();
let Movie = require('../models/movie.model');

// ***   Get request   ***/
router.route('/').get((req, res) => {
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error: ' + err))
});

// ***   Post request   ***/
router.route('/add').post((req, res) => {
    const poster = req.body.poster;
    const title = req.body.title;
    const genre = req.body.genre;
    const runtime = req.body.runtime;
    const plot = req.body.plot;
    const imdbid = req.body.imdbid;
    const status = req.body.status;

    const newMovie = new Movie({
        poster,
        title,
        genre,
        runtime,
        plot,
        imdbid,
        status
    });

    newMovie.save()
        .then(() => res.json('Movie added!'))
        .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;