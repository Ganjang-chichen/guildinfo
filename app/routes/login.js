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
    console.log('4');

    res.render('login', {err : loginfalse});
});

router.post('/login', (req, res, next) => {

    const ID = req.body.id;
    const PW = crypto.createHash('sha512').update(req.body.pw).digest('base64');
    console.log('1');
    let sql = `SELECT * FROM user_info WHERE id = '${ID}' AND pw = '${PW}' `;
    conn.query(sql, (err, rows, fields) => {
        if(err) {
            console.log('FUCK');
            console.log("error accured at login : " + err);
            req.session.loginfalse = true;
            res.redirect('/login');
        }else {
            if(rows.length === 0) {
                console.log('2');
                req.session.loginfalse = true;
                res.redirect('/login');
            }else {
                console.log('3');
                req.session.USERNAME = ID;
                req.session.GUILDNAME = rows[0].guildname;
                req.session.WORLD = rows[0].world;
                res.redirect('/');
            }
        }
    });

});

module.exports = router;