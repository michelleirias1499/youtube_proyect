const mongoose = require('mongoose');

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
    playlist: [
        {
            title: {
                type: String
            },

            url: {
                type: String
            }
        }
    ]
});

module.exports = User = mongoose.model('user', UserSquema);