const router = require('express').Router();
const Room = require('../models/room.model');
// const User = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET = process.env.JWT;
// const { error, success, incomplete } = require("../helpers");


//* Validate Session
const validateSession = require('../middleware/validate-session');


//! ROOM POST - CREATE NEW ROOM -------------------------------------
router.post('/createRoom', validateSession, async (req, res) => {
    try {

        //1. Pull data from client (body)
        const { title, description, messages } = req.body;

        const owner_Id = req.user.id;

        //2. Create new object using the Model
        const room = new Room({
            title, description, messages, owner_Id,
            ownerName: req.user.username
        });

        //3. Use mongoose method to save to MongoDB
        const newRoom = await room.save();

        //4. Client response
        res.status(200).json({
            newRoom,
            message: `${newRoom.title} room created! Admin is ${req.user.username}.`
        });

    } catch (err) {
        errorResponse(res, err);
    }
});

//! ROOM GET - GET ONE ROOM -------------------------------------
router.get('/:title', validateSession, async (req, res) => {

    try {
        const { title } = req.params;
        const getRoom = await Room.findOne({ title: title }).populate('owner_Id', 'username');

        getRoom ?
                res.status(200).json({
                    getRoom,
                    message: `Found room: ${getRoom.title}. Created by: ${getRoom.ownerName}`
                }) :
            res.status(404).json({
                message: `No room named '${title}' found.`
            });
    } catch (err) {
        errorResponse(res, err);
    }
});

//! ROOM GET - GET ALL ROOMS -------------------------------------
router.get('/', validateSession, async (req, res) => {
    try {
        const getAllRooms = await Room.find().populate('owner_Id', 'username');

        if (getAllRooms.length > 0) {
            const roomTitles = getAllRooms.map(room => room.title);

            res.status(200).json({
                getAllRooms,
                roomTitles,
                message: `Found rooms: ${roomTitles.join(', ')}`
            });
        } else {
            res.status(404).json({
                message: `No rooms found.`
            });
        }
    } catch (err) {
        errorResponse(res, err);
    }
});

//! ROOM GET - GET ALL ROOMS BY OWNER -------------------------------------
router.get('/owner/:owner_Id', validateSession, async (req, res) => {
        try {

        //1. Pull value from the body
        const { owner_Id } = req.params;
        // const { ownerName } = req.room.ownerName;
        
        const getAllByOwner = await Room.find({ owner_Id }).populate('owner_Id', 'ownerName');

        if (getAllByOwner.length > 0) {
            const roomTitles = getAllByOwner.map(room => room.title);

            // Access ownerName
            const ownerNames = getAllByOwner.map(room => room.ownerName);

            res.status(200).json({
                getAllByOwner,
                roomTitles,
                ownerNames,
                message: `Found rooms owned by ${owner_Id} - ${ownerNames}: ${roomTitles.join(', ')}`
            });
        } else {
            res.status(404).json({
                message: `No rooms found.`
            });
        }
    } catch (err) {
        errorResponse(res, err);
    }
});


//! PATCH ROOM INFO - UPDATE ROOM -------------------------------------
router.patch('/:id', validateSession, async (req, res) => {
    try {

        //1. Pull value from the body
        const { id } = req.params;

        //2. Pull data from the body
        const info = req.body;

        // Reshape into New Object
        const newObj = {
            title: info.title,
            description: info.description,
            ownerName: req.user.username
        }

        //3. Use method to locate document based on Title and pass in new info (description).
        const returnOption = { new: true };
        const updated = await Room.findOneAndUpdate({ _id: id, owner_Id: req.user.id }, newObj, returnOption);

        //4. Respond to client
        res.status(200).json({
            message: `${updated.title} description: '${updated.description}' owner: ${updated.owner_Id}`,
            updated
        })

    } catch (err) {
        errorResponse(res, err);
    }
});

//! DELETE ONE - DELETE ROOM (IF OWNER) -------------------------------------
router.delete('/:id', validateSession, async (req, res) => {
    try {
        //1. Capture ID
        const { id } = req.params;

        //2. Use delete method to locate and remove based off ID
        const deleteRoom = await Room.deleteOne({ _id: id, owner_Id: req.user.id });

        //3. Respond to client.
        deleteRoom.deletedCount ?
            res.status(200).json({
                message: "Room has been removed."
            }) :
            res.status(404).json({
                message: "Either no such room exists or you are not its Admin."
            })

    } catch (err) {
        errorResponse(res, err);
    }
})

module.exports = router;