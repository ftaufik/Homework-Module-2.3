const SongsModel = require('../../models/Songs');

const createSong = async (req, res) => {
    try {
        const song = await SongsModel.create(req.body);

        res.status(201).json({
            message: 'Song Created',
            data: song});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }

}

const getAllSong = async (req, res) => {
    try {
        const songs = await SongsModel.find({});
        
        res.status(200).json({
            message: 'Success retrieving data',
            data: songs
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
    
}

const getOneSong = async (req, res) => {
    try {
        const {id} = req.params
        const song = await SongsModel.findById(id);

        if(!song){
            res.status(404).json({
                message: 'Cannot find song'
            });
        }

        res.status(200).json({
            message: 'Success retrieving data',
            data: song
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
    
}

const updateSong = async (req, res) => {
    try {
        const {id} = req.params;
        const song = await SongsModel.findByIdAndUpdate(id, req.body);

        if(!song){
            return res.status(404).json({
                message: 'cannot find any song'
            });
        }

        const updatedSong = await SongsModel.findById(id);
        
        res.status(200).json({
            message: 'Song Updated',
            data: updatedSong
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}

const deleteSong = async (req, res) => {
    try {
        const {id} = req.params;
        const song = await SongsModel.findByIdAndDelete(id);

        if(!song){
            return res.status(404).json({
                message: 'cannot find any song'
            });
        }

        res.status(200).json({
            message: 'Song Deleted',
            data: song});

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}

const handlePlayCount = async (req, res) => {
    try {
        const {id} = req.params;
        const song = await SongsModel.findByIdAndUpdate(id, {
            $inc: {
                play_count: 1
            }
        });

        if(!song){
            return res.status(404).json({
                message: 'cannot find any song'
            });
        }

        const updatedSong = await SongsModel.findById(id);

        res.status(200).json({
            message: 'Play Count Updated',
            data: updatedSong
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { createSong, getAllSong, getOneSong, deleteSong, updateSong, handlePlayCount }