let users = [];

async function init(){
    loadUsers();
}

async function loadUsers(){
    users = await getItem('users')
}

async function register() {
    if (register_pw_sign_in.value != register_pw_sign_in_confirm.value) {
        register_pw_sign_in_confirm.setCustomValidity("Passwords Don't Match");
        register_pw_sign_in_confirm.reportValidity();
    }
    else {
        users.push({
            name: register_name.value,
            email: register_email.value,
            password: register_pw_sign_in.value,
        })
        
        await setItem('users', JSON.stringify(users))
        resetForm()
    }
    setTimeout(function(){register_pw_sign_in_confirm.setCustomValidity('')}, 1400)
}

function login(){
let findusers = users.find(u => u.email == register_login_value.value && u.password == register_pw_login_value.value)

if(findusers) {
    window.location.assign("http://127.0.0.1:5500/summary.html");
    loginValueEmpty()
}
else{
    register_pw_login_value.setCustomValidity("Wrong Password or Email");
    register_pw_login_value.reportValidity();
}
setTimeout(function(){register_pw_login_value.setCustomValidity('')}, 1400)
}

function resetForm() {
    registerValueEmpty()
    backToLogin()
    singedUpSucces()
}

function registerValueEmpty() {
    register_name.value = '';
    register_email.value = '';
    register_pw_sign_in.value = '';
    register_pw_sign_in_confirm.value = '';
    register_checkbox.checked = false
}

function singedUpSucces() {
    let singedupsucces = document.getElementById('singed_Up_Succes')
    singedupsucces.classList.replace('d-none', 'singed-Up-Succes')
    setTimeout(singedUpSuccesRemove, 2000)
}

function singedUpSuccesRemove() {
    let singedupsucces = document.getElementById('singed_Up_Succes')
    singedupsucces.classList.replace('singed-Up-Succes', 'd-none')
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.login-input input').forEach(function (input) {
        let loginInput = input.closest('.login-input');

        input.addEventListener('focus', function () {
            loginInput.style.borderColor = 'rgb(41, 171, 226)';
        });
        input.addEventListener('blur', function () {
            if(input.checkValidity()) {
                loginInput.style.borderColor = '#D1D1D1';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.login-input input').forEach(function (input) {
        let loginInput = input.closest('.login-input');

        input.addEventListener('invalid', function () {
            loginInput.style.borderColor = 'red';
            setTimeout(function () {
                if (!input.matches(':focus')) { 
                    loginInput.style.borderColor = '#D1D1D1';
                }
            }, 3000);
        });
    });
});

function changeLoginImg() {
    let loginpwimg = document.getElementById('register_pw_login_img')

    if (loginpwimg.src.endsWith('assets/img/register_lock.png')) {
        loginpwimg.src = 'assets/img/visibility_off.png'
    }
}

function changeSigninImg() {
    let signinimg = document.getElementById('register_pw_sign_in_img')
    let signinimgconfirm = document.getElementById('register_pw_sign_in_confirm_img')

    if (signinimg.src.endsWith('assets/img/register_lock.png')) {
        signinimg.src = 'assets/img/visibility_off.png';
        signinimgconfirm.src = 'assets/img/visibility_off.png'
    }
    if (signinimgconfirm.src.endsWith('assets/img/register_lock.png')) {
        signinimg.src = 'assets/img/visibility_off.png';
        signinimgconfirm.src = 'assets/img/visibility_off.png'
    }
}

function encryptPassword1() {
    let loginpw = document.getElementById('register_pw_login_value')
    let loginpwimg = document.getElementById('register_pw_login_img')

    if (loginpwimg.src.endsWith('assets/img/visibility_off.png')) {
        loginpw.type = 'text';
        loginpwimg.src = 'assets/img/visibility.png';
    }
    else {
        loginpw.type = 'password';
        loginpwimg.src = 'assets/img/visibility_off.png';
    }
}

function encryptPassword2() {
    let signinpw = document.getElementById('register_pw_sign_in')
    let signinpimg = document.getElementById('register_pw_sign_in_img')
    let signinpwconfirm = document.getElementById('register_pw_sign_in_confirm')
    let signinpwconfirmimg = document.getElementById('register_pw_sign_in_confirm_img')
    encryptPassword2IfElse(signinpw, signinpimg, signinpwconfirm, signinpwconfirmimg)
}

function encryptPassword2IfElse(signinpw, signinpimg, signinpwconfirm, signinpwconfirmimg) {
    if (signinpimg.src.endsWith('assets/img/visibility_off.png')) {
        signinpw.type = 'text';
        signinpwconfirm.type = 'text';
        signinpimg.src = 'assets/img/visibility.png';
        signinpwconfirmimg.src = 'assets/img/visibility.png';
    }
    else {
        signinpw.type = 'password';
        signinpwconfirm.type = 'password';
        signinpimg.src = 'assets/img/visibility_off.png';
        signinpwconfirmimg.src = 'assets/img/visibility_off.png';
    }
}