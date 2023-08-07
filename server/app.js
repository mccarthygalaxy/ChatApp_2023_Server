//! DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const log = console.log;

//! IMPORTS
const { userController, roomController, messageController } = require ('./controllers');
const { db } = require('./db');

//! MIDDLEWARE
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//! ROUTES
app.use('/user', userController);
app.use('/room', roomController);
app.use('/message', messageController);

//! CONNECTION
const server = async() => {

    db();

    app.listen(PORT, () => console.log(`Chat Server Is Running on: ${PORT}`));
}

server();