const guild_party1 = document.querySelectorAll('.guild_party1');
const guild_party2 = document.querySelectorAll('.guild_party2');
const guild_party3 = document.querySelectorAll('.guild_party3');
const NOT_SELECTED = document.querySelector('.not_selected');

let curweek = getweek(0);


function getweekslog(){ //길드 리스트 날짜 반환
    let weeklog = [];
    guild_list = get_guild_list();
    for(var i = 0; i < guild_list.length; i++){
        weeklog.append(guild_list[i].input_date.split('T')[0]);
    }
    return weeklog;
}

function getsameweek(date){
    let gweeks = getweekslog();
    for(let i = 0; i < gweeks.length; i++){
        if(gweeks[i] === date){
            return i;
        }
    }
}

function get_preradelog_num(weeknum){ // 사전 편성표 인덱스
    let val = -1;
    for(var i = guild_list.length - 1; i > -1; i--){
        if(guild_list[i].isfinished_rade === 1 && guild_list[i].input_date === getweek(weeknum, true)[2]){
            val = i;
            break;
        }
        else {
            val = -1
        }
    }
    return val;
}


function get_entry(collumn_num){ // 해당 길드 리스트에서 파티 목록 반환
    
    let characters = [];
    for(var i = 1; i <= 12; i++){
        let party = [];
        for(var j = 1; j <=3; j++){
            let room_num;
            if(i < 10){
                room_num = `0${i}${j}`;
            }else{
                room_num = `${i}${j}`;
            }
            let character = guild_list[collumn_num][`room${room_num}`];
            let char_members = [];
            if(character){
                char_members = character.split(' ');
            }
            party.push(char_members);
        }
        characters.push(party);
    }
    return characters;
}
function get_card_html(c, name, best_floor, latest_floor, world, gname, room_num){ // 카드 생성문
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

    let listTags = `<div class="card" draggable="true">
                    <img src="/images/class_char_img/${cls}.png" alt="" draggable="false" class="classimg">
                    <div class="gradation"></div>
                    <div class="card_info">
                        <div>${name}</div>
                        <div>${cls}</div>
                        <div>최고기록:${best_floor}</div>
                        <div>최근기록:${latest_floor}</div>
                    </div>
                    <img src="/images/${world}/${gname}/${name}.png" alt="" draggable="false" class="charimg">
                    <input type="text" name="room_name" value="${room_num} ${name}" class="hidden" />
                </div>`
    return listTags;
}

function clear_partylist(){
    for(let i = 0; i < guild_party1.length; i++){
        guild_party1[i].innerHTML = '';
        guild_party2[i].innerHTML = '';
        guild_party2[i].innerHTML = '';
    }

    NOT_SELECTED.innerHTML = '';
}


