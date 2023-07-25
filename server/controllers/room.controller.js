const router = require('express').Router();
const Room = require('../models/message-rooms.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;


module.exports = router;