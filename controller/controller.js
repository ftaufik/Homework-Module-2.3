const SongModel = require('../models/Songs');


const indexPage = async (req, res) => {
    SongModel.find().then(data => {
        res.render('index', {
            data: data
        });
    })
}

const createSongPage = async (req, res) => {
    res.render('createSong');
}

const createSongForm = async (req, res) => {
    try {
    const { title, artist, image, playCount } = req.body;
    const songUrl = `http://localhost:3000/audio/${req.file.filename}`;

    // Save the form data into the MongoDB database
    const songData = {
      title: title,
      artist: artist,
      urlSong: songUrl,
      image: image,
      playCount: playCount
    };

    await SongModel.create(songData);

    res.redirect('/');
  } catch (err) {
    res.render('index', {
        error: err
    });

  }
}


module.exports = { indexPage, createSongPage, createSongForm }