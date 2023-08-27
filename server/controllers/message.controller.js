const router = require('express').Router();
const Room = require('../models/room.model');
const Message = require('../models/message.model');
const { error, success, incomplete } = require("../helpers");

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


//* -----------------------------------------------------------------------
//TODO POST - create a message for a room
router.post('/:room_Id', validateSession, async (req, res) => {

    try {
        //1. Pull data from client (body)
        const { text } = req.body;
        const room_Id = req.params.room_Id;
        const owner_Id = req.user.id;
        const username = req.user.username
        console.log(username)
  
        //2. Create new object using the Model
        const message = new Message({
            date: new Date(),
            text,
            owner_Id: owner_Id, // declared above
            room_Id: room_Id,
            username: username,
        });
        
        //3. Use mongoose method to save to MongoDB
        const newMessage = await message.save();
        const roomMessage = {
        id: newMessage._id,
        text: newMessage.text,
        date: newMessage.date,
        username: newMessage.username,
        };
        await Room.findOneAndUpdate(
        { _id: room_Id },
        { $push: { messages: roomMessage } }
        );
  
        newMessage ? success(res, newMessage) : incomplete(res);
    } catch (err) {
        error(res, err);
    }
  });

  //* -------------------------------------------------------------------

//! MESSAGE POST - CREATE NEW MESSAGE -------------------------------------
// router.post('/', validateSession, async (req, res) => {

//     try {
//         //1. Pull data from client (body)
//         const { text, room_Id } = req.body;
//         const owner_Id = req.user.id;

//         //2. Create new object using the Model
//         const message = new Message({
//             date: new Date(),
//             text,
//             owner_Id: owner_Id, // declared above
//             room_Id: room_Id,
//         });
        
//         //3. Use mongoose method to save to MongoDB
//         const newMessage = await message.save();
//         const roomMessage = {
//         id: newMessage._id,
//         text: newMessage.text,
//         date: newMessage.date,
//         messageSender: req.user.username,
//         };
//         await Room.findOneAndUpdate(
//         { _id: room_Id },
//         { $push: { messages: roomMessage } }
//         );

//         newMessage ? success(res, newMessage) : incomplete(res);
//     } catch (err) {
//         error(res, err);
//     }
// });

//! MESSAGE DELETE ONE - DELETE MESSAGE (IF OWNER) -------------------------------------
router.delete('/:id/:room_Id', validateSession, async (req, res) => {
    try {
        //1. Capture ID and room_Id from request parameters.
        const { id, room_Id } = req.params;

        //2. Remove the message from the Message collection (if message owner = validated user)
        const deleteMessage = await Message.deleteOne({ _id: id, owner_Id: req.user.id });

        //3. Find the corresponding room by room_Id and remove the message from its messages array (if message owner = validated user)
        //* Get all messages associated with room to pass to update
        const updatedMessages = await Message.find({ room_Id: room_Id });

        const returnOption = { new: true }
        const updatedRoom = await Room.findByIdAndUpdate(
            { _id: room_Id }, // Find the room where the user is the owner
            
            //TODO { $pull: { messages: id } } // Remove the message ID from the messages array

            //* Update Room's Message Array with newly filtered array (excluding deleteMessage's id)
            { messages: updatedMessages },
            returnOption
        );

        //4. Respond to client. 
        //* Ternary for SPECIFIC Response.
        deleteMessage.deletedCount === 1 ?
            updatedRoom ?
                res.status(200).json({
                    message: "Message has been removed, chat room updated."
                })
                :
                res.status(404).json({
                    message: "Could not find room."
                })
            :
            res.status(404).json({
                message: "No such message exists in collection."
            });

    } catch (err) {
        errorResponse(res, err);
    }
});

//! MESSAGE GET - GET ALL MESSAGES BY ROOM ID -------------------------------------
router.get('/:ROOM_ID', async (req, res) => {
    try {
        const room_Id = req.params.ROOM_ID;

        const getAllMessages = await Message.find({ room_Id: room_Id });

        getAllMessages ? success(res, getAllMessages) : incomplete(res);
        
    } catch (err) {
        error(res, err);
    }
});

//* ---------------------------------------------------------------------
//TODO PATCH One - update

router.patch("/:MESSAGEID", validateSession, async (req, res) => {
    try {
        //1. Pull value from paramter, body, req.user
        const messageId = req.params.MESSAGEID;
        const newText = req.body.text;
        const userId = req.user._id;
        const updatedInfoA = { text: newText, date: new Date() };

        const messageIdString = messageId.toString();
        // const textString = newText.toString();

        //3. Use method to locate document based off ID and pass in new info.

        const updatedMessage = await Message.findOneAndUpdate(
            { _id: messageId, owner_Id: userId },
            updatedInfoA,
            { new: true }
        );
        if (!updatedMessage) {
            return res
                .status(404)
                .json({ message: "Invalid Message/Owner Combination" });
        }

        const roomIdString = updatedMessage.room_Id.toString();

        const roomToUpdate = await Room.findOneAndUpdate(
            { _id: roomIdString, "messages._id": messageIdString },
            {
                $set: {
                    "messages.$.text": newText,
                    "messages.$.date": new Date(),
                },
            },
            { new: true }
        );
        if (!roomToUpdate) {
            return res
                .status(404)
                .json({ message: "Invalid Message/Room Combination" });
        }

        // 4. Respond to client.
        res
            .status(200)
            .json({ message: "Message text has been updated", updatedMessage });
    } catch (err) {
        console.error("Error in the catch block:", err.stack);
        error(res, err);
    }
});

  //*--------------------------------------------------------------------- 

//! MESSAGE PATCH - UPDATE SPECIFIC MESSAGE TEXT -------------------------------------
// router.patch('/:ROOM_ID/:MESSAGEID', validateSession, async (req, res) => {
//     try {
//         const { ROOM_ID, MESSAGEID } = req.params;
//         const { newText } = req.body;

//         const newMObj = {
//             text: newText,
//             date: new Date()
//         }

//         // Find the room by its room_Id
//         // const room = await Room.findOne({ _id: ROOM_ID }); /
//         // if (!room) {
//         //     return res.status(404).json({ message: "Room not found." });
//         // }

//         // Find the message by its MESSAGEID and check if it belongs to the room and the user
//         const message = await Message.findOneAndUpdate({ 
//             _id: MESSAGEID, 
//             owner_Id: req.user.id }, 
//             newMObj, 
//             {new: true }
//             );

//         if (!message) {
//             return res.status(404).json({ message: "Message not found in the room, or you may not be the owner." });
//         }

//         // Update the message's text and date
//         // message.text = newText;
//         // message.date = new Date(); // Set the date to the current date and time
//         // await message.save();

//         // Update the message's text inside the room's messages array
//         await Room.updateOne(
//             { _id: ROOM_ID, "messages._id": MESSAGEID },
//             { $set: { "messages.$.text": newText, "messages.$.date": new Date() } }
//         );

//         res.status(200).json({ message: "Message text has been updated.", updatedMessage: message });
//     } catch (err) {
//         errorResponse(res, err);
//     }
// });


module.exports = router;
