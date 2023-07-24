//! IMPORTS
require('dotenv').config(); // connects our .env file to our complete project.
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000; // points to our environment file and puts the value of PORT from that variable into this PORT variable.
const log = console.log;
const mongoose = require('mongoose'); // used from node_modules
const MONGO = process.env.MONGO || process.env.MONGOB; // connection variable from .env

//* Controllers
// const users = require('./controllers/user.controller');
// const movies = require('./controllers/movie.controller');


//! MIDDLEWARE
//* database connections
mongoose.connect(`${MONGO}/ChatApp`);

const db = mongoose.connection;
db.once("open", () => log(`Connected: ${MONGO}`));


//* data handling
app.use(express.json());

//! ROUTES
// app.use('/user', users);
// app.use('/movies', movies);


app.listen(PORT, () => log(`Chat Server running on Port: ${PORT}`));