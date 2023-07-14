const mongoose = require('mongoose');
const path = require('path');

const userScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userScehma);

module.exports = User;