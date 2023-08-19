const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likesSchema);

module.exports = Like;