const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const crypto = require('crypto');
const database = require('./config/database.js');
const conn = database.init();
var PythonShell  = require('python-shell');
const schedule = require('node-schedule');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let radeRouter = require('./routes/rade');
let signinRouter = require('./routes/signin');
let loginRouter = require('./routes/login');
let oselowatingroomRouter = require('./routes/oselowatingroom');
let oseloRouter = require('./routes/oselo');
let entergroupRouter = require('./routes/entergroup');

let app = express();

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
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rade', radeRouter);
app.use('/signin', signinRouter);
app.use('/login', loginRouter);
app.use('/oselowatingroom', oselowatingroomRouter);
app.use('/oselo', oseloRouter);
app.use('/entergroup', entergroupRouter);

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
