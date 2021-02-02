var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , id : req.session.USERNAME});
});

router.get('/index', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;