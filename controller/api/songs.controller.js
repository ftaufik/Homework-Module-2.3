const SongsModel = require('../../models/Songs');

const createSong = async (req, res) => {
    try {
        const song = await SongsModel.create(req.body);

        res.status(201).json(song);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }

}

const getAllSong = async (req, res) => {
    try {
        const songs = await SongsModel.find({});
        
        res.status(200).json({
            message: 'Success retreaving data',
            data: songs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
    
}

const getOneSong = async (req, res) => {
    try {
        const {id} = req.paramss
        const song = await SongsModel.findById(id);

        if(!song){
            res.status(404).json({
                message: 'Cannot find song'
            })
        }
        res.status(200).json(songs)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
    
}

const updateSong = async (req, res) => {
    try {
        const {id} = req.params;
        const song = await SongsModel.findByIdAndUpdate(id, req.body);
        if(!song){
            return res.status(404).json({
                message: 'cannot find any song'
            })
        }
        const updatedSong = await SongsModel.findById(id);
        res.status(201).json(updatedSong);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteSong = async (req, res) => {
    try {
        const {id} = req.params;
        const song = await SongsModel.findByIdAndDelete(id);

        if(!song){
            return res.status(404).json({
                message: 'cannot find any song'
            })
        }

        res.status(200).json({song});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
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
            })
        }

        const updatedSong = await SongsModel.findById(id);

        res.status(200).json({updatedSong})

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { createSong, getAllSong, getOneSong, deleteSong, updateSong, handlePlayCount }