const Comment = require('../models/comments');
const Blog = require('../models/blogs');
const User = require('../models/user');

module.exports.create = async function(req, res){
    
    let comment = await Comment.create({
        content: req.body.content,
        user: req.body.user_id,
        topic: req.body.topic
    });

    let blog = await Blog.findOne({topic: req.body.topic});

    if(blog){
        blog.comments.push(comment);
        blog.save();
    } else {
        blog = await Blog.create({
            topic: req.body.topic
        });
        blog.comments.push(comment);
        blog.save();
    }

    let user = await User.findById(req.body.user_id);

    if(req.xhr){
        return res.status(200).json({
            data: {
                comment: comment,
                user_name: user.name
            },
            message: 'Comment Created!'
        });
    }

    req.flash('success', 'Comment added Successfully!');;
    return res.redirect('back');
}

module.exports.destroy = async function(req, res){
    try{

        let comment = await Comment.findById(req.query.id);
        if(comment.user.toString('hex') == req.user.id){
            await comment.remove();

            let blog = await Blog.findOne({
                topic: req.query.topic,
            });

            await Blog.findByIdAndUpdate(blog._id, {$pull: {comments: comment._id}});
                
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.query.id
                    },
                    message: 'Comment Deleted!'
                })
            }

            req.flash('success', 'Comment removed successfully!');

            return res.redirect('back');
        } else {

            req.flash('error', 'You are not permitted!');

            if(req.xhr){
                return res.status(401).json({
                    message: 'Comment Deleted!'
                });
            }

            return res.redirect('back');

        }
    } catch(err){
        console.log('Error: ', err);
    }
}