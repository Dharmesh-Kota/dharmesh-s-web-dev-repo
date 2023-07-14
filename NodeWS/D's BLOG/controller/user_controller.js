const User = require('../models/user');

module.exports.sign_in = function(req, res){
    return res.render('sign-in');
}

module.exports.sign_up = function(req, res){
    return res.render('sign-up');
}

module.exports.new_user = function(req, res){
    if(req.body.re_password != req.body.password){
        return res.redirect('back');
    }
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] },
        function(err, user){
            if(err){console.log('Error in getting the user while signing up!'); return res.redirect('back');}

            if(user){
                console.log('User already exists with the entered Username/Email, go Sign-In');
                return res.render('sign-in');
            }
            
            User.create(req.body, function(err, user){
                if(err){console.log('Error in getting the user while signing up!'); return res.redirect('back');}
                
                res.redirect('/');
            });
        });
}

module.exports.create_session = function(req, res){
    return res.redirect('/');
}