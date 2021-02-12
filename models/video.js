const mongoose = require('mongoose');
const Video = new mongoose.Schema({
    url: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})