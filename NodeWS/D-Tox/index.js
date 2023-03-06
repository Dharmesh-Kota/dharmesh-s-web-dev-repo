const express = require('express');
const port = 8000;
const apk = express();
const cookieParser = require('cookie-parser');

// access to the database
const db = require('./config/mongoose');

// using middlewares
apk.use(express.urlencoded());

// using remote routes folder 
apk.use('/', require('./routes/index'));

// giving access to statics
apk.use(express.static('assets'));

// setting up ejs
apk.set('view engine', 'ejs');
apk.set('views', './views');

apk.use(cookieParser);

apk.listen(port, function(err){
    if(err){
        console.log(`Error occured in starting the server on port: ${port}`);
    } else {
        console.log(`Server is running on port: ${port}`);
    }
});