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