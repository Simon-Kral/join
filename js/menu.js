/**
 * show the first letter of the first name and second name in the right corner 
 */
function menuLoginName() {
    let menuuser = document.getElementById("menu_user");
    let username = users[loaduser].name
        .split(" ")
        .slice(0, 2)
        .map((wort) => wort[0])
        .join("")
        .toUpperCase();
    menuuser.innerHTML = username;
}
/**
 * open and close menu
 */
function openMenu() {
    let openmenu = document.getElementById("menu_open");
    openmenu.innerHTML = menuInnerHTML();
}

function closeMenu() {
    let openmenu = document.getElementById("menu_open");
    openmenu.innerHTML = "";
}

function menuInnerHTML() {
    let menu = `        
    <div class="open-menu">
        <a href="privacy_policy.html" class="open-menu-up"> <p>Privacy Policy</p> </a>
        <a href="legal_notice.html" class="open-menu-mid"> <p>Legal notice</p> </a>
        <a href="index.html" class="open-menu-down" onclick="logOut()"> <p>Log out</p> </a>
    </div>
    <div class="menu-close" onclick="closeMenu()"></div>
    `;

    return menu;
}
/**
 * delete storage if logout
 */
function logOut() {
    loaduser = [];
    localStorage.removeItem("userI");
    sessionStorage.removeItem("userI");
    sessionStorage.removeItem("Guest");
    sessionStorage.removeItem("handyWelcomePlayed");
}
