var express = require('express');
var router = express.Router();

const database = require('../config/database.js');
const conn = database.init();

let fs = require('fs');

var PythonShell = require("python-shell");

function isValEmpty(val){
  if(val === undefined || val === null || val === ""){
    return true;
  }else {
    return false;
  }
}

let WorldID = {
  "리부트2" : 46, "리부트" : 45, "오로라" : 44, "레드" : 43,
  "이노시스" : 29, "유니온" : 10, "스카니아" : 0, "루나" : 3,
  "제니스" : 4, "크로아" : 5, "베라" : 1, "엘리시움" : 16,
  "아케인" : 50, "노바" : 51, "버닝" : 49, "버닝2" : 48, "버닝3" : 52
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  let id = req.session.userid;
  if(id !== undefined && id !== null && id !== ""){
    let guild_name = req.session.userguild;
    let world = req.session.userworld;
    let group = req.session.usergroup;
    let position = req.session.usergroupposition;
    let char_name = req.session.usercharname;
    let msg = req.session.showmessage;

    let user_info = {
      id : id,
      guild_name : guild_name,
      world : world,
      group_name : group,
      group_position : position,
      char_name : char_name
    }

    let errMSG = req.session.errmsg;
    if(isValEmpty(errMSG)){
      errMSG = "";
    }

    if(isValEmpty(msg)){
      msg = "";
    }

    let seq = new Promise((res, rej) => {
      let jsonPath = `./public/jsonData/${WorldID[world]}/${guild_name}/charData.json`;
      fs.exists(jsonPath, (exist) => {
        console.log(`char data is exist? : ${exist}`);
        res(exist);
      });
    })
    .then(exist => {
      
      if(exist){
        msg += ` dataExist`;
      }
      console.log(msg);
      if(!isValEmpty(group) && (position === "master" || position === "sub_master") ){
        let getApplicantSQL = `SELECT * FROM join_check WHERE group_name = '${id}';`;
        conn.query(getApplicantSQL, (err, rows) => {
          if(err){
            console.log("err at entergroup : " + err);
          }else {
            res.render("entergroup", {user_info : user_info,
                                    err : errMSG,
                                    applicant : rows,
                                    msg : msg});
          }
        });
      }else {
        res.render("entergroup", {user_info : user_info,
                                  err : errMSG,
                                  applicant : [],
                                  msg : msg});
      }
    })

  }else {
    res.redirect('/');
  }
  
});


router.post('/enter_group', (req, res, next) => {
  let id = req.session.userid;
  let guild_name = req.session.userguild;
  let world = req.session.userworld;
  let group = req.session.usergroup;
  let position = req.session.usergroupposition;
  let char_name = req.session.usercharname;

  let join_group = req.body.join_group;

  if(isValEmpty(group)){
    let seq = new Promise((res, rej) => {
      let findGroupSQL = `SELECT group_name FROM user WHERE group_name = '${position}';`;
      conn.query(findGroupSQL, (err, rows) => {
        if(err){
          console.log("err entergroup : " + err);
        }else {
          if(rows + "" === "" ){
            req.session.errmsg = "groupNotExist";
            res.redirect("/entergroup");
          }else {
            let joinGroupSQL = `INSERT INTO join_check (id, guild, world, group_name, char_name) 
                         VALUES ('${id}', '${guild_name}', '${world}', '${group}', '${char_name}')`;
            conn.query(joinGroupSQL, (err, rows2) => {
              console.log("group join insert success");
              req.session.errmsg = "";
              res.redirect("/entergroup");
            });
          }
        }
      });
    })
  }else{
    req.session.errmsg = "inputErr";
    redirect('/entergroup');
  }

});

router.post('/newgroup', (req, res, next) => {
  let id = req.session.userid;
  let guild_name = req.session.userguild;
  let world = req.session.userworld;
  let group = req.session.usergroup;
  let position = req.session.usergroupposition;
  let char_name = req.session.usercharname;

  if(isValEmpty(group)){
    let updateSQL = 
        `UPDATE user SET group_name = '${id}' , group_position = 'master' 
         WHERE id = '${id}';`;
    conn.query(updateSQL, (err, rows) => {
      if(err) {
        console.log("err entergroup new group :" + err);
      }else {
        console.log("insert new group");
        req.session.usergroupposition = "master";
        req.session.usergroup = id;
        req.session.errmsg = "";
        res.redirect('/entergroup');
      }
    });
  }else {
    console.log("input err");
    req.session.errmsg = "input err";
    res.redirect('/entergroup');
  }

});

router.get('/updateData', (req, res, next) => {
  let id = req.session.userid;
  let guild_name = req.session.userguild;
  let world = req.session.userworld;
  let group = req.session.usergroup;
  let position = req.session.usergroupposition;
  let char_name = req.session.usercharname;

  let msg = req.session.showmessage;

  if(isValEmpty(msg)){
    msg = "";
  }

  if(position !== "master" || isValEmpty(group) 
    || msg.includes("downloading") || msg.includes("downloadfin")) {
    req.session.errmsg = "accesserr";
    res.redirect("/entergroup");
  }else {
    console.log(`msg : ${msg}`);
    if(msg.includes("downloading")){
      console.log("watings");
      res.redirect("/entergroup");
    }else {
      let options = { // 파이선 옵션
        mode : 'text',
        pythonPath: 'C:/Users/user/AppData/Local/Programs/Python/Python39/python.exe',
        pythonOptions: ['-u'],
        scriptPath: './public/python/',
        args : [guild_name, world],
        encoding : 'utf8'
      };
  
      let updateSQL = `UPDATE user SET dataloaded = 's' WHERE id = '${id}';`;
      conn.query(updateSQL, (err, rows) => {
        if(err){
          console.log("update err download state : " + err);
        }
        else {
          console.log("data download start");
          req.session.showmessage = 'downloading';
          res.redirect("/entergroup");
        }
      });
    
      PythonShell.PythonShell.run("dataDownLoad.py", options, (err, data) => {
        if(err) {
          console.log("err at entergroup download data : " + err);
        }else {
          console.log("data load fin");
          req.session.showmessage = "downloadfin";
          let updateFinSQL = `UPDATE user SET dataloaded = 'f' WHERE id = '${id}';`;
          conn.query(updateFinSQL, (err, rows) => {
            if(err){
              console.log("update err download state : " + err);
            }
            else {
              console.log("data download finish");
              
            }
          });
        }
      });
    }

    
  }

});

module.exports = router;
