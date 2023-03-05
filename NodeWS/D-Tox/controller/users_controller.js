module.exports.profile = function(req, res){
    return res.end('<h1>Profile Section working properly...!!</h1>');
}

module.exports.data = function(req, res){
    return res.render('data', {
        title: 'Personal Info'
    });
}

module.exports.dataPost = function(req, res){
    console.log(req.body);
    return res.redirect('/');
}