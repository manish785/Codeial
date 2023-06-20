const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent the request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // the user who accepted the request, the naming us just to understand, otherwise, the users wont see the differnce
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;