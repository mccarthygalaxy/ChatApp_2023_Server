const router = require('express').Router();
const Room = require('../models/room.model');
const Message = require('../models/message.model');

// const User = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET = process.env.JWT;

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
router.post('/', validateSession, async (req, res) => {
    console.log("Route reached!");
    try {

        //1. Pull data from client (body)
        const { text, room_id } = req.body;

        const ownerId = req.user.id;

        //2. Create new object using the Model
        const message = new Message({
            date: new Date(),
            text,
            owner_id: ownerId, // declared above
            room_id
        });

        // console.log("New Message Object:", message);

        //3. Find the room to which you want to add the message
        const roomToUpdate = await Room.findById(room_id);

        // console.log("Room:", room);

        if (!roomToUpdate) {
            return res.status(404).json({
                error: 'No such room in collection.'
            });
        }
        
        //4. Use mongoose method to save the new message to MongoDB

        await message.save();
        // console.log(`New Message = ${newMessage}`);
        
        // const roomMessage = {
        //     id: newMessage.id,
        //     text: newMessage.text,
        //     date: newMessage.date
        // }
        // console.log(`Room Message = ${roomMessage}`);

        await Room.findOneAndUpdate(
            {_id: roomToUpdate}, 
            {$push: {messages: message} });
        
        // newMessage ? success(res, newMessage) : incomplete(res);

        // room.messages.push(newMessage);
        // await room.save();

        //5. Client response
        res.status(200).json({
            // newMessage: newMessage,
            message: `Message sent by ${req.user.username}.`
        });

        // console.log("Request User ID:", req.user.id);
        // console.log("Request User Name:", req.user.username);
        // console.log("Message Object:", message);
        // console.log("Room ID:", room_id);

    } catch (err) {
        errorResponse(res, err);
    }
});

//TODO DELETE ONE - DELETE MESSAGE (IF OWNER)
router.delete('/:id/:room_id', validateSession, async (req, res) => {
    try {
        //1. Capture ID and room_id from request parameters.
        const { id, room_id } = req.params;

        //2. Remove the message from the Message collection (if message owner = validated user)
        const deleteMessage = await Message.findOneAndDelete({ _id: id } ); // ownerId: req.user.id

        //3. Find the corresponding room by room_id and remove the message from its messages array
        await Room.findOneAndDelete ({ _id: room_id }, {messages: id});


        

        //3. Respond to client.
        deleteMessage.deletedCount ?
            res.status(200).json({
                message: "Message has been removed."
            }) :
            res.status(404).json({
                message: "No such message exists in collection."
            })

    } catch (err) {
        errorResponse(res, err);
    }
});


module.exports = router;
