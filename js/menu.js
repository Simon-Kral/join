async function loadmenu() {
    if (sessionStorage.getItem("Guest") === null) {
        if (localStorage.getItem("userI") === null) {
            if (sessionStorage.getItem("userI") === null) { moveToStartIfLocalEmpty() }
        }
        else {
            loadmenuLocalStorage()
        }

        if (sessionStorage.getItem("userI") === null) {
            if (localStorage.getItem("userI") === null) { moveToStartIfSessionEmpty() }
        }
        else {
            loadmenuSessionStorage()
        }
    }
    else {
        guestLoginMenu()
    }
}

async function guestLoginMenu() {
    loaduser = sessionStorage.getItem('userI')
    users = JSON.parse(sessionStorage.getItem('Guest'))
}

function menuLoginName() {
    let menuuser = document.getElementById('menu_user');
    let username = users[loaduser].name.split(' ').slice(0, 2).map(wort => wort[0]).join('').toUpperCase()
    menuuser.innerHTML = username;
}

function moveToStartIfLocalEmpty() {
    if (localStorage.getItem("userI") === null) {
        window.location.assign("http://127.0.0.1:5500/index.html");
    }
}

function moveToStartIfSessionEmpty() {
    if (sessionStorage.getItem("userI") === null) {
        window.location.assign("http://127.0.0.1:5500/index.html");
    }
}

async function loadmenuLocalStorage() {
    users = await getItem('users')
    loaduser = localStorage.getItem('userI')
    menuLoginName()
}

async function loadmenuSessionStorage() {
    users = await getItem('users')
    loaduser = sessionStorage.getItem('userI')
    menuLoginName()
}

function openMenu() {
    let openmenu = document.getElementById('menu_open');
    openmenu.innerHTML = menuInnerHTML()
    closeMenuE(openmenu)
}

function closeMenuE(openmenu) {
    function closeMenu(event) {
        let removemenu = openmenu.contains(event.target);
        if (!removemenu) {
            openmenu.innerHTML = '';
            document.removeEventListener('click', closeMenu);
        }
    }
    setTimeout(function () {
        document.addEventListener('click', closeMenu);
    }, 0);
}

function menuInnerHTML() {
    let menu = `        
    <div class="open-menu">
        <a href="privacy_policy.html" class="open-menu-up"> <p>Privacy Policy</p> </a>
        <a href="legal_notice.html" class="open-menu-mid"> <p>Legal notice</p> </a>
        <a href="index.html" class="open-menu-down" onclick="logOut()"> <p>Log out</p> </a>
    </div>`;
    return menu
}

function logOut() {
    loaduser = []
    localStorage.removeItem('userI')
    sessionStorage.removeItem('userI')
    sessionStorage.removeItem('Guest')
    sessionStorage.removeItem('handyWelcomePlayed')
}