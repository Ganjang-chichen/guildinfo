var express = require('express');
var router = express.Router();

const database = require('../config/database.js');
const conn = database.init();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

let setting = 0;
let turn = "player1";
let oceloTable = [
    "empty","empty","empty","empty","empty","empty","empty","empty",
    "empty","empty","empty","empty","empty","empty","empty","empty",
    "empty","empty","empty","empty","empty","empty","empty","empty",
    "empty","empty","empty","player1","player2","empty","empty","empty",
    "empty","empty","empty","player2","player1","empty","empty","empty",
    "empty","empty","empty","empty","empty","empty","empty","empty",
    "empty","empty","empty","empty","empty","empty","empty","empty",
    "empty","empty","empty","empty","empty","empty","empty","empty"
    ];

function oceloSettings(table) {
    let newTable = table.slice();
    for (let i = 0; i < 5; i++) {
        let rdm = getRandomInt(0, 64);
        if (newTable[rdm] === "empty") {
            newTable[rdm] = "fa-skull";
        } else {
        i = i - 1;
        }
    }
    setting = 1;

    return newTable;
}

let roomStatus = new Array();

/* GET home page. */
router.get('/', function(req, res, next) {
    if( req.session.userid === undefined && req.session.userid === ""){
        res.redirect('/');
    }else{
        let roomIdx = -1;
        for(let i = 0; i < roomStatus.length; i++){
            if(roomStatus[i].roomName === req.session.roomName){
                roomIdx = i;
                if(roomStatus[i].player1 !== req.session.userid
                    && roomStatus[i].player2 === ""){
                        roomStatus[i].player2 = req.session.userid;
                }
                roomStatus[i].user = req.session.userid;
                res.render('oselo', roomStatus[i]);
                break;
            }
        }
        if(roomIdx === -1){
            let newtable = oceloSettings(oceloTable);
            let info = {roomName : req.session.roomName,
                        oceloTable : newtable,
                        turn : "player1",
                        player1 : req.session.userid,
                        player2 : "",
                        user: req.session.userid,
                        player1ID : "",
                        player2ID : ""};
            roomStatus.push(info);
            res.render('oselo', info);
        }
    }
});

let io = require('socket.io').listen(3693);
let roomName;

io.on('connection', (socket) => {
  console.log('connect');
  let instanceId = socket.id;

  socket.on('joinRoom', (data) => {
    console.log(data);
    socket.join(data.roomName);
    roomName = data.roomName;
  });

  socket.on('disconnect', (data) => {
    console.log("disconnect");
    console.log(data);
    console.log(instanceId);

    for(let i = 0; i < roomStatus.length; i++){
        if(roomStatus[i].roomName === roomName){
            
            if(roomStatus[i].player1ID === instanceId){
                console.log("player1 is disconnect!");
                roomStatus.splice(i, 1);
                io.sockets.in(roomName).emit('disconnect', {player : "player1",
                                                            roomName : roomName});
            }else if(roomStatus[i].player2ID === instanceId){
                console.log("player2 is disconnect!");
                roomStatus.splice(i, 1);
                io.sockets.in(roomName).emit('disconnect', {player : "player2",
                                                            roomName : roomName});
            }else if(roomStatus[i].player1ID === "" || roomStatus.player2ID === ""){
                console.log("player is disconnect!");
                roomStatus.splice(i, 1);
                io.sockets.in(roomName).emit('disconnect', {player : "player",
                                                            roomName : roomName});
            }
            break;
        }
    }
  });

  socket.on('getData', (data) => {
    console.log(data);
    
    let tableIdx = -1;
    for(let i = 0; i < roomStatus.length; i++){
        if(roomStatus[i].roomName === roomName){
            tableIdx = i;
            break;
        }
    }

    for(let i = 0; i < data.chaingingData.length; i++){
        roomStatus[tableIdx].oceloTable[data.chaingingData[i]] = data.player;
    }
    roomStatus[tableIdx].oceloTable[data.click] = data.player;
    if(data.player === "player1"){
        roomStatus[tableIdx].turn = "player2";
        roomStatus[tableIdx].player1ID = instanceId;
    }else if(data.player === "player2"){
        roomStatus[tableIdx].turn = "player1";
        roomStatus[tableIdx].player2ID = instanceId;
    }
    
    io.sockets.in(roomName).emit('recData', roomStatus[tableIdx]);
  });
});

module.exports = router;