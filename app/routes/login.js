var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var database = require('../config/database.js');
var conn = database.init();
 
/* GET home page. */
router.get('/', function(req, res, next) {

    let loginfalse = false;
    loginfalse = req.session.loginfalse;
    req.session.loginfalse = false;

    res.render('login', {err : loginfalse});
});

router.post('/login', (req, res, next) => {

    const ID = req.body.id;
    const PW = crypto.createHash('sha512').update(req.body.pw).digest('base64');

    let sql = `SELECT * FROM user_info WHERE id = '${ID}' AND pw = '${PW}' `;
    conn.query(sql, (err, rows, fields) => {
        if(err) {
            console.log("error accured at login : " + err);
            req.session.loginfalse = true;
            res.redirect('/login');
        }else {
            if(rows.length === 0) {
                req.session.loginfalse = true;
                res.redirect('/login');
            }else {
                req.session.USERNAME = ID;
                res.redirect('/index');
            }
        }
    });

});

module.exports = router;