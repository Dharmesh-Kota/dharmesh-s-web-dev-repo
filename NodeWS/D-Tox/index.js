const express = require('express');
const port = 8000;
const apk = express();

// using remote routes folder 
apk.use('/', require('./routes/index'));

apk.listen(port, function(err){
    if(err){
        console.log(`Error occured in starting the server on port: ${port}`);
    } else {
        console.log(`Server is running on port: ${port}`);
    }
});