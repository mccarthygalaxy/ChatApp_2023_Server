const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
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