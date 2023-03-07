const User = require('../models/userModel');

module.exports.newUser = function(req, res){
    return res.render('signUp', {
        title: 'D-Tox | Sign Up'
    });
};


module.exports.signUp = function(req, res){
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
    // console.log(req.body);
    // return res.redirect('/');
}


module.exports.createSession = function(req, res){
     // find the user by email id

    // user found
        // password matched
            // redirect to profile page
        // password doesn't match 
            // redirect to sign in page

    // user not found
        // redirect to sign in page

    User.findOne({email: req.body.email}, function(err, user){
        // console.log('Entered the war zone..!  ', req.body.email);
        if(err) console.log('Error encountered while searching the user in database..!');
        if(user){
            if(user.password != req.body.password){
                return res.redirect('/');
            }
            // console.log('At the target!!');
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            return res.redirect('/');
        }
    });    
}


module.exports.profile = function(req, res){
    
// console.log('Reacched, cookie ', req.cookies);

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('profile', {
                    title: 'D-Tox | Profile',
                    user : user
                });
            }
            return res.redirect('/');
        });
    }     
    return res.render('profile', {title: 'D-Tox | Profile'});
}