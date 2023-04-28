const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    // here linking the post through user means one logined user can create multiple post 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;