function mklist(){
    clear_partylist();

    const week_select = document.getElementById('selectWeek-rade');
    let week_selected = week_select.options[week_select.selectedIndex].value;
    let pre = get_preradelog_num(week_selected);
    let latest_date = char_list[char_list.length-1].input_date;
    for(let k = char_list.length - 1; k >= 0; k-- ){
        if(char_list[k].input_date === latest_date){
            if(pre !== -1){
                
                let ISEXIST = false;
                let characters = get_entry(pre);
                for(let i = 0; i < characters.length; i++){
                    for(let j = 0; j < characters[i].length; j++){
                        for(let l = 0; l < characters[i][j].length; l++){
                            if(char_list[k].name === characters[i][j][l]){
                                ISEXIST = true;
                                
                                let room_num;
                                if(i+1 < 10){
                                    room_num = `0${i+1}${j+1}`;
                                }else{
                                    room_num = `${i+1}${j+1}`;
                                }

                                if(j === 0){
                                    guild_party1[i].innerHTML += get_card_html(char_list[k].class,
                                        char_list[k].name, 
                                        char_list[k].dojang_best_info, 
                                        char_list[k].dojang_latest_info,
                                        char_list[k].world,
                                        char_list[k].gname,
                                        room_num);
                                }else if(j === 1){
                                    guild_party2[i].innerHTML += get_card_html(char_list[k].class,
                                        char_list[k].name, 
                                        char_list[k].dojang_best_info, 
                                        char_list[k].dojang_latest_info,
                                        char_list[k].world,
                                        char_list[k].gname,
                                        room_num);
                                }else if(j === 2) {
                                    guild_party3[i].innerHTML += get_card_html(char_list[k].class,
                                        char_list[k].name, 
                                        char_list[k].dojang_best_info, 
                                        char_list[k].dojang_latest_info,
                                        char_list[k].world,
                                        char_list[k].gname,
                                        room_num);
                                }
                                
                            }
                        }
                    }
                }

                if(ISEXIST === false){
                    NOT_SELECTED.innerHTML += get_card_html(char_list[k].class,
                                    char_list[k].name, 
                                    char_list[k].dojang_best_info, 
                                    char_list[k].dojang_latest_info,
                                    char_list[k].world,
                                    char_list[k].gname,
                                    '000');
                }
            }else{
                
                NOT_SELECTED.innerHTML += get_card_html(char_list[k].class, 
                                    char_list[k].name, 
                                    char_list[k].dojang_best_info, 
                                    char_list[k].dojang_latest_info,
                                    char_list[k].world,
                                    char_list[k].gname,
                                    '000');
            }
        }
    }
    
}

function addDragNDrop (){
    const cards = document.querySelectorAll('.card');
    let draggedItem = null;
    
    for(let i = 0; i < cards.length; i++){
        const card = cards[i];

        card.addEventListener('dragstart', (e) => {
            draggedItem = card;
            setTimeout(() => {
                card.style.display = 'none';
            }, 0);
        });

        card.addEventListener('dragend', (e) => {
            draggedItem.style.display = 'flex';
            draggedItem = null;
        });

        for(let j = 0; j < guild_party1.length; j++){
            const guild_party = guild_party1[j];

            guild_party.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            guild_party.addEventListener('dragenter', (e) => {
                e.preventDefault();

            });
            guild_party.addEventListener('dragleave', (e) => {

            });
            guild_party.addEventListener('drop', (e) => {
                
                guild_party.append(draggedItem);
                let input_name = draggedItem.querySelector('input.hidden').value.split(' ')[1];
                
                if((j+1) < 10){
                    draggedItem.querySelector('input.hidden').value = `0${j+1}1 ${input_name}`;
                }else{
                    draggedItem.querySelector('input.hidden').value = `${j+1}1 ${input_name}`;
                }
                
            });
        }

        for(let j = 0; j < guild_party2.length; j++){
            const guild_party = guild_party2[j];

            guild_party.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            guild_party.addEventListener('dragenter', (e) => {
                e.preventDefault();

            });
            guild_party.addEventListener('dragleave', (e) => {

            });
            guild_party.addEventListener('drop', (e) => {
                
                guild_party.append(draggedItem);
                let input_name = draggedItem.querySelector('input.hidden').value.split(' ')[1];
                
                if((j+1) < 10){
                    draggedItem.querySelector('input.hidden').value = `0${j+1}2 ${input_name}`;
                }else{
                    draggedItem.querySelector('input.hidden').value = `${j+1}2 ${input_name}`;
                }
                
            });
        }

        for(let j = 0; j < guild_party3.length; j++){
            const guild_party = guild_party3[j];

            guild_party.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            guild_party.addEventListener('dragenter', (e) => {
                e.preventDefault();

            });
            guild_party.addEventListener('dragleave', (e) => {

            });
            guild_party.addEventListener('drop', (e) => {
                
                guild_party.append(draggedItem);
                let input_name = draggedItem.querySelector('input.hidden').value.split(' ')[1];
                
                if((j+1) < 10){
                    draggedItem.querySelector('input.hidden').value = `0${j+1}3 ${input_name}`;
                }else{
                    draggedItem.querySelector('input.hidden').value = `${j+1}3 ${input_name}`;
                }
                
            });
        }

        NOT_SELECTED.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        NOT_SELECTED.addEventListener('dragenter', (e) => {
            e.preventDefault();

        });
        NOT_SELECTED.addEventListener('dragleave', (e) => {

        });
        NOT_SELECTED.addEventListener('drop', (e) => {
            NOT_SELECTED.append(draggedItem);
            let input_name = draggedItem.querySelector('input.hidden').value.split(' ')[1];
            
            draggedItem.querySelector('input.hidden').value = `000 ${input_name}`;
        });
    }
    
}

