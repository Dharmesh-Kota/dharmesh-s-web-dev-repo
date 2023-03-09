const User = require('../models/userModel');

module.exports.signUp = function(req, res){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signUp', {
        title: 'D-Tox | Sign Up',
    });
};

module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signIn', {
        title: 'D-Tox | Sign-In',
    })
}

module.exports.profile = function(req, res){
    return res.render('profile', {
        title: 'D-Tox | Profile'
    });
}

module.exports.createUser = function(req, res){

    if(req.body.repass != req.body.password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err) console.log('error in finding the user while signing up..!');
        if(!user){
            // console.log('at the target..!!');
            User.create(req.body, function(err, user){
                if(err) console.log('Error while creating user during sign up!!');
                return res.redirect('/');
            });
        } else {
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.clearSession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}