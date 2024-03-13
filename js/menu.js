async function loadmenu() {
    if (localStorage.getItem('userI').length > 0) {
        users = await getItem('users')
        loaduser = localStorage.getItem('userI')
        let menuuser = document.getElementById('menu_user');
        let username = users[loaduser].name.split(' ').slice(0, 2).map(wort => wort[0]).join('').toUpperCase()
        menuuser.innerHTML = username
    }
}