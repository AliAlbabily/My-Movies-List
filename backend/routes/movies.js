
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
    const type = req.body.type;
    const runtime = req.body.runtime;
    const plot = req.body.plot;
    const imdbid = req.body.imdbid;
    const status = req.body.status;

    const newMovie = new Movie({
        poster,
        title,
        genre,
        type,
        runtime,
        plot,
        imdbid,
        status
    });

    newMovie.save()
        .then(() => res.json('Movie added!'))
        .catch(err => res.status(400).json('Error ' + err));
});

// ***   Get request   ***/
router.route('/:id').get((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => res.json(movie))
        .catch(err => res.status(400).json('Error: ' + err))
});

// ***   Delete request   ***/
router.route('/:id').delete((req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => res.json('Movie deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// ***   Update request   ***/
router.route('/update/:id').post((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            movie.poster = req.body.poster;
            movie.title = req.body.title;
            movie.genre = req.body.genre;
            movie.type = req.body.type;
            movie.runtime = req.body.runtime;
            movie.plot = req.body.plot;
            movie.imdbid = req.body.imdbid;
            movie.status = req.body.status;

            movie.save()
                .then(() => res.json('Movie updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;