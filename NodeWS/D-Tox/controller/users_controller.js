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