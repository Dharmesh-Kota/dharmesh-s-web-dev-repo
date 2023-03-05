const express = require('express');
const port = 8000;
const apk = express();

// setting up ejs
apk.set('view engine', 'ejs');
apk.set('views', './views');

// giving access to statics
apk.use(express.static('assets'));

// using middlewares
apk.use(express.urlencoded());

// using remote routes folder 
apk.use('/', require('./routes/index'));

apk.listen(port, function(err){
    if(err){
        console.log(`Error occured in starting the server on port: ${port}`);
    } else {
        console.log(`Server is running on port: ${port}`);
    }
});