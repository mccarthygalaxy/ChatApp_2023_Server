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
        type: String, // mongoose.Types.ObjectId
    },
    room_id: {
        type: String, // mongoose.Types.ObjectId
        // ref: "user"
    },
});

module.exports = mongoose.model('Message', MessageSchema);