function moveToSelected(){
    const SELECT_TO_MOVE = document.getElementById('moveInRade');
    let selectedValue = SELECT_TO_MOVE.options[SELECT_TO_MOVE.selectedIndex].value
    window.scrollTo(0, 400 + 760 * (selectedValue -1));
}

function sort_NotSelected (){
    let not_SelectedLists = NOT_SELECTED.querySelectorAll('.card');
    let not_SelectedInfo = [];
    let sort_select = document.getElementById('not_selected_sort_option');
    let sort_option = sort_select.options[sort_select.selectedIndex].value;

    for(let i = 0; i < not_SelectedLists.length; i++) {
        let arr = { idx : i,
                name :   not_SelectedLists[i].querySelector('.card_info div:nth-child(1)').textContent,
                classname : not_SelectedLists[i].querySelector('.card_info div:nth-child(2)').textContent, 
                best :      not_SelectedLists[i].querySelector('.card_info div:nth-child(3)').textContent.replace('최고기록:','').replace('층',''), 
                latest :    not_SelectedLists[i].querySelector('.card_info div:nth-child(4)').textContent.replace('최근기록:','').replace('층','') };
        not_SelectedInfo.push(arr);
    }

    not_SelectedInfo.sort((a,b) => {
        if (a[sort_option] < b[sort_option]) {
            return 1;
          }
          if (a[sort_option] > b[sort_option]) {
            return -1;
          }
          // a must be equal to b
          return 0;
    });
    NOT_SELECTED.innerHTML = '';
    for(let i = 0; i < not_SelectedInfo.length; i++){
        NOT_SELECTED.appendChild(not_SelectedLists[not_SelectedInfo[i].idx]);
    }
}

let not_selected_hide = false;
function hide_box(){
    if(not_selected_hide){
        if(window.innerHeight > 900){
            NOT_SELECTED.style = 'height : 600px;';
        }else {
            NOT_SELECTED.style = 'height : 300px;';
        }
        
        not_selected_hide = false;
    }else {
        NOT_SELECTED.style = 'height : 100px;';
        not_selected_hide = true;
    }
}


function init_rade(){
    mklist();
    addDragNDrop();
}

init_rade();

let not_selected_position = 'right';
function move_box(){
    let box = document.querySelector('.option_box-rade');
    let mv_btn = document.querySelector('.move_optionbox');
    let left = window.innerWidth - 410;
    if(not_selected_position == 'right'){
        document.documentElement.style.setProperty('--left', `${left}px;`);
        mv_btn.style = 'animation: move_left 2s ease-in-out forwards;';
        box.style = 'animation: move_left 2s ease-in-out forwards;';
        not_selected_position = 'left';
        window.addEventListener('resize', (e) =>{
            left = window.innerWidth - 410;
            mv_btn.style = `right : ${left}px;`;
            box.style = `right : ${left}px;`;
            
        });
    }else {
        document.documentElement.style.setProperty('--left', `${left}px`);
        mv_btn.style = 'animation: move_right 2s ease-in-out forwards;';
        box.style = 'animation: move_right 2s ease-in-out forwards;';
        not_selected_position = 'right';
        window.addEventListener('resize', (e) =>{
            left = 20;
            mv_btn.style = `right : ${left}px;`;
            box.style = `right : ${left}px;`;
        });
    }
}

