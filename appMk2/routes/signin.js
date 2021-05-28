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
    let idIsExist = false;
    let guildNotExist = false;
    let guildNotCorrect = false;
    let charNotExist = false;

    let errmsg = req.session.errmsg;
    console.log(errmsg);
    if(errmsg !== undefined && errmsg !== null){
      idIsExist = errmsg.includes("idIsExist");
      guildNotExist = errmsg.includes("guildNotExist");
      guildNotCorrect = errmsg.includes("guildNotCorrect");
      charNotExist = errmsg.includes("charNotExist");
    }

    res.render('signin', {"idIsExist" : idIsExist,
                          "guildNotExist" : guildNotExist,
                          "guildNotCorrect" : guildNotCorrect,
                          "charNotExist" : charNotExist});
  }
  
});

router.post('/signin', (req, res, next) => {
  let id = req.body.id;
  let pw = crypto.createHash('sha512').update(req.body.pw).digest('base64');
  let guild_name = String(req.body.guild_name);
  let world = String(req.body.world);
  let char_name = req.body.char_name;

  let guildNotExist = false;
  let guildNotCorrect = false;
  let charNotExist = false;
  let idIsExist = false;

  let errmsg = "";

  let options0 = { // 파이선 옵션
    mode : 'text',
    pythonPath: 'C:/Users/user/AppData/Local/Programs/Python/Python39/python.exe',
    pythonOptions: ['-u'],
    scriptPath: './public/python/',
    args : [char_name],
    encoding : 'utf8'
  };

  let options1 = {
    mode : 'text',
    pythonPath: 'C:/Users/user/AppData/Local/Programs/Python/Python39/python.exe',
    pythonOptions: ['-u'],
    scriptPath: './public/python/',
    args : [guild_name, world]
  };
  
  let seq = new Promise((res, rej) => {
    PythonShell.PythonShell.run("find_user.py", options0, function(err, data) {
      if(err){
        console.log("err signin find user : " + err);
      }else {
        res(data);
      }
    });
  })
  .then(data => {

    console.log(`data[0] : ${data[0]}, data[1] : ${data[1]}`);

    if(char_name !== data[0]){
      charNotExist = true;
    }else if(guild_name !== data[1]){
      guildNotCorrect = true;
    }

    PythonShell.PythonShell.run("isGuildExist.py", options1, function(err, data) {
      if (err) {
        console.log(`Error accured at update datas : ${err}`);
        throw err;
      }else {
        console.log(data);
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
  
            if(!idIsExist && !guildNotExist && !guildNotCorrect && !charNotExist){
              req.session.userid = id;
              sql = `INSERT INTO user (id, pw, guild_name, world, char_name) 
                      VALUES ('${id}', '${pw}', '${guild_name}', '${world}', '${char_name}');`
              conn.query(sql, (err, rows1) => {
                if(err){
                  console.log("signin err :" + err);
                }else {
                  res.redirect('/');
                }
              });
            }else{
              
              if(idIsExist){
                errmsg += "idIsExist" + " ";
              }
              if(guildNotExist){
                errmsg += "guildNotExist" + " ";
              }
              if(guildNotCorrect) {
                errmsg += "guildNotCorrect" + " ";
              }
              if(charNotExist) {
                errmsg += "charNotExist" + " ";
              }
  
              req.session.errmsg = errmsg;
              res.redirect('/signin');
            }
          }
          
        });
      }
    });
  });

  
});

router.get('/logout', (res, req, next) => {
  res.session.userid = "";
  req.redirect('/');
});


module.exports = router;
