var express = require('express');
var router = express.Router();

const database = require('../config/database.js');
const conn = database.init();
const crypto = require('crypto');
const { RSA_NO_PADDING } = require('constants');

/* GET home page. */
router.get('/', function(req, res, next) {
    if( req.session.userid !== undefined && req.session.userid !== ""){
        res.redirect('/');
    }else if(req.session.errmsg === "login_failed"){
        res.render('login', {err : "login_failed"});
    }
    else{
        res.render('login',{err : ""});
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
            console.log(`0: ${rows}`);
            if(rows + "" === ""){
                console.log(`1: ${rows}`);
                req.session.idIsExist = false;
                req.session.errmsg = "login_failed";
                res.redirect('/login');
            }else{
                console.log(`2: ${rows}`);
                if(rows[0]["id"] === id && rows[0]["pw"] === pw){
                    req.session.userid = id;
                    req.session.userguild = rows[0]["guild_name"];
                    req.session.userworld = rows[0]["world"];
                    req.session.usergroup = rows[0]["group"];
                    req.session.usergroupposition = rows[0]["group_position"];
                    req.session.usercharname = rows[0]["char_name"];
                    res.redirect('/');
                }else {
                    req.session.errmsg = "login_failed";
                    res.redirect('/login');
                }
            }
        }
    });
  });

module.exports = router;