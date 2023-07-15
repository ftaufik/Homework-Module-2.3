const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    urlSong:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    play_count: {
        type: Number,
        required: false
    }
},
{
    timestamps: true
})

const SongModel = mongoose.model('Songs', SongSchema)

module.exports = SongModel;