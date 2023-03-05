const express = require('express');
const port = 8080;

// setting up express server
const app = express();

// setting up view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

// accessing the static assets folder
app.use(express.static('assets'));

// setting up middlewares
app.use(express.urlencoded());

// accessing the routes folder
app.use('/', require('./routes/index'));

// setting up mongoDB
const db = require('./config/mongoose');
// const todoData = require('./models/todoSchema');

app.listen(port, function(err){
    if(err){
        console.log('Error while connecting to the server on port: ', port);
    } else {
        console.log('Server established successfully on port: ', port);
    }
})