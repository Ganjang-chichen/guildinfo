var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var database = require('../config/database.js');
var conn = database.init();
var mailsender = require('../config/mailsender');
const session = require('express-session');
var PythonShell  = require('python-shell');

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
    let guild_link;

    if(ID) {
        let sql = `SELECT * FROM user_info WHERE id = '${ID}' `;
        conn.query(sql, (err, rows, field) => {
            if(err){
                console.log('error accuered at index : ' + err);
            }else {
                if(rows[0].mail_sertify === 1){
                    ISSERTY = true;
                    guild_link = rows[0].guild_link;
                }
            }
            res.render('private_info', {id : ID,
                isserty : ISSERTY,
                err : ERROR,
                g_link : guild_link});
        });
    }else {
        res.render('private_info', {id : ID,
            isserty : ISSERTY,
            err : ERROR,
            g_link : guild_link});
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

router.post('/connect_guild', (req, res) => {

    let ID = req.session.USERNAME;
    let GUILDNAME;
    let WORLD;

    let sql = `SELECT world, guildname FROM user_info WHERE id = '${ID}' `;
    conn.query(sql, (err, rows, field) => {
        if(err) {
            console.log(err)
        }else {
            GUILDNAME = rows[0].guildname;
            WORLD = rows[0].world;

            let options = {
                mode : 'text',
                pythonPath: '',
                pythonOptions: ['-u'],
                scriptPath: './public/python/',
                args : [GUILDNAME, WORLD]
            };

            try{
                PythonShell.PythonShell.run("create_guild_data.py", options, function(err, data) {
                    if (err) throw err;
                    console.log(data)
                    let sql3 = `UPDATE user_info SET guild_link = 2 WHERE id = '${ID}' `
                    conn.query(sql3, (err, rows2, field) => {
                        if(err){
                            console.log('error accured at connect g2 : ' + err);
                        }else {
                            console.log("update success at connect g2");
                        }
                    });
                });
            }catch(e){
                console.log("python shell error in private info" +  e.message);
                let sql2 = `UPDATE user_info SET guild_link = 0 WHERE id = '${ID}' `
                conn.query(sql2, (err, rows2, field) => {
                    if(err){
                        console.log('error accured at connect g3 : ' + err);
                    }else {
                        console.log("update success at connect g3");
                    }
                    res.redirect('/private_info');
                });
            }
            
            
            let sql2 = `UPDATE user_info SET guild_link = 1 WHERE id = '${ID}' `
            conn.query(sql2, (err, rows2, field) => {
                if(err){
                    console.log('error accured at connect g : ' + err);
                }else {
                    console.log("update success at connect g");
                }
                res.redirect('/private_info');
            });

            
        }
    });
    
    
});

module.exports = router;