var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var database = require('../config/database.js');
var conn = database.init();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    let ID_ISEXIST = req.session.ID_ISEXIST;
    let EMAIL_ISEXIST = req.session.EMAIL_ISEXIST;
    
    req.session.ID_ISEXIST = 0;
    req.session.EMAIL_ISEXIST = 0;

    res.render('signin', {IDISEXIST : ID_ISEXIST, EMAILISEXIST : EMAIL_ISEXIST});
});

router.post('/signin', function(req, res, next) {
    
    let ID = req.body.id;
    let PW = crypto.createHash('sha512').update(req.body.pw).digest('base64');
    let EMAIL = req.body.email;
    let WORLD = req.body.world;
    let GUILD = req.body.guild;
    let SERTIFY = req.body.sertify;

    console.log(PW.length);

    let ID_ISEXIST = 0;
    let EMAIL_ISEXIST = 0;
    let DBERROR_ISEXIST = 0;
    
    function insert() {
        
        console.log('insert');
        sql = `INSERT user_info (id, pw, email, world, guildname) 
                VALUES('${ID}', '${PW}', '${EMAIL}', '${WORLD}', '${GUILD}') `;

        conn.query(sql, (err, rows) => {
            if(err) {
                console.log('error accured! at signin insert ' + err);
                DBERROR_ISEXIST = 3;

                if(('' + err).includes('user_info.id')) {
                    ID_ISEXIST = 1;
                    console.log(ID_ISEXIST);
                }
                if(('' + err).includes('user_info.email')){
                    EMAIL_ISEXIST = 1;
                    console.log(EMAIL_ISEXIST);
                }
                
                req.session.ID_ISEXIST = ID_ISEXIST;
                req.session.EMAIL_ISEXIST = EMAIL_ISEXIST;
                req.session.DBERROR_ISEXIST = DBERROR_ISEXIST;
                res.redirect('/signin');
            }
            else{
                console.log('id insert success!');

                req.session.USERNAME = ID;
                req.session.ID_ISEXIST = ID_ISEXIST;
                req.session.EMAIL_ISEXIST = EMAIL_ISEXIST;
                req.session.DBERROR_ISEXIST = DBERROR_ISEXIST;
                res.redirect('/');
            }
        });
    }
    
    insert();

});



module.exports = router;