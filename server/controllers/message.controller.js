const router = require('express').Router();
const Message = require('../models/messages.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;


module.exports = router;