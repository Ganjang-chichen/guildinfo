var express = require('express');
var router = express.Router();

const database = require('../config/database.js');
const conn = database.init();

var PythonShell = require("python-shell");

/* GET users listing. */
router.get('/', function(req, res, next) {
  let id = req.session.userid;
  if(id !== undefined && id !== null && id !== ""){
    let sql = `SELECT * FROM user WHERE id = '${id}';`;

    let seq = new Promise((res, rej) => {
      conn.query(sql, (err, rows) => {
        if(err) {
          console.log("error in entergroup at \\ " + err);
        }else {
          let guildNotSame = false;
          let errmsg = req.session.errmsg;
          if(errmsg !== undefined && errmsg !== null){
            guildNotSame = errmsg.includes("guildNotSame");
          }
          let user_info = {
            id : rows[0].id,
            guild_name : rows[0].guild_name,
            world : rows[0].world,
            group : rows[0].group_name,
            group_position : rows[0].group_position,
            char_name : rows[0].char_name
          }
          
          res({
              "user_info" : user_info,
              "guildNotSame" : guildNotSame
            });
        }
      });
    })
    .then(data => {
      if(data.user_info.id === data.user_info.group){
        let sql = `SELECT * FROM join_check WHERE group_name = '${data.user_info.group_name}';`;
        conn.query(sql, (err, rows) => {
          if(err){
            console.log("error at entergroup at join_check : " + err);
          }else {
            data.applicant = rows;
            
            res.render('entergroup', data);
          }
        });
      }else {
        data.applicant = [];
        
        res.render('entergroup', data);
      }
    })
  }else {
    res.redirect('/');
  }
  
});

// 케릭터 세팅
router.post('/set_char', (req, res, next) => { 
  let id = req.session.userid;
  let char_name = req.body.set_char;
  if(char_name !== undefined && char_name !== null && char_name !== ""){
    let options = { // 파이선 옵션
      mode : 'text',
      pythonPath: 'C:/Users/user/AppData/Local/Programs/Python/Python39/python.exe',
      pythonOptions: ['-u'],
      scriptPath: './public/python/',
      args : [char_name],
      encoding : 'utf8'
    };
    
    PythonShell.PythonShell.run("find_user.py", options, function(err, data) {
      if(err){ // 케릭터명 검색해서 존재유무 및 길드 반환
        console.log("python err at entergroup : " + err);
      }else {

        if(data[1] === req.session.world){

          let sql = `UPDATE user SET char_name = '${char_name}' 
                WHERE id = '${id}';`;

          conn.query(sql, (err, rows) => {
            if(err){
              console.log("error in entergroup at set char : " + err);
            }else {
              console.log("update success : " + char_name);
              res.redirect('/entergroup');
            }
          });

        }else {
          req.session.errmsg = "guildNotSame";
          res.redirect('/entergroup');
        }
      }
    });
    
  }else {
    res.redirect('/entergroup');
  }
});



module.exports = router;
