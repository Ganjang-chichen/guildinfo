
function cardTextSetting(isMaster, id, lv, cls, doj_high, doj_cur, img) {
    let card = `
        <div class="char_card" draggable="${isMaster}">
            <img src="images/class_char_img/${cls}.png" alt="" class="card_class_img">
            <div class="gradation"></div>
            <div class="card_info">
                <div>
                    <div class="card_name">ID: ${id}</div>
                    <div class="card_LV">LV: ${lv}</div>
                </div>
                <div>
                    <div class="card_class">직업: ${cls}</div>
                    
                </div>
                <div>
                    <div class="card_best_dojang">무릉 최고: ${doj_high}</div>
                    <div class="card_latest_dojang">최근: ${doj_cur}</div>
                </div>
                
            </div>
            <img src="${img}" alt=""
                    class="card_char_img"
                    draggable="false">
            <div class="card_char_space"></div>
        </div>
    `;
    return card;
}

function addZero(num){
    if(num < 10) {
        return "0" + num;
    }else {
        return num.toString();
    }
}

function getList(log){ // 이전 기록 받아 [방, 파티, 케릭터명 ] 어레이 반환
    if (log === "default"){
        return [];
    }

    let char_list = new Array();
    for(let i = 1; i <= 12; i++){
        for(let j = 1; j <= 3; j++){
            let temp = log[`room${addZero(i)}${j}`];
            if(temp === null || temp === "") {
                continue;
            }else {
                let temp_list = temp.split(" ");
                for(let k = 0; k < temp_list.length; k++){
                    if(temp_list !== ""){
                        char_list.push([i, j, temp_list[k]]);
                    }
                }
            }
        }
    }
    return char_list;
}

function clear_partylist(){
    for(let i = 0; i < party1.length; i++){
        party1[i].innerHTML = '';
        party2[i].innerHTML = '';
        party3[i].innerHTML = '';
    }

    default_party.innerHTML = '';
}

function addCard(log, isMaster){
    let li = getList(log);

    for(let i = 0; i < datas.charData.length; i++) {
        let temp = datas.charData[i];
        let cardStr = cardTextSetting(isMaster, temp.name, temp.Lv, temp.class, 
                temp.dojang_best_info, temp.dojang_latest_info, temp.img_src);
        
        
        let isLogExist = false;
        for(let j = 0; j < li.length; j++) {
            if(li[j][2] === temp.name){
                isLogExist = [li[j][0], li[j][1]];
                break;
            }
        }
        
        if(isLogExist){
            if(isLogExist[1] === 1){
                party1[isLogExist[0] - 1].innerHTML += cardStr;
            }else if(isLogExist[2] === 2){
                party2[isLogExist[0] - 1].innerHTML += cardStr;
            }else if(isLogExist[3] === 3) {
                party3[isLogExist[0] - 1].innerHTML += cardStr;
            }
        }else {
            default_party.innerHTML += cardStr;
        }
    }
}

function init(){
    let isMaster = false;
    if(user_info.group_position === "master" || user_info.group_position === "sub_master"){
        isMaster = true;
    }

    clear_partylist();
    addCard("default", isMaster);

}

init();