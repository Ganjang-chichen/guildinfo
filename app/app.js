var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var crypto = require('crypto');
var database = require('./config/database.js');
var conn = database.init();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/signin');
var loginRouter = require('./routes/login');
var privateinfoRouter = require('./routes/private_info');
var radeRouter = require('./routes/rade');

var app = express();

app.use(session({
  secret: 'BIGFUCKINGGUN',
  resave: false,
  saveUninitialized: true,
  rolling: true,//로그인 상태에서 페이지 이동 시마다 세션값 변경 여부
  cookie: {maxAge:1000*60*60},//유효시간
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signin', signinRouter);
app.use('/login', loginRouter);
app.use('/private_info',privateinfoRouter);
app.use('/rade', radeRouter);

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
