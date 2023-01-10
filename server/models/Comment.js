const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]

},
    { timestamps: true }
);


const CommentModel = new mongoose.model('comments', CommentSchema);
module.exports = CommentModel;