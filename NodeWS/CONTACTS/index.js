const express = require("express");
const port = 8080;
const path = require("path");

// npm install mongoose@6.10.1
const db = require("./config/mongoose"); 

const Contacts = require('./MODELS/contacts');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", function(req, res){
    
    Contacts.find({}, function(error, contacts){
        if(error){
            console.log('Error in fetching contacts from database');
            return;
        }
        return res.render("home", {
            title : "Contact List",
            contact_list : contacts
        });
    })    
});

app.get("/practice", function(req, res){
    return res.render("practice", {
        title : "My Contacts List"
    });
});

app.post("/create-contact", function(req, res){
    
    // contactList.push({
    //     name : req.body.name,
    //     num : req.body.num
    // });
    // contactList.push(req.body);
    // return res.redirect("back");

    Contacts.create({
        name: req.body.name,
        num: req.body.num
    }, function(error, newContact){
        if(error){
            console.log('Error Found, Boss');
            return;
        }
        console.log(newContact);
        return res.redirect('back');
    });
});

app.get("/delete-contact", function(req, res){
    
    let id = req.query.id;

    Contacts.findByIdAndDelete(id, function(error){
        if(error){
            console.log('Error encountered while deleting a cotact from the database');
            return;
        }
        return res.redirect("back");
    })
});

app.listen(port, function(error){
    if(error){
        console.log("Error Found", error); 
    } else {
        console.log("Server is running on the port : ", port);
    }
});