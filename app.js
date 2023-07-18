const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/db_song');


const { indexPage, createSongForm, createSongPage } = require('./controller/controller');

const { 
    createSong,
    getAllSong,
    getOneSong,
    updateSong,
    deleteSong,
    handlePlayCount
} = require('./controller/api/songs.controller');

const port = 3000;
const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
  destination: './public/audio',
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  }
});

const upload = multer({ storage });


// =-=-=-= VIEWS =-=-=-=
app.get('/', indexPage);
app.get('/create-song', createSongPage);
app.post('/api/v1/songs/create', upload.single('song'), urlEncoded, createSongForm);

// =-=-=-= API =-=-=-=
app.post('/api/songs/create', jsonParser, createSong);
app.get('/api/songs/list', jsonParser, getAllSong);
app.get('/api/songs/:id', jsonParser, getOneSong);
app.put('/api/songs/edit/:id', jsonParser, updateSong);
app.delete('/api/songs/delete/:id', jsonParser, deleteSong);
app.put('/api/songs/play/:id', jsonParser, handlePlayCount);





app.listen(port, () => {
    console.log('Server running on port ' + port);
})