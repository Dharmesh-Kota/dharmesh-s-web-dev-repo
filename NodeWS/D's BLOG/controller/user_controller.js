const User = require('../models/user');

module.exports.sign_in = function(req, res){
    return res.render('sign-in');
}

module.exports.sign_up = function(req, res){
    return res.render('sign-up');
}

module.exports.new_user = function(req, res){
    console.log(req.body);
    return res.redirect('/');
}

module.exports.create_session = function(req, res){
    return res.redirect('/');
}