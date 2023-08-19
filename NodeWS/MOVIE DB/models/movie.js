const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/movie/avatars');

const movieSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: true
    },
    rating: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }, avatar: {
        type: String,
        required: true
    }
}, {
    timeseries: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../', AVATAR_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
})

// static methods
movieSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
movieSchema.statics.avatarPath = AVATAR_PATH;

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;