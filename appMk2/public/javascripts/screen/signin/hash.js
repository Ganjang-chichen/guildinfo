
let pw = document.getElementById("signin_id");
let pw_sha = document.getElementById("signin_hidden_pw");

function pw_input(){
    pw_sha.value = SHA256(String(pw.value));
}