const mongoose = require('mongoose');
const validator = require('validator');



const PostSchema = new mongoose.Schema({
    postImage: {
        type: String
    },

    description: {
        type: String
    },

    location: {
        type: String
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],


    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],

    pinnedUsers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    }]
},
    { timestamps: true }
);


const PostModel = new mongoose.model('posts', PostSchema);
module.exports = PostModel;