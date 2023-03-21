const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/userModel');

// asking passport to use google-strategy
passport.use(new googleStrategy({
        clientID: '961865475467-m8tv75cnjuh5991g9a7fo1e9pq63efrf.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done){
        // find the user
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('Error in google-startegy-passport: ',err);
                return;
            }

            console.log(profile);
            // if found then sign-in the user by setting this user as req.user
            if(user){
                return done(null, user);
            } else {
                // if not found then create the user and sign him up
                User.create({
                    fname: profile.name.givenName,
                    lname: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log('Error in google-startegy-passport: ',err);
                        return;
                    }

                    return done(null, user);
                });
            }
        })
    }
));

module.exports = passport;