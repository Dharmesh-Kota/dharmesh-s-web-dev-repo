const User = require('../models/user');
const query_mailer = require('../mailers/query');

module.exports.query = async function(req, res){
    
    try{

        // console.log(req.user.email);

        if(!req.user){
            req.flash('error', 'You need to Login to send the Mail!');
            return res.redirect('back');
        }
        
        let user = await User.findOne({email: req.user.email});

        // console.log(user);

        // user = await user.populate('user', 'email name');

        query_mailer.query(user, req.body.query);

        return res.redirect('back');

    } catch(err){
        console.log('Error: ', err);
    }
    
}