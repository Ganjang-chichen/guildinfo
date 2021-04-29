let roomUL = document.querySelector('.oselorooms_list');


function inputRoom(list){
    for(let i = 0; i < list.length; i++){
        let li = document.createElement('li');
        li.innerHTML = `
            <div>${i}번방</div>
            <div>${list[i]}</div>
            <div>상태</div>
            <form action = "/oselowatingroom/enter" method = "POST">
                <button>들어가기</button>
                <input type="text" name="roomName" value="${list[i]}" class="hidden"/>
            </form>
            
        `
        roomUL.append(li);
    }
}

inputRoom(roomList);