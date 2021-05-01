// oseloboxes[]
// isEmpybox()

function checkLine(line, getPlayer) {
    
    let player = "";
    let otherPlayer = "";
    if(getPlayer === "player1"){
        player = "player1";
        otherPlayer = "player2";
    }else if(getPlayer === "player2"){
        player = "player2";
        otherPlayer = "player1";
    }

    let isExist = false;
    let status = "non";
    let control = 0;
    
    for(let i = 0; i < line.length; i++){
        if(line[i] === "fa-skull"){
            control = 11;
            status = "non";
        }else if(line[i] === "empty"){
            control = 12;
            status = "empty_status";
        }else if(line[i] === player && status === "empty_status"){
            control = 16;
            status = "non";
        }else if(line[i] === otherPlayer && status === "empty_status"){
            control = 13;
            status = "start";
        }else if(line[i] === otherPlayer && status === "start"){
            control = 14;
            status = "start";
        }else if(line[i] === player && status === "start"){
            control = 15;
            return true;
        }
        console.log(`i : ${i} line : ${line[i]} control : ${control} status : ${status}`);
    }

    status = "non";
    for(let i = line.length - 1; i >= 0; i--){
        if(line[i] === "fa-skull"){
            control = 21;
            status = "non";
        }else if(line[i] === "empty"){
            control = 22;
            status = "empty_status";
        }else if(line[i] === player && status === "empty_status"){
            control = 16;
            status = "non";
        }else if(line[i] === otherPlayer && status === "empty_status"){
            control = 23;
            status = "start";
        }else if(line[i] === otherPlayer && status === "start"){
            control = 24;
            status = "start";
        }else if(line[i] === player && status === "start"){
            control = 25;
            //console.log(`i : ${i} line : ${line[i]} control : ${control} status : ${status}`);    
            return true;
        }
        //console.log(`i : ${i} line : ${line[i]} control : ${control} status : ${status}`);
    }
    //console.log("not found.");
    return isExist;
}


function isFinish (getPlayer) {

    let player = "";
    let otherPlayer = "";
    if(getPlayer === "player1"){
        player = "player1";
        otherPlayer = "player2";
    }else if(getPlayer === "player2"){
        player = "player2";
        otherPlayer = "player1";
    }

    let boxes = document.querySelectorAll(".oselo_empty_box");
    let status = [];
    let countP1 = 0;
    let countP2 = 0;
    let isFin = false;
    for(let i = 0; i < boxes.length; i++){
        let value = isEmpybox(boxes[i]);
        status.push(value);
        if(value === "player1"){
            countP1++;
        }else if(value === "player2"){
            countP2++;
        }
    }

    for(let i = 0; i < 8; i++){ // 가로
        let temp = [];
        for(let j = 0; j < 8; j++){
            temp.push(status[i * 8 + j]);
        }
        if(checkLine(temp, player)){
            return [true, countP1, countP2];
        }
        // console.log(`x line i : ${i}`);
        // console.log(temp);
    }
    for(let i = 0; i < 8; i++){ // 세로
        let temp = [];
        for(let j = 0; j < 8; j++){
            temp.push(status[j * 8 + i]);
        }
        if(checkLine(temp, player)){
            return [true, countP1, countP2];
        }
        // console.log(`y line i : ${i}`);
        // console.log(temp);
    }

    for(let i = 0; i < 16; i ++){ // 대각 우상 -> 좌하
        let temp = [];
        for(let j = 0; j < 8; j++){
            let k = i + (j * 8 - j);
            let getX = i - j;
            if(getX >= 0 && getX < 8){
                temp.push(status[k]);
            }
        }
        if(temp.length < 3){
            continue;
        }
        if(checkLine(temp, player)){
            return [true, countP1, countP2];
        }
        // console.log(`xy line i : ${i}`);
        // console.log(temp);
    }

    for(let i = -8; i < 8; i++){ // 대각 좌상 -> 우하
        let temp = [];
        for(let j = 0; j < 8; j++){
            let k = i + (j * 8 + j);
            let getX = i + j;
            if(getX >= 0 && getX < 8){
                temp.push(status[k]);
            }
        }
        if(temp.length < 3){
            continue;
        }
        if(checkLine(temp, player)){
            return [true, countP1, countP2];
        }
        // console.log(`-xy line i : ${i}`);
        // console.log(temp);
    }

    return [isFin, countP1, countP2];
}

