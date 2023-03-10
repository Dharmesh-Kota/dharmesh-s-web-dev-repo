const Post = require('../models/posts');

module.exports.home = function(req, res){
    // Post.find({}, function(err, posts){
    //     if(err) {
    //         console.log('Error in finding the post content from database');
    //         return res.redirect('back');
    //     }

    //     return res.render('home', {
    //         title: 'D-Tox | Login',
    //         posts: posts
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err) {
            console.log('Error in finding the post content from database');
            return res.redirect('back');
        }

        return res.render('home', {
            title: 'D-Tox | Login',
            posts: posts
        });
    });

}