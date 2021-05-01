let oseloboxes = document.querySelectorAll(".oselo_empty_box");
let player = "player1";
if(userId === player1){
    player = "player1";
}else if(userId == player2){
    player = "player2";
}else{
    player = "other";
}


function settingTable(list){
    for(let i = 0; i < oseloboxes.length; i++) {
        if(list[i] === "empty"){
            oseloboxes[i].innerHTML = ``;
        }else if(list[i] === "fa-skull"){
            oseloboxes[i].innerHTML = `<div><i class="fas fa-skull"></i></div>`;
        }else if(list[i] === "player1"){
            oseloboxes[i].innerHTML = `<div><i class="fab fa-python player1"></i></div>`;
        }else if(list[i] === "player2"){
            oseloboxes[i].innerHTML = `<div><i class="fab fa-python player2"></i></div>`;
        }
    }
}

function isEmpybox(box){
    let p1 = box.querySelector('.player1');
    let p2 = box.querySelector('.player2');
    let death = box.querySelector('.fa-skull');

    if(p1){
        return "player1";
    }else if(p2){
        return "player2";
    }else if(death){
        return "fa-skull";
    }else{
        return "empty";
    }

}

function onChangeBox(box, option){
    if(option === "fa-skull"){
        box.innerHTML = `<div><i class="fas fa-skull"></i></div>`;
    }else if(option === "player1"){
        box.innerHTML = `<div><i class="fab fa-python player1"></i></div>`;
    }else if(option === "player2"){
        box.innerHTML = `<div><i class="fab fa-python player2"></i></div>`;
    }
}

function scanline(idx){

    let getY = Math.floor(idx / 8);
    let getX = idx - getY * 8;

    let XList = new Array();
    for(let i = 0; i < 8; i++){
        if(idx === getY * 8 + i){
            XList.push([getY * 8 + i, "click"]);
        }else{
            XList.push([getY * 8 + i, isEmpybox(oseloboxes[getY * 8 + i])]);
        }
        
    }
    console.log(XList);

    let YList = new Array();
    for(let i = 0; i < 8; i++){
        if(idx === i * 8 + getX){
            YList.push([i * 8 + getX, "click"]);
        }else{
            YList.push([i * 8 + getX, isEmpybox(oseloboxes[i * 8 + getX])]);
        }
        
    }
    console.log(YList);

    let C1List = new Array();
    for(let i = 0; i < 8; i++){
        if((getY - getX + i) >= 0 && (getY - getX + i) < 8){
            if((getY - getX + i) * 8 + i === idx){
                C1List.push([(getY - getX + i) * 8 + i, "click"]);
            }else{
                C1List.push([(getY - getX + i) * 8 + i, isEmpybox(oseloboxes[(getY - getX + i) * 8 + i])]);
            }
        }
    }
    console.log(C1List);

    let C2List = new Array();
    for(let i = 0; i < 8; i++){
        if((getY + getX - i) >= 0 && (getY + getX - i) < 8){
            if((getY - getX + i) * 8 + i === idx){
                C2List.push([(getY + getX - i) * 8 + i, "click"]);
            }else{
                C2List.push([(getY + getX - i) * 8 + i, isEmpybox(oseloboxes[(getY + getX - i) * 8 + i])]);
            }
        }
    }
    console.log(C2List);
    return [XList, YList, C1List, C2List];
}

function checkChangeList(list, player, otherPlayer){
    // 00122c00
    let changeList = new Array();
    let stack = new Array();
    let click_idx = -1;

    for(let i = 0; i < list.length; i++){
        if(list[i][1] === "click"){
            click_idx = i;
        }
    }

    for(let i = click_idx + 1; i < list.length; i++){
        if(list[i][1] === "fa-skull" || list[i][1] === "empty"){
            break;
        }
        if(list[i][1] === otherPlayer){
            stack.push(list[i][0]);
        }
        if(list[i][1] === player){
            changeList = new Array().concat(changeList, stack);
            break;
        }
    }

    stack = new Array();
    for(let i = click_idx - 1; i >= 0; i--){
        if(list[i][1] === "fa-skull" || list[i][1] === "empty"){
            break;
        }
        if(list[i][1] === otherPlayer){
            stack.push(list[i][0]);
        }
        if(list[i][1] === player){
            changeList = new Array().concat(changeList, stack);
            break;
        }
    }

    return changeList;
}

