const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({

    date: {
        type: String,
        required: true,
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