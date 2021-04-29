var express = require('express');
var router = express.Router();

const path = require('path');
const database = require('../config/database.js');
const conn = database.init();
const crypto = require('crypto');

var PythonShell = require("python-shell");


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userid !== undefined && req.session.userid !== ""){ // 이미 로그인 상태면 메인 화면으로
    res.redirect("/");
  }else{
    let idIsExist = req.session.idIsExist;
    let guildNotExist = req.guildNotExist;
    
    res.render('signin', {"idIsExist" : req.session.idIsExist,
                            "guildNotExist" : req.session.guildNotExist});
  }
  
});

router.post('/signin', (req, res, next) => {
  let id = req.body.id;
  let pw = crypto.createHash('sha512').update(req.body.pw).digest('base64');
  let guild_name = String(req.body.guild_name);
  let world = String(req.body.world);
  
  let guildNotExist = false;
  let idIsExist = false;

  let options = {
    mode : 'text',
    pythonPath: 'C:/Users/user/AppData/Local/Programs/Python/Python39/python.exe',
    pythonOptions: ['-u'],
    scriptPath: './public/python/',
    args : [guild_name, world]
  };
  
  PythonShell.PythonShell.run("isGuildExist.py", options, function(err, data) {
    if (err) {
      console.log(`Error accured at update datas : ${err}`);
      throw err;
    }else {
      if(data[0] === "False"){
        guildNotExist = true;
      }

      let sql = `SELECT id FROM user WHERE id = '${id}';`
      conn.query(sql, (err, rows) => {
        if(err){
          console.log("signin Err" + err);
        }else {
          console.log(rows);
          if(rows[0] !== "" && rows[0] !== undefined && rows[0].id === id){
            idIsExist = true;
          }

          if(!idIsExist & !guildNotExist){
            req.session.userid = id;
            sql = `INSERT INTO user (id, pw, guild_name, world) 
                    VALUES ('${id}', '${pw}', '${guild_name}', '${world}');`
            conn.query(sql, (err, rows1) => {
              if(err){
                console.log("signin err :" + err);
              }else {
                res.redirect('/');
              }
            });
          }else{
            req.session.idIsExist = idIsExist;
            req.session.guildNotExist = guildNotExist;
            res.redirect('/signin');
          }
        }
        
      });
    }
  });
});

router.get('/logout', (res, req, next) => {
  res.session.userid = "";
  req.redirect('/');
});


module.exports = router;
