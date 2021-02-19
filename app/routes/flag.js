var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var database = require('../config/database.js');
var conn = database.init();

router.get('/', function(req, res, next) {

    const ID = req.session.USERNAME;

    let sql = `SELECT distinct input_date, world, gname, position, name, class, exp, popularity, dojang_best_info, dojang_latest_info FROM char_info 
                WHERE gname = (SELECT guildname FROM user_info WHERE id = '${ID}') 
                ORDER BY input_date, dojang_best_info `;
    conn.query(sql, (err, char_lists, field) => {
        if(err){
            console.log('error accured at rade : ' + err);
        }else {
            sql = `SELECT * FROM guild_info 
                    WHERE manager = '${ID}' 
                    ORDER BY input_date; `;
            conn.query(sql, (err, guild_info, field) => {
                if(err){
                    console.log('error accured at rade2 : ' +err);
                }else {
                    res.render('flag', 
                        {'id' : ID,
                        'char_list' : char_lists,
                        'guild_info' : guild_info});
                }
            });
        }
    });
});


module.exports = router;