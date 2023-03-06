module.exports.newUser = function(req, res){
    return res.render('signUp', {
        title: 'D-Tox Sign Up'
    });
};