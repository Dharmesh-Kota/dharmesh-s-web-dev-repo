const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true
});

const Blog = mongoose.model('Blog', blogsSchema);

module.exports = Blog;