var express = require('express');
var router = express.Router();

const path = require('path');
const database = require('../config/database.js');
const conn = database.init();
const crypto = require('crypto');

var PythonShell = require("python-shell");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin', { title: 'Express' });
});

router.post('/signin', (req, res, next) => {
  let id = req.body.id;
  let pw = crypto.createHash('sha512').update(req.body.pw).digest('base64');
  let guild_name = String(req.body.guild_name);
  let world = String(req.body.world);
  
  

  
});




module.exports = router;
