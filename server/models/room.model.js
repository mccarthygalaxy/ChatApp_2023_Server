const mongoose = require('mongoose');

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
        type: Array,
        // type: [Object],
    },
    ownerId: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'User', // Refers to 'User' collection for referencing the room Owner
        // required: true,
    },
    // owner_id: {
    //     type: String
    // }
    ownerName: {
        type: String
    }
});

module.exports = mongoose.model('Room', RoomSchema);