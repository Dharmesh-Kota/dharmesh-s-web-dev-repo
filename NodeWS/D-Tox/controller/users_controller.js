const User = require('../models/userModel');
const path = require('path');
const fs = require('fs');

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
    User.findById(req.params.id, function(err, user){
        return res.render('profile', {
            title: 'D-Tox | User Profile',
            profile_user: user
        });
    })
    
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

    req.flash('success', 'Logged in Successfully');

    return res.redirect('/');
}

module.exports.clearSession = function(req, res){

    req.logout(function(err) {
        if (err) { return res.redirect('back'); }
        req.flash('success', 'You have been Logged Out');
        res.redirect('/');
    });
}

module.exports.update = async function(req, res){
    if(req.params.id == req.user.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) console.log('****Multer Error occured', err);

                user.fname = req.body.fname;
                user.lname = req.body.lname;
                user.email = req.body.email;

                if(req.file){
                    let currentAvatarPath = path.join(__dirname, "..", user.avatar);
                    if(user.avatar && fs.existsSync(currentAvatarPath)){
                        fs.unlinkSync(currentAvatarPath);
                    }

                    // saving the path of the avatar in the field of User
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch(err) {
            req.flash('error', err);
            console.log('Error: ', err);
        }
    } else {
        return res.status(401).send('Unauthorized User');
    }
}