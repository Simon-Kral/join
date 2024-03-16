let users = [];
let loaduser = []

async function loadstorageitems() {
    if (localStorage.getItem("userI") === null) { }
    else {
        if (localStorage.getItem('userI').length > 0) {
            window.location.assign("http://127.0.0.1:5500/summary.html");
        }
    }
    loadUsers();
    sessionStorage.removeItem('userI')
    sessionStorage.removeItem('Guest')
}

async function loadUsers() {
    users = await getItem('users')
}

async function register() {
    let sameemail = users.find(u => u.email == register_email.value)
    if (sameemail) {
        register_email.setCustomValidity("Email already exists");
        register_email.reportValidity();
    }
    else {
        ifelseRegister()
    }
    setTimeout(function () { register_email.setCustomValidity('') }, 1400)
}

async function ifelseRegister() {
    if (register_pw_sign_in.value != register_pw_sign_in_confirm.value) {
        register_pw_sign_in_confirm.setCustomValidity("Passwords Don't Match");
        register_pw_sign_in_confirm.reportValidity();
    }
    else {
        users.push({
            name: register_name.value,
            email: register_email.value,
            password: register_pw_sign_in.value,
            todo: [],
            done: [],
            Urgent: [],
            tasksinprogress: [],
            awaitingfeedback: [],
        })

        await setItem('users', JSON.stringify(users))
        resetForm()
    }
    setTimeout(function () { register_pw_sign_in_confirm.setCustomValidity('') }, 1400)
}

function login() {
    let findusers = users.find(u => u.email == register_login_value.value && u.password == register_pw_login_value.value)

    if (login_checkbox.checked == true) {
        LoginLocalstorage(findusers)
    }
    else {
        Loginsessionstorage(findusers)
    }
}

function LoginLocalstorage(findusers) {
    if (findusers) {
        let userI = users.findIndex(u => u.email == register_login_value.value && u.password == register_pw_login_value.value);

        loaduser.push(userI);
        localStorage.setItem('userI', loaduser)
        window.location.assign("http://127.0.0.1:5500/summary.html");
        loginValueEmpty();
    }
    else {
        register_pw_login_value.setCustomValidity("Wrong Password or Email");
        register_pw_login_value.reportValidity();
    }
    setTimeout(function () { register_pw_login_value.setCustomValidity('') }, 1400)
}

function Loginsessionstorage(findusers) {
    if (findusers) {
        let userI = users.findIndex(u => u.email == register_login_value.value && u.password == register_pw_login_value.value);

        loaduser.push(userI);
        sessionStorage.setItem('userI', loaduser)
        window.location.assign("http://127.0.0.1:5500/summary.html");
        loginValueEmpty();
    }
    else {
        register_pw_login_value.setCustomValidity("Wrong Password or Email");
        register_pw_login_value.reportValidity();
    }
    setTimeout(function () { register_pw_login_value.setCustomValidity('') }, 1400)
}


function registerGuestLogin() {
    loaduser = 0
    users = [{
        name: '',
        email: '',
        password: '',
        todo: [{
            "title": "w",
            "description": "",
            "date": "14/03/2024",
            "category": "Technical Task",
            "prio": "urgent",
            "subtasks": [
                {
                    "idcounter": 0
                }
            ],
            "contacts": []
        }],
        done: [],
        Urgent: [],
        tasksinprogress: [],
        awaitingfeedback: [],
    }]
    sessionStorage.setItem('userI', loaduser)
    sessionStorage.setItem('Guest', JSON.stringify(users))
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