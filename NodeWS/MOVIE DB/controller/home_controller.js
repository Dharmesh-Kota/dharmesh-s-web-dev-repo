const Movie = require('../models/movie');

module.exports.home = async function(req, res){

    let movies = await Movie.find({})
    .sort('-createdAt');

    return res.render('home', {
        movies: movies
    });
}

module.exports.add_movie_page = function(req, res){
    return res.render('add_movie');
}

module.exports.movie = async function(req, res){
    let movie = await Movie.findById(req.params.id);

    return res.render('movie', {
        movie: movie
    });
}

module.exports.add_movie = async function(req, res){
    try {
        let movie = await Movie.findOne({movie_name: req.body.movie_name, year: req.body.year});

        if(movie){
            return res.redirect('back');
        } else {
            Movie.uploadedAvatar(req, res, function(err){
                if(err) {console.log('Multer Error: ', err);}

                Movie.create({
                    movie_name: req.body.movie_name,
                    rating: req.body.rating,
                    year: req.body.year,
                    description: req.body.description,
                    avatar: Movie.avatarPath + '/' + req.file.filename
                });
            });

            return res.redirect('/');
        }
    } catch (error) {
        console.log('Error: ', error);
    }
    
}