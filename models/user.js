const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSquema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    description:{
        type: String,
        required: true
    },
    likes:[
        {
            title:{
                type: String
            }
        }
    ]
});

module.exports = User = mongoose.model('user', UserSquema);