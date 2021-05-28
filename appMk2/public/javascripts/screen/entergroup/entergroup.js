function init() {
    
    let show_userinfo = document.querySelector(".entergroup-userinfo");

    show_userinfo.querySelector(".entergroup-char_name").innerText = `캐릭터 명 : ${user_info.char_name}`;
    show_userinfo.querySelector(".entergroup-group").innerText = `그룹 정보 : ${user_info.group_name}`;
    show_userinfo.querySelector(".entergroup-position").innerText = `직위 : ${user_info.group_position}`;

    if(err.includes("guildNotSame")){
        alert("일치하는 캐릭터가 없거나 길드가 일치하지 않습니다.");
    }
    if(err.includes("groupNotExist")){
        alert("찾는 그룹이 존재하지 않습니다.");
    }

    if(msg.includes("downloading")){
        document.querySelector(".entergroup-updateData").innerHTML = `
            <div>데이터 설정 중</div>
        `;
    }

    if(msg.includes("downloadfin")){
        document.querySelector(".entergroup-updateData").innerHTML = `
            <div>데이터 설정 완료</div>
        `;
        alert("데이터 다운로드 성공");
    }

    if(msg.includes("dataExist")){
        document.querySelector(".entergroup-updateData").innerHTML = `
            <div>데이터 설정 완료</div>
        `;
    }

    if(isValEmpty(user_info.group_name) ){
        document.querySelector(".entergroup-applicant_list").innerHTML = "";
        document.querySelector(".entergroup-manage_group").innerHTML = "";
        document.querySelector(".entergroup-updateData").innerHTML = "";
    }else {
        document.querySelector(".entergroup-newgroup").innerHTML = "";
        document.querySelector(".entergroup-joingroup").innerHTML = "";
    }

    if(user_info.group_position !== "master" && user_info.group_position !== "sub_master") {
        document.querySelector(".entergroup-applicant_list").innerHTML = "";
        document.querySelector(".entergroup-manage_group").innerHTML = "";
        document.querySelector(".entergroup-updateData").innerHTML = "";
    }

}

init();

// function onclickDownloadBtn(){
//     document.querySelector(".entergroup-downloadBtn").setAttribute('disabled', true);
// }

