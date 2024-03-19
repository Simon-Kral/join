
function guestLogin() {
    loaduser = sessionStorage.getItem('userI')
    users = JSON.parse(sessionStorage.getItem('Guest'))
    renderContacts()
}

async function loadLocalStorage() {
    users = await getItem('users')
    loaduser = localStorage.getItem('userI')
    renderContacts()
}

async function loadSessionStorage() {
    users = await getItem('users')
    loaduser = sessionStorage.getItem('userI')
    renderContacts()
}

function renderContacts() {
    let list = document.getElementById('contact-list');
    list.innerHTML = '';
    let userscontact = users[loaduser].contacts.sort((a, b) => (a.firstname > b.firstname) ? 1 : -1);
    let prevLetter = '';
    for (let i = 0; i < userscontact.length -1; i++) {
        const contact = userscontact[i];
        console.log(contact)
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        const fullname = contact.firstname + ' ' + contact.lastname;
        const firstLetter = contact.firstname.charAt(0).toUpperCase();
        if (firstLetter !== prevLetter) {
            list.innerHTML += generateSeparatorHtml(firstLetter);
            prevLetter = firstLetter;
        }
        list.innerHTML += generateContactHtml(contact, abbreviation, fullname);
    }
}

function generateSeparatorHtml(letter) {
    return `
        <div class="contact-list-separator-box">
            <span id="separator-letter-span">${letter}</span>
            <div class="separator-horizontal"></div>
        </div>
    `;
}


function generateContactHtml(contact, abbreviation, fullname) {
    let html = '';
    html += `
        <div class="contact contact-list-entry pointer" onclick="openContact(this, ${contact.id})">
            <div class="contact-info-box">
                <div>
                    <span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>
                </div>
                <div class="profile-info">
                    <span class="profile1-fullname">${fullname}</span>
                    <a id="profile-email" href="mailto:${contact.email}">${contact.email}</a>
                </div>
            </div>
        </div>
    `
    return html
}


function openContact(card, id) {

}