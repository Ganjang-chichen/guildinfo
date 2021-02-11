const guild_party1 = document.querySelector('.guild_party1');
const guild_party2 = document.querySelector('.guild_party2');
const guild_party3 = document.querySelector('.guild_party3');
const NOT_SELECTED = document.querySelector('.not_selected');
const SELECT = document.getElementById('room_select');

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

function get_preradelog_num(){ // 사전 편성표 인덱스
    let val;
    for(var i = guild_list.length - 1; i > -1; i--){
        if(guild_list[i].isfinished_rade === 1){
            val = i;
        }
        else {
            val = -1
        }
    }
    return val;
}
function get_radelog_num(){ // 레이드 결과 인덱스
    
    for(var i = guild_list.length - 1; i >= 0; i--){
        if(guild_list[i].isfinished_rade === 2){
            return i;
        }
    }
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
function get_card_html(c, name, best_floor, latest_floor, world, gname){ // 카드 생성문
    let cls = c;
    let listTags = `<div class="card" draggable="true">
                    <img src="/images/class_char_img/${cls}.png" alt="" draggable="false" class="classimg">
                    <div class="gradation"></div>
                    <div class="chard_info">
                        <div>${name}</div>
                        <div>${c}</div>
                        <div>최고기록:${best_floor}</div>
                        <div>최근기록:${latest_floor}</div>
                    </div>
                    <img src="/images/${world}/${gname}/${name}.png" alt="" draggable="false" class="charimg">
                </div>`
    return listTags;
}

function mklist(){
    let selected = SELECT.options[SELECT.selectedIndex].value;
    let pre = get_preradelog_num();
    let latest_date = char_list[char_list.length-1].input_date;
    for(let k = char_list.length - 1; k >= 0; k-- ){
        if(char_list[k].input_date === latest_date){
            if(pre !== -1){
                console.log('list option 1');
                let ISEXIST = false;
                let characters = get_entry(pre);
                for(let i = 0; i < characters.length; i++){
                    for(let j = 0; j < characters[i].length; j++){
                        for(let l = 0; l < characters[i][j].length; l++){
                            if(char_list[k].name === characters[i][j][l]){
                                ISEXIST = true;
                                console.log(char_list[k].name, characters[i][j][l], i, j, l, selected);
                                if(Number(selected) === i + 1){
                                    if(j === 0){
                                        guild_party1.innerHTML += get_card_html(char_list[k].class,
                                            char_list[k].name, 
                                            char_list[k].dojang_best_info, 
                                            char_list[k].dojang_latest_info,
                                            char_list[k].world,
                                            char_list[k].gname);
                                    }else if(j === 1){
                                        guild_party2.innerHTML += get_card_html(char_list[k].class,
                                            char_list[k].name, 
                                            char_list[k].dojang_best_info, 
                                            char_list[k].dojang_latest_info,
                                            char_list[k].world,
                                            char_list[k].gname);
                                    }else if(j === 2) {
                                        guild_party3.innerHTML += get_card_html(char_list[k].class,
                                            char_list[k].name, 
                                            char_list[k].dojang_best_info, 
                                            char_list[k].dojang_latest_info,
                                            char_list[k].world,
                                            char_list[k].gname);
                                    }
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
                                    char_list[k].gname);
                }
            }else{
                console.log('list option 2');
                NOT_SELECTED.innerHTML += get_card_html(char_list[k].class, 
                                    char_list[k].name, 
                                    char_list[k].dojang_best_info, 
                                    char_list[k].dojang_latest_info,
                                    char_list[k].world,
                                    char_list[k].gname);
            }
        }
    }
    
}

function init_rade(){
    mklist();
}

init_rade();