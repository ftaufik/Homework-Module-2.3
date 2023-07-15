const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/db_song');

const { indexPage } = require('./controller/controller');

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

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



// =-=-=-= VIEWS =-=-=-=
app.get('/', indexPage);

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