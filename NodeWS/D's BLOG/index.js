// importing express library
const express = require('express');
const app = express();

// decalring the local server port
const port = 8000;

// importing the path module for easiness in file paths
const path = require('path');

// importing the express-ejs layouts library
const expressLayouts = require('express-ejs-layouts');

// importing sass-middleware library which helps in quick conversion of sass files into the css ones
const sassMiddleware = require('node-sass-middleware');

// importing express-sessions used in creating sessions for storing user's data
const session = require('express-session');

// providing access to the database
const db = require('./config/mongoose');

// giving access to static files and converting sass files to css using the sass-middleware library
app.use(sassMiddleware({
    src: path.join(__dirname, 'assets', 'scss'),
    dest: path.join(__dirname, 'assets', 'css'),
    debug: true,
    outputStyle: 'compressed'
}));

// using middleware to parse form data into req.body
app.use(express.urlencoded());

// providing access to static files
app.use(express.static(path.join(__dirname, 'assets')));

// express-ejs-layout middleware to extract styles and scripts from sub pages into the layouts.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(expressLayouts);

// setting up ejs and giving access to the views folder
app.set('view engine', 'ejs');
app.set('views', './views');

// using remote routes folder 
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }

    console.log('Server is up and running on port: ', port);
});