let users = [];
let loaduser = [];
let todo = [
    {
        title: "CSS Architecture Planning",
        description: "Define CSS naming conventions and structures",
        date: "14/09/2024",
        category: "Technical Task",
        prio: "urgent",
        subtasks: [
            {
                idcounter: 0,
            },
            {
                id: 1,
                name: "who does what",
                isChecked: true
            },
            {
                id: 2,
                name: "what time",
                isChecked: false
            }
        ],
        contacts: [
            { idcounter: 2 },
            {
                id: 1,
                firstname: "Sofia",
                lastname: "Müller",
                email: "sofiam@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#00BEE8",
            },
            {
                id: 2,
                firstname: "Anton",
                lastname: "Mayer",
                email: "antom@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FF7A00",
            },
        ],
    },]
let tasksinprogress = [
    {
        title: "Daily Kochwelt Recipe",
        description: "Implement daily recipe and portion calculator",
        date: "14/09/2024",
        category: "User Story",
        prio: "low",
        subtasks: [
            {
                idcounter: 0,
            },
        ],
        contacts: [
            { idcounter: 2 },
            {
                id: 3,
                firstname: "Benedikt",
                lastname: "Ziegler",
                email: "benedikt@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#6E52FF",
            },
            {
                id: 4,
                firstname: "David",
                lastname: "Eisenberg",
                email: "davidberg@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FC71FF",
            },
            {
                id: 5,
                firstname: "Eva",
                lastname: "Fischer",
                email: "eva@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FFBB2B",
            },
        ],
    },]
let awaitingfeedback = [{
    title: "HTML Base Template Creation",
    description: "Create reusable HTML base templates",
    date: "14/09/2024",
    category: "Technical Task",
    prio: "low",
    subtasks: [
        {
            idcounter: 0,
        },
    ],
    contacts: [
        { idcounter: 2 },
        {
            id: 3,
            firstname: "Benedikt",
            lastname: "Ziegler",
            email: "benedikt@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "#6E52FF",
        },
        {
            id: 4,
            firstname: "David",
            lastname: "Eisenberg",
            email: "davidberg@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "#FC71FF",
        },
    ],
},]
let Urgent = [{
    title: "CSS Architecture Planning",
    description: "Define CSS naming conventions and structures",
    date: "14/09/2024",
    category: "Technical Task",
    prio: "urgent",
    subtasks: [
        {
            idcounter: 0,
        },
        {
            id: 1,
            name: "who does what",
            isChecked: true
        },
        {
            id: 2,
            name: "what time",
            isChecked: false
        }
    ],
    contacts: [
        { idcounter: 2 },
        {
            id: 1,
            firstname: "Sofia",
            lastname: "Müller",
            email: "sofiam@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "#00BEE8",
        },
        {
            id: 2,
            firstname: "Anton",
            lastname: "Mayer",
            email: "antom@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "#FF7A00",
        },
    ],
},]
let contacts = [
    { idcounter: 9 },
    {
        id: 0,
        firstname: "Sofia",
        lastname: "Müller",
        email: "sofiam@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#00BEE8",
    },
    {
        id: 1,
        firstname: "Anton",
        lastname: "Mayer",
        email: "antom@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#FF7A00",
    },
    {
        id: 2,
        firstname: "Anja",
        lastname: "Schulz",
        email: "schulz@hotmail.com",
        phone: "+49 1111 111 11 1",
        color: "#9327FF",
    },
    {
        id: 3,
        firstname: "Benedikt",
        lastname: "Ziegler",
        email: "benedikt@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#6E52FF",
    },
    {
        id: 4,
        firstname: "David",
        lastname: "Eisenberg",
        email: "davidberg@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#FC71FF",
    },
    {
        id: 5,
        firstname: "Eva",
        lastname: "Fischer",
        email: "eva@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#FFBB2B",
    },]
/**
 * get user data and remove/reset sessionStorage items 
 */
async function loadstorageitems() {
    if (localStorage.getItem("userI") === null) {
    } else {
        if (localStorage.getItem("userI").length > 0) {
            window.location.assign("summary.html");
        }
    }
    loadUsers();
    sessionStorage.removeItem("userI");
    sessionStorage.removeItem("Guest");
    sessionStorage.removeItem("handyWelcomePlayed");
}
/**
 * get user data and remove/reset sessionStorage items 
 */
async function loadUsers() {
    users = await getItem("users");
}
/**
 * register function
 */
async function register() {
    let sameemail = users.find((u) => u.email == register_email.value);
    if (sameemail) {
        register_email.setCustomValidity("Email already exists");
        register_email.reportValidity();
    } else {
        ifelseRegister();
    }
    setTimeout(function () {
        register_email.setCustomValidity("");
    }, 1400);
}
/**
 * if password dont match = error, else create user and reset form 
 */
async function ifelseRegister() {
    if (register_pw_sign_in.value != register_pw_sign_in_confirm.value) {
        register_pw_sign_in_confirm.setCustomValidity("Passwords Don't Match");
        register_pw_sign_in_confirm.reportValidity();
    } else {
        users.push({
            name: register_name.value,
            email: register_email.value,
            password: register_pw_sign_in.value,
            todo,
            done: [],
            Urgent,
            tasksinprogress,
            awaitingfeedback,
            contacts,
        });
        await setItem("users", JSON.stringify(users));
        resetForm();
    }
    setTimeout(function () {
        register_pw_sign_in_confirm.setCustomValidity("");
    }, 1400);
}
/**
 * login function, if checkbox true = load in localstorage, else load in sessionstorage
 */
