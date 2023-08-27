const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    date: {
        type: String, // Date
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    owner_Id: {
        // type: String, 
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    room_Id: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    username: {
        type: String,
      },
});

module.exports = mongoose.model('Message', MessageSchema);