
const router = require('express').Router();
let Movie = require('../models/movie.model');

// ***   Get request   ***/
// router.route('/').get((req, res) => {
//     Exercise.find()
//         .then(exercises => res.json(exercises))
//         .catch(err => res.status(400).json('Error: ' + err))
// });

// ***   Post request   ***/
router.route('/add').post((req, res) => {
    const poster = req.body.poster;
    const title = req.body.title;
    const genre = req.body.genre;
    const runtime = req.body.runtime;
    const plot = req.body.plot;
    const status = req.body.status;

    const newMovie = new Movie({
        poster,
        title,
        genre,
        runtime,
        plot,
        status
    });

    newMovie.save()
        .then(() => res.json('Movie added!'))
        .catch(err => res.status(400).json('Error ' + err));
});

// ***   Get request   ***/
// router.route('/:id').get((req, res) => {
//     Exercise.findById(req.params.id)
//         .then(exercise => res.json(exercise))
//         .catch(err => res.status(400).json('Error: ' + err))
// });

// ***   Delete request   ***/
// router.route('/:id').delete((req, res) => {
//     Exercise.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Exercise deleted.'))
//         .catch(err => res.status(400).json('Error: ' + err))
// });

module.exports = router;