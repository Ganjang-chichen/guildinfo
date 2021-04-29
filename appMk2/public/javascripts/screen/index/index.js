let showID = document.querySelector(".menu_showID");
let logInOut = document.querySelector(".menu_login_div");

if(id !== "" && id !== undefined){
    let logoutHTML = 
        `<form action="/signin/logout" method="GET">
            <button class="menu_moveBtn">로그아웃</button>
        </form>`;

    showID.innerText = `환영합니다. ${id}`;
    logInOut.innerHTML = logoutHTML;
}else {
    let loginHTML = 
        `<form action="/login" method="GET">
            <button class="menu_moveBtn">로그인</button>
        </form>`;

    showID.innerText = "";
    logInOut.innerHTML = loginHTML;
}