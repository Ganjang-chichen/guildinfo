var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var database = require('../config/database.js');
var conn = database.init();
var mailsender = require('../config/mailsender');
const session = require('express-session');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

/* GET home page. */
router.get('/', function(req, res, next) {

    const ID = req.session.USERNAME;
    let ISSERTY = false;
    let ERROR = req.session.EMAILERROR;

    if(ID) {
        let sql = `SELECT * FROM user_info WHERE id = '${ID}' `;
        conn.query(sql, (err, rows, field) => {
            if(err){
                console.log('error accuered at index : ' + err);
            }else {
                if(rows[0].mail_sertify === 1){
                    ISSERTY = true;
                }
            }
            res.render('private_info', {id : ID,
                isserty : ISSERTY,
                err : ERROR});
        });
    }else {
        res.render('private_info', {id : ID,
            isserty : ISSERTY,
            err : ERROR});
    }

});

router.post('/send', (req, res) => {

    const ID = req.session.USERNAME;
    let email;
    let sert = crypto.createHash('sha512').update(`${getRandomInt(-10000, 10001)}`).digest('base64');
    req.session.SERTKEY = sert;

    let sql = `SELECT * FROM user_info WHERE id = '${ID}' `
    conn.query(sql, (err, rows, field) => {
        if(err){
            console.log('error accured at send msg : ' + err);
        }else {
            email = rows[0].email;
            mailsender.send(email, sert);
            res.redirect('/private_info');
        }
    });

});

router.post('/check', (req, res) => {

    const ID = req.session.USERNAME;
    const KEY = req.session.SERTKEY;

    if(req.body.sert === KEY){
        let sql = `UPDATE user_info SET mail_sertify = 1 WHERE id = '${ID}' `;
        conn.query(sql, (err, rows, field) => {
            if(err) {
                console.log('error accured at email check : ' + err);
            }else {
                console.log('update mail_sertify success! ');
            }
            res.redirect('/private_info');
        });
    }else {
        req.session.EMAILERROR = '인증 번호 틀림';
        res.redirect('/private_info');
    }


});

module.exports = router;