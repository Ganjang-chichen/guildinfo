var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var database = require('../config/database.js');
var conn = database.init();



function getweek(pastnum, putzero) {
    var currentDay = new Date();  
    var theYear = currentDay.getFullYear();
    var theMonth = currentDay.getMonth();
    var theDate  = currentDay.getDate();
    var theDayOfWeek = currentDay.getDay();

    if(theDayOfWeek === 0){
        theDayOfWeek = 7;
    }

    var thisWeek = [];

    for(var i=0; i<7; i++) {
        var resultDay = new Date(theYear, theMonth, theDate + (i + 1 - theDayOfWeek - (7 * pastnum)));
        var yyyy = resultDay.getFullYear();
        var mm = Number(resultDay.getMonth()) + 1;
        var dd = resultDay.getDate();
       
        if(putzero){
            mm = String(mm).length === 1 ? '0' + mm : mm;
            dd = String(dd).length === 1 ? '0' + dd : dd;
        }
        
       
        thisWeek[i] = yyyy + '-' + mm + '-' + dd;
      }

      return thisWeek;
}



/* GET home page. */
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
                    WHERE manager = '${ID}' `;
            conn.query(sql, (err, guild_info, field) => {
                if(err){
                    console.log('error accured at rade2 : ' +err);
                }else {
                    res.render('rade', 
                        {'id' : ID,
                        'char_list' : char_lists,
                        'guild_info' : guild_info});
                }

            });
        }
    });

    
});

router.post('/submit_list', (req, res) => {

    const ID = req.session.USERNAME;
    const CHARACTERS = req.body.room_name;
    const WEEK_OPTION = req.body.weekSelected;
    console.log(WEEK_OPTION);

    let rooms = {
        '011' : '', '012' : '', '013' : '',
        '021' : '', '022' : '', '023' : '',
        '031' : '', '032' : '', '033' : '',
        '041' : '', '042' : '', '043' : '',
        '051' : '', '052' : '', '053' : '',
        '061' : '', '062' : '', '063' : '',
        '071' : '', '072' : '', '073' : '',
        '081' : '', '082' : '', '083' : '',
        '091' : '', '092' : '', '093' : '',
        '101' : '', '102' : '', '103' : '',
        '111' : '', '112' : '', '113' : '',
        '121' : '', '122' : '', '123' : ''
    };

    for(let i = 0; i < CHARACTERS.length; i++) {
        let character = `${CHARACTERS[i]}`;
        let roomnum = character.split(' ')[0];
        let char_name = character.split(' ')[1];
        if(roomnum === '000'){
            continue;
        }
        if(rooms[roomnum] === ''){
            rooms[roomnum] = char_name;
        }else {
            rooms[roomnum] += ` ${char_name}`;
        }
    }

    let thisWeek;

    if(WEEK_OPTION === '0' ){
        console.log('1');
        thisWeek = getweek(0, true);
    }else {
        console.log('2');
        thisWeek = getweek(1, true);
    }

    console.log(thisWeek);

    let sql = `SELECT * FROM guild_info 
        WHERE manager = '${ID}' 
        AND isfinished_rade = 1 
        AND input_date IN ('${thisWeek[0]}', '${thisWeek[1]}', '${thisWeek[2]}', '${thisWeek[3]}', '${thisWeek[4]}', '${thisWeek[5]}', '${thisWeek[6]}'); `;
    conn.query(sql, (err, rows) => {
        if(err){
            console.log('error accured at rade submit : ' + err );
        }else {
            if(rows.length === 0) {
                let sql1 = `INSERT INTO guild_info 
                    (input_date, manager, world, name, flag, rade, isfinished_rade, 
                        room011, room012, room013, room021, room022, room023,
                        room031, room032, room033, room041, room042, room043,
                        room051, room052, room053, room061, room062, room063,
                        room071, room072, room073, room081, room082, room083,
                        room091, room092, room093, room101, room102, room103,
                        room111, room112, room113, room121, room122, room123) 
                    VALUES 
                    ( '${thisWeek[2]}', 
                        '${ID}', 
                        (SELECT world FROM user_info WHERE id = '${ID}'), 
                        (SELECT guildname FROM user_info WHERE id = '${ID}'),
                        0, 0, 1,
                        '${rooms['011']}', '${rooms['012']}', '${rooms['013']}', 
                        '${rooms['021']}', '${rooms['022']}', '${rooms['023']}', 
                        '${rooms['031']}', '${rooms['032']}', '${rooms['033']}', 
                        '${rooms['041']}', '${rooms['042']}', '${rooms['043']}', 
                        '${rooms['051']}', '${rooms['052']}', '${rooms['053']}', 
                        '${rooms['061']}', '${rooms['062']}', '${rooms['063']}', 
                        '${rooms['071']}', '${rooms['072']}', '${rooms['073']}', 
                        '${rooms['081']}', '${rooms['082']}', '${rooms['083']}', 
                        '${rooms['091']}', '${rooms['092']}', '${rooms['093']}', 
                        '${rooms['101']}', '${rooms['102']}', '${rooms['103']}', 
                        '${rooms['111']}', '${rooms['112']}', '${rooms['113']}', 
                        '${rooms['121']}', '${rooms['122']}', '${rooms['123']}' )`;

                conn.query(sql1, (err, rows) => {
                    if(err) {
                        console.log('error accaured at rade insert' + err);
                    }
                    else {
                        console.log('insert sucess!');
                        res.redirect('/rade');
                    }
                });
            }else {
                let sql2 = `UPDATE guild_info SET 
                    room011 = '${rooms['011']}', room012 = '${rooms['012']}', room013 = '${rooms['013']}', 
                    room021 = '${rooms['021']}', room022 = '${rooms['022']}', room023 = '${rooms['023']}', 
                    room031 = '${rooms['031']}', room032 = '${rooms['032']}', room033 = '${rooms['033']}', 
                    room041 = '${rooms['041']}', room042 = '${rooms['042']}', room043 = '${rooms['043']}', 
                    room051 = '${rooms['051']}', room052 = '${rooms['052']}', room053 = '${rooms['053']}', 
                    room061 = '${rooms['061']}', room062 = '${rooms['062']}', room063 = '${rooms['063']}', 
                    room071 = '${rooms['071']}', room072 = '${rooms['072']}', room073 = '${rooms['073']}', 
                    room081 = '${rooms['081']}', room082 = '${rooms['082']}', room083 = '${rooms['083']}', 
                    room091 = '${rooms['091']}', room092 = '${rooms['092']}', room093 = '${rooms['093']}', 
                    room101 = '${rooms['101']}', room102 = '${rooms['102']}', room103 = '${rooms['103']}', 
                    room111 = '${rooms['111']}', room112 = '${rooms['112']}', room113 = '${rooms['113']}', 
                    room121 = '${rooms['121']}', room122 = '${rooms['122']}', room123 = '${rooms['123']}'
                    WHERE idx = (SELECT MAX(idx) FROM (SELECT idx, world, name, input_date, isfinished_rade FROM guild_info) FUCKU 
                                    WHERE isfinished_rade = 1 
                                    AND manager = '${ID}'
                                    AND world = '${req.session.WORLD}' 
                                    AND name = '${req.session.GUILDNAME}' 
                                    AND input_date IN ('${thisWeek[0]}', '${thisWeek[1]}', '${thisWeek[2]}',
                                                        '${thisWeek[3]}', '${thisWeek[4]}',
                                                        '${thisWeek[5]}', '${thisWeek[6]}') ) `;

                conn.query(sql2, (err, rows) => {
                    if(err){
                        console.log('error accuaured at rad update : ' + err);
                    }else {
                        console.log('update success at rade update');
                        res.redirect('/rade');
                    }
                });
            }
        }
    });

    
});

module.exports = router;