function sendData(datas) {
  socket.emit("getData", datas);
}

function oseloAddEvent(){

    for(let i = 0; i < oseloboxes.length; i++){
        oseloboxes[i].addEventListener('click', (e) => {
            console.log(`clicked! >> ${i}`)
            if(isEmpybox(oseloboxes[i]) !== "empty"){
                return;
            }
            if(player !== turn){
                return;
            }
            
            let linedata = scanline(i);
            
            if(player === "player1"){
                let chaingingData = new Array();
                for(let j = 0; j < linedata.length; j++){
                    let changeList = checkChangeList(linedata[j], "player1", "player2");
                    chaingingData = new Array().concat(chaingingData, changeList);
                }
                if(chaingingData.length > 0){
                    let dataSet = {player : "player1", 
                                chaingingData : chaingingData,
                                click : i};
                    sendData(dataSet);
                }
            }else if(player === "player2"){
                let chaingingData = new Array();
                for(let j = 0; j < linedata.length; j++){
                    let changeList = checkChangeList(linedata[j], "player2", "player1");
                    chaingingData = new Array().concat(chaingingData, changeList);
                }
                if(chaingingData.length > 0){
                    let dataSet = {player : "player2", 
                                chaingingData : chaingingData,
                                click : i};
                    sendData(dataSet);
                }
            }
            
    
            //onChangeBox(oseloboxes[i], "death");
        });
    }
}

let socket = io.connect(mySocketAddr);
socket.emit('joinRoom',{roomName : roomName});

socket.on("recData", (data) => { // 클릭후 데이터 수신
  //console.log(`turn : ${data.turn} recieved data : ${data.oceloTable}`);
  settingTable(data.oceloTable);
  turn = data.turn;
  round++;
  let state_f = isFinish(turn);
  document.querySelector(".oselo_userinfo").querySelector(`.player1`).innerText = `[player 1 : ${state_f[1]} ]`;
  document.querySelector(".oselo_userinfo").querySelector(`.player2`).innerText = `[player 2 : ${state_f[2]} ]`;
  document.querySelector(".oselo_turn_info").innerText = `[turn : ${turn}]`;
  document.querySelector(".oselo_round_info").innerText = `[round : ${round}]`;

  if(status_f[0] && status_f[1]){
    if(state_f[1] > state_f[2]){
        alert("player1 이 승리하였습니다.");
    }else if(state_f[1] < state_f[2]){
        alert("player2 이 승리하였습니다.");
    }else{
        alert("무승부 입니다.");
    }
    location.replace(myServerUrl + "/oselowatingroom?eraseRoom=" + data.roomName);
  }
  if(!state_f[0]){
    if(turn === "player1"){
        alert("player1 은 더이상 둘 곳이 없습니다!");
        status_f[0] = true;
        turn = "player2";
        document.querySelector(".oselo_turn_info").innerText = `[turn : ${turn}]`;
        state_f = isFinish(turn);
        if(!state_f[0]){
            status_f[1] = true;
        }
    }else if(turn === "player2"){
        alert("player2 은 더이상 둘 곳이 없습니다!");
        status_f[1] = true;
        turn = "player1";
        document.querySelector(".oselo_turn_info").innerText = `[turn : ${turn}]`;
        state_f = isFinish(turn);
        if(!state_f[0]){
            status_f[0] = true;
        }
    }

    if(status_f[0] && status_f[1]){
        if(state_f[1] > state_f[2]){
            alert("player1 이 승리하였습니다.");
        }else if(state_f[1] < state_f[2]){
            alert("player2 이 승리하였습니다.");
        }else{
            alert("무승부 입니다.");
        }
        location.replace(myServerUrl + "/oselowatingroom?eraseRoom=" + data.roomName);
      }

  }
});

// 연결 두절
socket.on("disconnect", (data) => {
    console.log("소켓 통신 두절 감지");
    alert(`상대방이 나갔습니다. : ${data.player}`);
    location.replace(myServerUrl + "/oselowatingroom?eraseRoom=" + data.roomName);
  });

settingTable(oceloTable);
oseloAddEvent();

