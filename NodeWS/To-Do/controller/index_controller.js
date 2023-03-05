module.exports.home = function(req, res){
    return res.render('home', {
        title: "TODO App"
    });
};

module.exports.sendData = function(req, res){

    const TodoData = require('../models/todoSchema');

    // console.log(req.body);
    TodoData.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(error, newData){
        if(error){
            console.log('Error encountered while sending data to the database..!!');
            return;
        }
        return res.redirect('/');
    });

}