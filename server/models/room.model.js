const mongoose = require('mongoose');
const Message = require('../models/message.model');

const RoomSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        // unique: true,
    },
    description: {
        type: String,
    },
    messages: {
        // type: [Object],
        type: Array,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to 'User' collection for referencing the room Owner
    },
    ownerName: {
        type: String
    }

});

module.exports = mongoose.model('Room', RoomSchema);