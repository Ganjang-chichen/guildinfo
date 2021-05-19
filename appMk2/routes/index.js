var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userid !== undefined && req.session.userid !== null && req.session.userid !== ""){
    res.render('index', { "id" : req.session.userid });
  }else{
    res.render('index', { "id" : "" });
  }
  
});


module.exports = router;