function login() {
    let findusers = users.find((u) => u.email == register_login_value.value && u.password == register_pw_login_value.value);

    if (login_checkbox.checked == true) {
        LoginLocalstorage(findusers);
    } else {
        Loginsessionstorage(findusers);
    }
}
/**
 * if find user = login, else = error
 */
function LoginLocalstorage(findusers) {
    if (findusers) {
        let userI = users.findIndex((u) => u.email == register_login_value.value && u.password == register_pw_login_value.value);
        loaduser.push(userI);
        localStorage.setItem("userI", loaduser);
        window.location.assign("summary.html");
        loginValueEmpty();
    } else {
        register_pw_login_value.setCustomValidity("Wrong Password or Email");
        register_pw_login_value.reportValidity();
    }
    setTimeout(function () {
        register_pw_login_value.setCustomValidity("");
    }, 1400);
}
/**
 * if find user = login, else = error (sessionstorage)
 */
function Loginsessionstorage(findusers) {
    if (findusers) {
        let userI = users.findIndex((u) => u.email == register_login_value.value && u.password == register_pw_login_value.value);
        loaduser.push(userI);
        sessionStorage.setItem("userI", loaduser);
        window.location.assign("summary.html");
        loginValueEmpty();
    } else {
        register_pw_login_value.setCustomValidity("Wrong Password or Email");
        register_pw_login_value.reportValidity();
    }
    setTimeout(function () {
        register_pw_login_value.setCustomValidity("");
    }, 1400);
}
/**
 * Guestlogin
 */
function registerGuestLogin() {
    loaduser = 0;
    users = [{
        name: "Guest",
        email: "",
        password: "",
        todo,
        done: [],
        Urgent,
        tasksinprogress,
        awaitingfeedback,
        contacts,
    },];
    sessionStorage.setItem("userI", loaduser);
    sessionStorage.setItem("Guest", JSON.stringify(users));
}
/**
 * reset register Form, send you back to login, and singedupsucces screen
 */
function resetForm() {
    registerValueEmpty();
    backToLogin();
    singedUpSucces();
}
/**
 * reset register Form
 */
function registerValueEmpty() {
    register_name.value = "";
    register_email.value = "";
    register_pw_sign_in.value = "";
    register_pw_sign_in_confirm.value = "";
    register_checkbox.checked = false;
}
/**
 * singedupsucces screen
 */
function singedUpSucces() {
    let singedupsucces = document.getElementById("singed_Up_Succes");
    singedupsucces.classList.replace("d-none", "singed-Up-Succes");
    setTimeout(singedUpSuccesRemove, 2000);
}
/**
 * singedupsucces screen remove
 */
function singedUpSuccesRemove() {
    let singedupsucces = document.getElementById("singed_Up_Succes");
    singedupsucces.classList.replace("singed-Up-Succes", "d-none");
}
/**
 * change password img if onlcick
 */
function changeLoginImg() {
    let loginpwimg = document.getElementById("register_pw_login_img");
    if (loginpwimg.src.endsWith("assets/img/register_lock.png")) {
        loginpwimg.src = "assets/img/visibility_off.png";
    }
}
/**
 * change password img if onlcick
 */
function changeSigninImg() {
    let signinimg = document.getElementById("register_pw_sign_in_img");
    let signinimgconfirm = document.getElementById("register_pw_sign_in_confirm_img");
    if (signinimg.src.endsWith("assets/img/register_lock.png")) {
        signinimg.src = "assets/img/visibility_off.png";
        signinimgconfirm.src = "assets/img/visibility_off.png";
    }
    if (signinimgconfirm.src.endsWith("assets/img/register_lock.png")) {
        signinimg.src = "assets/img/visibility_off.png";
        signinimgconfirm.src = "assets/img/visibility_off.png";
    }
}
/**
 * encrypt password if onlcick
 */
function encryptPassword1() {
    let loginpw = document.getElementById("register_pw_login_value");
    let loginpwimg = document.getElementById("register_pw_login_img");
    if (loginpwimg.src.endsWith("assets/img/visibility_off.png")) {
        loginpw.type = "text";
        loginpwimg.src = "assets/img/visibility.png";
    } else {
        loginpw.type = "password";
        loginpwimg.src = "assets/img/visibility_off.png";
    }
}
/**
 * encrypt password if onlcick
 */
function encryptPassword2() {
    let signinpw = document.getElementById("register_pw_sign_in");
    let signinpimg = document.getElementById("register_pw_sign_in_img");
    let signinpwconfirm = document.getElementById("register_pw_sign_in_confirm");
    let signinpwconfirmimg = document.getElementById("register_pw_sign_in_confirm_img");
    encryptPassword2IfElse(signinpw, signinpimg, signinpwconfirm, signinpwconfirmimg);
}
/**
 * encrypt password if onlcick
 */
function encryptPassword2IfElse(signinpw, signinpimg, signinpwconfirm, signinpwconfirmimg) {
    if (signinpimg.src.endsWith("assets/img/visibility_off.png")) {
        signinpw.type = "text";
        signinpwconfirm.type = "text";
        signinpimg.src = "assets/img/visibility.png";
        signinpwconfirmimg.src = "assets/img/visibility.png";
    } else {
        signinpw.type = "password";
        signinpwconfirm.type = "password";
        signinpimg.src = "assets/img/visibility_off.png";
        signinpwconfirmimg.src = "assets/img/visibility_off.png";
    }
}
