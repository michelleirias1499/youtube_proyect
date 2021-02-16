const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VideoSchema = new mongoose.Schema({
    IdVideo: {
        type: String
    }
    ,
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            }, 
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    likes:[
        {
            title:{
                type: String
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ]
})

module.exports = Video = mongoose.model('video', VideoSchema);