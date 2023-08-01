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
router.post('/', validateSession, async (req, res) => {
    console.log("Route reached!");
    try {

        //1. Pull data from client (body)
        const { date, text, room_id } = req.body;

        const ownerId = req.user.id;
        // const roomName = req.room.title;
        // console.log("OwnerId:", ownerId);
        // console.log("RoomName:", roomName);

        //2. Create new object using the Model
        const message = new Message({
            date: new Date,
            text,
            owner_id: ownerId, // declared above
            room_id
        });

        // console.log("New Message Object:", message);

        //3. Find the room to which you want to add the message
        const room = await Room.findById(room_id);

        // console.log("Room:", room);

        if (!room) {
            return res.status(404).json({
                error: 'No such room in collection.'
            });
        }
        
        //4. Use mongoose method to save the new message to MongoDB

        const newMessage = await message.save();
        console.log(`New Message = ${newMessage}`);
        
        // const roomMessage = {
        //     id: newMessage.id,
        //     text: newMessage.text,
        //     date: newMessage.date
        // }
        // console.log(`Room Message = ${roomMessage}`);

        // await Room.findOneAndUpdate({id: room_id}, {$push: {messages: newMessage}});
        
        // newMessage ? success(res, newMessage) : incomplete(res);

        room.messages.push(newMessage);
        await room.save();

        //5. Client response
        res.status(200).json({
            newMessage: newMessage,
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
router.delete('/:id', validateSession, async (req, res) => {
    try {
        //1. Capture ID
        const { id } = req.params;
        const { msgToDelete } = req.body;
        const prospect = msgToDelete.messages.findById(id);


        //2. Use delete method to locate and remove based off ID
        const deleteMessage = await Message.deleteOne({ _id: id, ownerId: req.user.id });

        

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
