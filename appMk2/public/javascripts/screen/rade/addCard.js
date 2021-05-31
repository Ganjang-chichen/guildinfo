
function clsUpperSet(c) {
    let cls = c;
    if(c === '파이터' || c === '크루세이더'){
        cls = '히어로';
    }else if(c === '페이지' || c === '나이트'){
        cls = '팔라딘';
    }else if(c === '스피어맨' || c === '버서커'){
        cls = '다크나이트';
    }else if(c === '위자드(불,독)' || c === '메이지(불,독)'){
        cls = '아크메이지(불,독)';
    }else if(c === '위자드(썬,콜)' || c === '메이지(썬,콜)'){
        cls = '아크메이지(썬,콜)';
    }else if(c === '클레릭' || c === '프리스트'){
        cls = '비숍';
    }else if(c === '헌터' || c === '레인저'){
        cls = '보우마스터';
    }else if(c === '사수' || c === '저격수'){
        cls = '신궁';
    }else if(c === '위자드(썬,콜)' || c === '메이지(썬,콜)'){
        cls = '아크메이지(썬,콜)';
    }else if(c === '어쌔신' || c === '허밋'){
        cls = '나이트로드';
    }else if(c === '시프' || c === '시프마스터'){
        cls = '섀도어';
    }else if(c === '인파이터' || c === '버커니어'){
        cls = '바이퍼';
    }else if(c === '건슬링거' || c === '발키리'){
        cls = '캡틴';
    }else if(c === '캐논슈터' || c === '캐논블래스터'){
        cls = '캐논마스터';
    }else if(c === '세미듀어러' || c === '듀어러' || c === '듀얼마스터' || c === '슬래셔'){
        cls = '듀얼블레이더';
    }else if(c === 'X' || c === "" || c === null){
        cls = '초보자';
    }

    return cls;
}

function cardTextSetting(isMaster, id, lv, cls, doj_high, doj_cur, img) {
    if(doj_high === null || doj_high === ""){
        doj_high = "00층";
    }
    if(doj_cur === null || doj_cur === ""){
        doj_cur = "00층";
    }

    let card = `
        <div class="char_card" draggable="${isMaster}">
            <img src="images/class_char_img/${clsUpperSet(cls)}.png" alt="" class="card_class_img">
            <div class="gradation"></div>
            <div class="card_info">
                <div>
                    <div class="card_name">ID: ${id}</div>
                    <div class="card_LV">LV: ${lv}</div>
                </div>
                <div>
                    <div class="card_class">직업: ${clsUpperSet(cls)}</div>
                    
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

function sortingCard() {

    let selectOpt = document.querySelector(".rade_options_sorting");
    let opt = selectOpt.options[selectOpt.selectedIndex].value.toString();

    console.log("sorting~ " + opt);

    let default_list = default_party.querySelectorAll(".char_card");
    let list_info = new Array();

    for(let i = 0; i < default_list.length; i++) {
        let arr = {
            idx : i,
            name : default_list[i].querySelector(".card_name").textContent.replace("ID: ", ""),
            className : default_list[i].querySelector(".card_class").textContent.replace("직업: ", ""),
            best : default_list[i].querySelector(".card_best_dojang").textContent.replace("무릉 최고: ", "").replace("층", ""),
            latest : default_list[i].querySelector(".card_latest_dojang").textContent.replace("최근: ", "").replace("층", "")
        }
        list_info.push(arr);
    }

    list_info.sort((a, b) => {
        if (a[opt] < b[opt]) {
            return 1;
        }
        if (a[opt] > b[opt]) {
            return -1;
        }
        return 0;
    });

    default_list.innerHTML = '';
    for(let i = 0; i < list_info.length; i++) {
        default_party.appendChild(default_list[list_info[i].idx]);
    }

}