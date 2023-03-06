const { findByIdAndDelete } = require('../models/todoSchema');

module.exports.home = function(req, res){
    
    const TodoData = require('../models/todoSchema');
    TodoData.find({}, function(error, newData){
        if(error){
            console.log('Error while fetching the data from the database..!');
            return;
        }
        return res.render('home', {
            title: "My ToDo List",
            toDoList: newData
        });
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
};

module.exports.removeTask = function(req, res){
    const TodoData = require('../models/todoSchema');
    let id = req.query.id;
    for(let ids of id){
        TodoData.findByIdAndDelete(ids, function(err){
            if(err) console.log('Error occured while removing the task from database..!');
        });
    }        
    return res.redirect('/');
}