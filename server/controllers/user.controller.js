const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;



//! SIGNUP ----------------------------------------------------
router.post('/signup', async (req, res) => {
    
    try {
        
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,13)
        });
        
        const newUser = await user.save(); 
        
        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn: "1 day"});
        
        res.status(200).json({
            user: newUser,
            message: 'Success!',
            token
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});



//!  LOGIN ----------------------------------------------------
router.post('/login', async (req,res) => {
    try {
        
        //*1. Capture data provided by user (body - req.body)
        const { email, password } = req.body

        //*2. Check database to see if email supplied exists.
        const user = await User.findOne({email: email});

        //*3. If email exists, consider if passwords match.
        const passwordMatch = await bcrypt.compare(password, user.password); 
        console.log(passwordMatch)

        if(!user || !passwordMatch) throw new Error('Email or Password does not match');

        //*4. After verified, provide a jwt (token).
        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: "1 day"});

        //*5. Provide a response.
        let creatorId = user._id;
        res.status(200).json({
            message: `Successful Login!`,
            user,
            creatorId,
            token
        })
        
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});

module.exports = router;