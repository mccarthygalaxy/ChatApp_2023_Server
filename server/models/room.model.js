const mongoose = require('mongoose');
const Message = require('../models/message.model');

const RoomSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },

    messages: [{ _id: String, text: String, date: Date }],


    // messages: {
    //     type: Array,
    // },


    owner_Id: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // Refers to 'User' collection for referencing the room Owner
    },
    ownerName: {
        type: String
    }

});

module.exports = mongoose.model('Room', RoomSchema);


// messages: [{ id: String, text: String, date: Date }],
//   ownerId: {
//     type: mongoose.Types.ObjectId,
//     ref: "user",
//   },