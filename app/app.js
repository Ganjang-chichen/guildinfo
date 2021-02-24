var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var crypto = require('crypto');
var database = require('./config/database.js');
var conn = database.init();
var PythonShell  = require('python-shell');
var schedule = require('node-schedule');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/signin');
var loginRouter = require('./routes/login');
var privateinfoRouter = require('./routes/private_info');
var radeRouter = require('./routes/rade');
var flagRouter = require('./routes/flag');
const { resolve } = require('path');

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
app.use('/flag', flagRouter);

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


function update_data(){
  let sql = `SELECT * FROM user_info WHERE guild_link = 2;`;
  conn.query(sql, async (err, rows) => {
    if(err){
      console.log(`Error accured at update datas : ${err}`);
    }else {
      for(let i = 0; i < rows.length; i++) {

        const ID = rows[i].id;
        const GUILDNAME = rows[i].guildname;
        const WORLD = rows[i].world;

        console.log(`update start : ${i}th : ${GUILDNAME} ${WORLD} ${ID}`);

        let options = {
          mode : 'text',
          pythonPath: '',
          pythonOptions: ['-u'],
          scriptPath: './public/python/',
          args : [GUILDNAME, WORLD, ID]
        };

        let promise = new Promise((resolve, reject) => {
          PythonShell.PythonShell.run("create_guild_data.py", options, function(err, data) {
            if (err) {
              console.log(`Error accured at update datas : ${err}`);
              throw err;
            }else {
              console.log(`update ${i}th job fin`);
              resolve(1);
            }
          });
        });

        let result = await promise;
        
      }
    }
  });
}

let job = schedule.scheduleJob('01 30 12 * * *', () => {
  update_data();
});

let maintain_connect = schedule.scheduleJob('00 00 * * * *', () => {
  let sql = `SELECT CURDATE() FROM DUAL;`;
  conn.query(sql, (err, rows) => {
    if(err){
      console.log('connection err ! ' + err);
    }else {
      console.log(rows);
    }
  });
});

module.exports = app;
