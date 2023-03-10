const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log('Error in finding the post related to the comment in database');
            return('back');
        } 
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comments){
                if(err){
                    console.log('Error in relating the comment');
                    return res.redirect('back');
                }
                // updating the comments array added in posts
                post.comments.push(comments); 
                post.save();

                return res.redirect('/');
            });
        }

    })
}