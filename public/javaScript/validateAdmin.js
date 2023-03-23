let submit = document.getElementById('submit-btn');
let username = document.getElementById('username');
let password = document.getElementById('password');
let first, second = false;
const enableButton = () => {
    submit.disabled = false;
}

username.addEventListener('input', () => {
    if (username.value.length >= 3) {
        first = true;
    } else {
        first = false;
    }
    if(first && second){
        enableButton();
    }else{
        submit.disabled=true;
    }
});
password.addEventListener('input', () => {
    if (password.value.length >= 3) {
        second = true;
    } else {
        second = false;
    }
    if(first && second){
        enableButton();
    }else{
        submit.disabled=true;
    }
});

