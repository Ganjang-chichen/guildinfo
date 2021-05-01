var express = require('express');
var router = express.Router();

let roomList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  let id = req.session.userid;
  console.log(id);
  console.log(roomList);
  if(id === undefined || id === ""){
    res.redirect('/');
  }else {
    let eraseRoom = req.query.eraseRoom;
    if(eraseRoom !== undefined && eraseRoom !== null && eraseRoom !== ""){
      for(let i = 0; i < roomList.length; i++){
        if(roomList[i] === eraseRoom){
          roomList.splice(i, 1);
          break;
        }
      }
    }
    res.render('oselowatingroom', { roomList: roomList });
  }
});

router.get('/newroom', (req, res, next) => {

  let id = req.session.userid;
  roomList.push(id);
  req.session.roomName = id;
  console.log(`room make : ${id}`);
  res.redirect('/oselo');
});

router.post('/enter', (req, res, next) => {

  let roomName = req.body.roomName;
  req.session.roomName = roomName;
  console.log(`room enter : ${roomName}`);
  res.redirect('/oselo');
});

module.exports = router;