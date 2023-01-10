const mongoose = require('mongoose');


const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }]
}, {
    timestamps: true
});

const TagModel = new mongoose.model('tags', TagSchema);

module.exports = TagModel;