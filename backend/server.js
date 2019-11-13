
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is runinning on port: ${port}`);
});

// ***   MongoDB Connection   ***/
const connection = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/MyMoviesList', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// ***   Make the app accept Endpoints through routes   ***/
const moviesRouter = require('./routes/movies');

app.use('/movies', moviesRouter);