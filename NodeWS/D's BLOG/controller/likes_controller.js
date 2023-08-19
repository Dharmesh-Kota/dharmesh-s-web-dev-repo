const Like = require('../models/likes');
const Blog = require('../models/blogs');

module.exports.up_vote = async function(req, res){
    let like = await Like.findOne({user: req.user._id, topic: req.params.topic});
    let like_exists = false;
    let blog;

    if(like){
        like_exists = true;
    } else {
        like = await Like.create({
            user: req.user._id,
            topic: req.params.topic
        });

        blog = await Blog.findOne({topic: req.params.topic});
        if(blog){
            blog.likes.push(like);
            blog.save();
        } else {
            blog = await Blog.create({
                topic: req.params.topic
            });
            blog.likes.push(like);
            blog.save();
        }
        like_exists = false;
    }

    console.log(like_exists);
    // Asynchronous handling of likes request
    if(req.xhr){
        return res.status(200).json({
            data:{
                like_exists: like_exists,
                likes: blog.likes.length
            },
            message: 'UpVote request successfull!'
        })
    }

    return res.redirect('back');
    
}

module.exports.down_vote = async function(req, res){
    let like = await Like.findOne({user: req.user._id, topic: req.params.topic});
    let like_exists = false;
    let blog;

    if(like){
        await Like.findByIdAndDelete(like._id);

        blog = await Blog.findOne({topic: req.params.topic});
        await Blog.findByIdAndUpdate(blog._id, {$pull: {likes: like._id}});

        like_exists = true;
    } else {
        like_exists = true;
    }

    console.log(like_exists);
    // Asynchronous handling of likes request
    if(req.xhr){
        return res.status(200).json({
            data:{
                like_exists: like_exists,
                likes: blog.likes.length
            },
            message: 'DownVote request successfull!'
        })
    }

    return res.redirect('back');

}