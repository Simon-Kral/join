async function loadmenu() {
    if (localStorage.getItem('userI').length > 0) {
        users = await getItem('users')
        loaduser = localStorage.getItem('userI')
        let menuuser = document.getElementById('menu_user');
        let username = users[loaduser].name.split(' ').slice(0, 2).map(wort => wort[0]).join('').toUpperCase()
        menuuser.innerHTML = username
    }
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
    loaduser.splice(loadUsers)
    localStorage.setItem('userI', loaduser)
}