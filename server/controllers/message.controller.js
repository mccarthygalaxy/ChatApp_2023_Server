const router = require('express').Router();
const Room = require('../models/room.model');
const User = require('../models/user.model');
const Message = require('../models/message.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;
// const currentDate = new Date();

//* Validate Session
const validateSession = require('../middleware/validate-session');

// Error Response function
const errorResponse = (res, error) => {
    return (
        res.status(500).json({
            error: error.message
        })
    )
};

//TODO MESSAGE POST - CREATE NEW MESSAGE
router.post('/message', validateSession, async (req, res) => {
    console.log("Route reached!");
    try {

        //1. Pull data from client (body)
        const { date, text, owner_id, room_id } = req.body;

        const ownerId = req.user.id;
        console.log("OwnerId:", ownerId);

        //2. Create new object using the Model
        const message = new Message({
            date: req.body.date,
            text: req.body.text,
            owner_id: req.user.id,
            room_id: req.body.room_id
        });

        console.log("New Message Object:", message);

        //3. Find the room to which you want to add the message
        const room = await Room.findById(room_id);

        console.log("Room:", room);

        if (!room) {
            return res.status(404).json({
                error: 'No such room in collection.'
            });
        }

        //4. Use mongoose method to save the new message to MongoDB
        room.messages.push(message);
        await room.save();

        //5. Client response
        res.status(200).json({
            newMessage: message,
            message: `Message sent by ${req.user.username}.`
        });

        console.log("Request User ID:", req.user.id);
        console.log("Message Object:", message);
        console.log("Room ID:", room_id);

    } catch (err) {
        errorResponse(res, err);
    }
});

module.exports = router;
