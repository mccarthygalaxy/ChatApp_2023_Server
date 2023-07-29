//! IMPORTS
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const log = console.log;
const mongoose = require('mongoose');
const MONGO = process.env.MONGO || process.env.MONGOB;

//* Controllers
const user = require('./controllers/user.controller');
const room = require('./controllers/room.controller');
const message = require('./controllers/message.controller');

// const validateSession = require('./middleware/validate-session');


//! MIDDLEWARE
//* database connections
mongoose.connect(`${MONGO}/ChatApp`);


const db = mongoose.connection;
db.once("open", () => log(`Connected: ${MONGO}`));


//* data handling
app.use(express.json());

//! ROUTES
app.use('/user', user);
app.use('/room', room);
app.use('/message', message);

// app.use(validateSession);


app.listen(PORT, () => log(`Chat Server running on Port: ${PORT}`));