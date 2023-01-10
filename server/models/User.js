const mongoose = require('mongoose');
const validator = require('validator');



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: [true, 'Please provide Email!'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email!'
        },
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide Password!'],
        minLength: 4,
    },

    userImage: {
        type: String
    },

    description: {
        type: String
    },

    location: {
        type: String
    },

    hobbies: [{ type: String }],

    followers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    }],
},
    { timestamps: true }
);


const UserModel = new mongoose.model('users', UserSchema);
module.exports = UserModel;