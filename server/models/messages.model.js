const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    // columns for out document
    date: {
        type: String,
        required: true, // default is false.
    },
    text: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
    },
    room: {
        type: String,
    },
});

module.exports = mongoose.model('Messages', MessagesSchema);