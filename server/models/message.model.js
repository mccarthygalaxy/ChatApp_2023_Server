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
    owner_id: {
        // type: String, 
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    room_id: {
        // type: String,
        type: mongoose.Types.ObjectId,
        ref: "room"
    },
});

module.exports = mongoose.model('Message', MessageSchema);