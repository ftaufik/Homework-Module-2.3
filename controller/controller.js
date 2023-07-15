const SongModel = require('../models/Songs');

const indexPage = async (req, res) => {

    SongModel.find().then(data => {
        res.render('index', {
            data: data
        });
    })

    
}

module.exports = { indexPage }