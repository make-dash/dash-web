//node modules and std lib imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');

//import routers
const dashboardRouter = require('./routes/dashboard');
const classRouter = require('./routes/class');
const assignmentRouter = require('./routes/assignment');
const studentRouter = require('./routes/student')

//Connect to mongo
const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/make-dash'
mongoose.connect(dbUrl, {useNewUrlParser: true})

const app = express();

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

//Configure middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configure our routes
app.use('/', dashboardRouter);
app.use('/class', classRouter);
app.use('/assignment', assignmentRouter);
app.use('/student', studentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
