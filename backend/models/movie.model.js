const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    poster: { type: String, required: true },
    title: { type: String, required: true },
    genre: { type: String, required: true },
    type: { type: String, required: true },
    runtime: { type: String, required: true },
    plot: { type: String, required: true },
    imdbid: { type: String, required: true },
    status: { type: String, required: true } 
},
{
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;