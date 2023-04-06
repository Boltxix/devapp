//Import required packages nad modules
var newError = require('http-errors');
var express = require('express');
var path = require('path');
var cookiePar = require('cookie-parser');
var loggs = require('morgan');

//Import router module
var indexRouter = require('./routes/index');

//Create express applicaiton
var app = express();

//Set views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Middleware functions
app.use(express.json());//Parse JSON requests
app.use(express.urlencoded({ extended: false }));// Parse URL encoded requests
app.use(cookiePar());//Parse cookie header
app.use(express.static(path.join(__dirname, 'public')));//Serve static files

//Use the imported router for requests to the root directory
app.use('/', indexRouter);

//Middleware functions for handling errors
app.use(function(req, res, next) {
  next(createError(404));// Create a 404 error and pass it to the next middleware
});

app.use(function(err, req, res, next) {
  //Set locals, only providing error in development
  res.locals.message = err.message; //Set error message to be displayed 
  res.locals.error = req.app.get('env') === 'development' ? err : {}; //Set error objects to be displayed in development environment

  //Render the error page
  res.status(err.status || 500); //Set HTTP status code of the repsponse to the error status code, or 500 if not provided
  res.render('error'); //Render the error page
});


//Export the application for use in other modules
module.exports = app;