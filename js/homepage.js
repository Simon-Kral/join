function loadRegister() {

    setTimeout(loadRegisterTimeout, 500)
    setTimeout(loadRegisterTimeoutIndex, 1500)
}

function loadRegisterTimeout() {
    let startregisterbackground = document.getElementById('start_register_background')
    let startregisterbox = document.getElementById('start_register_box')

    startregisterbox.classList.replace('start-register-box','start-register-box-small')
    startregisterbackground.classList.replace('start-register-background', 'start-register-background-none')
}

function loadRegisterTimeoutIndex() {
    let startregisterbackground = document.getElementById('start_register_background')
    startregisterbackground.style.zIndex = -1;
}

function signUpBox() {
    let registerlogin = document.getElementById('register_login');
    let registersignin = document.getElementById('register_sign_in');
    let registersignupbox = document.getElementById('register_sign_up_box');

    registerlogin.classList.replace('register-login', 'd-none')
    registersignin.classList.replace('d-none', 'register-sign-up-box')
    registersignupbox.classList.replace('register-sign-up-flex', 'd-none')
}

function backToLogin() {
    let registerlogin = document.getElementById('register_login');
    let registersignin = document.getElementById('register_sign_in');
    let registersignupbox = document.getElementById('register_sign_up_box');

    registerlogin.classList.replace('d-none', 'register-login')
    registersignin.classList.replace('register-sign-up-box', 'd-none')
    registersignupbox.classList.replace('d-none', 'register-sign-up-flex')
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.login-input input').forEach(function(input) {
        let logininput = input.closest('.login-input');

        input.addEventListener('focus', function() {
            logininput.style.borderColor = 'rgb(41, 171, 226)';
        });

        input.addEventListener('blur', function() {
            logininput.style.borderColor = '#D1D1D1';
        });
    });
});