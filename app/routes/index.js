var express = require('express');
var router = express.Router();
var database = require('../config/database.js');
var conn = database.init();

/* GET home page. */
router.get('/', function(req, res, next) {

  const ID = req.session.USERNAME;
  let ISSERTY = false;

  if(ID) {
    let sql = `SELECT * FROM user_info WHERE id = '${ID}' `;
    conn.query(sql, (err, rows, field) => {
      if(err){
        console.log('error accuered at index : ' + err);
      }else {
        if(rows[0].mail_sertify === 1){
          ISSERTY = true;

          res.render('index', { title: 'Express' 
                      , id : ID
                      , err : req.session.ERROR
                      , sertify : ISSERTY});
        }
      }
    })
  }else {
    res.render('index', { title: 'Express' 
                      , id : ID
                      , err : req.session.ERROR
                      , sertify : ISSERTY});
  }

  
});

router.get('/index', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;