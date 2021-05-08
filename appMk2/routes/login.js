var express = require('express');
var router = express.Router();

const database = require('../config/database.js');
const conn = database.init();
const crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
    if( req.session.userid !== undefined && req.session.userid === ""){
        res.redirect('/');
    }else{
        res.render('login');
    }
});

router.post('/login', (req, res, next) => {
    let id = req.body.id;
    let pw = crypto.createHash('sha512').update(req.body.pw).digest('base64');
  
    let sql = `SELECT * FROM user WHERE id = '${id}' AND pw = '${pw}';`;
    conn.query(sql, (err, rows) => {
        if(err){
            console.log("login err : " + err);
        }else {
            if(rows[0] === ""){
                req.session.idIsExist = false;
                res.redirect('/login');
            }else{
                if(rows[0]["id"] === id && rows[0]["pw"] === pw){
                    req.session.userid = id;
                    req.session.userguild = rows[0]["guild_name"];
                    req.session.userworld = rows[0]["world"];
                    req.session.usergroup = rows[0]["group"];
                    req.session.usergroupposition = rows[0]["group_position"];
                    req.session.usercharname = rows[0]["char_name"];
                    res.redirect('/');
                }
            }
        }
    });
  });

module.exports = router;