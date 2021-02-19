const NOT_JOIN_RADE = document.querySelector('.guild_not_join_li');
let NOT_JOIN_DATA;

function get_card_html_mk2(c, name, join_log, latest_log, world, gname){ // 카드 생성문
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
    }

    let listTags = `<div class="card_mk2" draggable="false">
                    <img src="/images/class_char_img/${cls}.png" alt="" draggable="false" class="classimg">
                    <div class="gradation"></div>
                    <div class="card_info">
                        <div>${name}</div>
                        <div>${cls}</div>
                        <div>최근참가기록:${join_log}</div>
                        <div>전주참가여부:${latest_log}</div>
                    </div>
                    <img src="/images/${world}/${gname}/${name}.png" alt="" draggable="false" class="charimg">
                </div>`
    return listTags;
}

function mk_not_joined_list() {
    const GUILD_NOT_JOIN_LI = document.querySelector('.guild_not_join_li');
    let LOGEXIST = [];
    let latest_date = char_list[char_list.length-1].input_date;
    
    const GUILD_NOT_JOIN_TERM = document.getElementById('guild_not_join_term');
    let options = Number(GUILD_NOT_JOIN_TERM.options[GUILD_NOT_JOIN_TERM.selectedIndex].value);
    const GUILD_NOT_JOIN_SORT = document.getElementById('guild_not_join_sort');
    let sort_options = String(GUILD_NOT_JOIN_SORT.options[GUILD_NOT_JOIN_SORT.selectedIndex].value);

    let not_join_list = [];

    for(let i = char_list.length -1; i >= 0; i--){
        
        if(char_list[i].input_date === latest_date){
            not_join_list.push([char_list[i].name, char_list[i].class, char_list[i].world, char_list[i].gname]);
        }
        
    }

    for(let i = 0; i < options; i++){
        let selectedWeek = getweek(i, true)[2];

        if(get_preradelog_num(i) !== -1){
            
            let attendance_char = get_entry(get_preradelog_num(i));

            for(let j = 0; j < attendance_char.length; j++) {
                for(let k = 0; k < attendance_char[j].length; k++){
                    for(let l = 0; l < attendance_char[j][k].length; l++){
                        for(let m = 0; m < not_join_list.length; m++) {
                            if( not_join_list[m][0] === attendance_char[j][k][l]){
                                not_join_list[m].push(selectedWeek);
                            }
                        }
                    }
                }
            }  
            LOGEXIST.push(true);
        }else {
            LOGEXIST.push(false);
        }
    }

    GUILD_NOT_JOIN_LI.innerHTML = '';

    if(sort_options === 'AES'){
        not_join_list.sort((a, b) => {
            if (a.length > b.length) {
                return 1;
              }
              if (a.length < b.length) {
                return -1;
              }
              // a must be equal to b
              return 0;
        });
    }else {
        not_join_list.sort((a, b) => {
            if (a.length < b.length) {
                return 1;
              }
              if (a.length > b.length) {
                return -1;
              }
              // a must be equal to b
              return 0;
        });
    }
    

    let EXIST_COUNT = 0;
    for(let i = 0; i < LOGEXIST.length; i++){
        if(!LOGEXIST[i]){
            EXIST_COUNT = EXIST_COUNT + 1;
        }
    }

    for(let i = 0; i < not_join_list.length; i++){
        let join_log = `${not_join_list[i].length - 4} / ${options - EXIST_COUNT}`;
        let latest_log = `불참`;
        
        for(let j = 0; j < not_join_list[i].length; j++){
            if(not_join_list[i][j] === getweek(1)[2]){
                latest_log = `참여`;
                break;
            }
        }
        
        GUILD_NOT_JOIN_LI.innerHTML += get_card_html_mk2(not_join_list[i][1], not_join_list[i][0], join_log, latest_log, not_join_list[i][2], not_join_list[i][3]);
    }

    NOT_JOIN_DATA = [not_join_list, LOGEXIST];

}

function show_not_join_info(){
    const NOT_JOIN_CARD = document.querySelectorAll('.card_mk2');
    const NOT_JOIN_INFO = document.querySelector('.guild_not_join_info');

    const GUILD_NOT_JOIN_TERM = document.getElementById('guild_not_join_term');
    let options = Number(GUILD_NOT_JOIN_TERM.options[GUILD_NOT_JOIN_TERM.selectedIndex].value);

    for(let k = 0; k < NOT_JOIN_CARD.length; k++){

        let not_join_info_html = `<h2> 상세 </h2>`;
        for(let i = 0; i < options; i++){
            let ISEXIST = false;
            for(let j = 0; j < NOT_JOIN_DATA[0][k].length; j++){
                if(NOT_JOIN_DATA[0][k][j] === getweek(i, true)[2]){
                    ISEXIST = true;
                    break;
                }
            }
            if(ISEXIST){
                not_join_info_html += `<div>${i}주전 : 참가 </div>`;
            }else if(!NOT_JOIN_DATA[1][i]){
                not_join_info_html += `<div>${i}주전 : 미시행 </div>`;
            }else{
                not_join_info_html += `<div>${i}주전 : 불참 </div>`;
            }
        }

        NOT_JOIN_CARD[k].onclick = () => {
            NOT_JOIN_INFO.innerHTML = not_join_info_html;
        }
    }
}

function init_not_join_rade(){
    mk_not_joined_list();
    show_not_join_info();
}

init_not_join_rade();