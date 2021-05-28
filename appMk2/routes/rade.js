var express = require('express');
var router = express.Router();

const database = require('../config/database.js');
const conn = database.init();

let fs = require('fs');

let WorldID = {
  "리부트2" : 46, "리부트" : 45, "오로라" : 44, "레드" : 43,
  "이노시스" : 29, "유니온" : 10, "스카니아" : 0, "루나" : 3,
  "제니스" : 4, "크로아" : 5, "베라" : 1, "엘리시움" : 16,
  "아케인" : 50, "노바" : 51, "버닝" : 49, "버닝2" : 48, "버닝3" : 52
}

/* GET home page. */
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
    
    let jsonPath = `./public/jsonData/${WorldID[world]}/${guild_name}/charData.json`;
    console.log(`json path : ${jsonPath}`);
    let seq = new Promise((res, rej) => {
      if(fs.existsSync(jsonPath)){
        let data = fs.readFileSync(jsonPath).toString();
        data = JSON.parse(data);
        
        res(data);
      }
    })
    .then(data => {
      let radeInfoSQL = `SELECT * FROM rade_info WHERE writer = '${id}' Order by idx DESC;`;
      conn.query(radeInfoSQL, (err, rows) => {
        if(err){
          console.log("err at get rade info : " + err);
        }else {
          if(rows + "" === ""){
            rows = rows + "";
          }
  
          res.render('rade', { user_info : user_info,
                              rade_info : rows,
                              datas : data });    
        }
      });
    });

  }else {
    res.redirect("/");
  }

});

module.exports = router;
