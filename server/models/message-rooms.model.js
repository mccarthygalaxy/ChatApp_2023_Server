const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    // columns for out document
    title: {
        type: String,
        required: true, // default is false.
        unique: true,
    },
    description: {
        type: String,
    },
    messages: {
        type: Array,
    },
    ownerId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Rooms', RoomsSchema);