let allcontacts = [
    { idcounter: 9 },
    { id: 0, firstname: 'Sofia', lastname: 'Müller (You)', email: 'sofiam@gmail.com', phone: '+49 1111 111 11 1', color: '#00BEE8' },
    { id: 1, firstname: 'Anton', lastname: 'Mayer', email: 'antom@gmail.com', phone: '+49 1111 111 11 1', color: '#FF7A00' },
    { id: 2, firstname: 'Anja', lastname: 'Schulz', email: 'schulz@hotmail.com', phone: '+49 1111 111 11 1', color: '#9327FF' },
    { id: 3, firstname: 'Benedikt', lastname: 'Ziegler', email: 'benedikt@gmail.com', phone: '+49 1111 111 11 1', color: '#6E52FF' },
    { id: 4, firstname: 'David', lastname: 'Eisenberg', email: 'davidberg@gmail.com', phone: '+49 1111 111 11 1', color: '#FC71FF' },
    { id: 5, firstname: 'Eva', lastname: 'Fischer', email: 'eva@gmail.com', phone: '+49 1111 111 11 1', color: '#FFBB2B' },
    { id: 6, firstname: 'Emmanuel', lastname: 'Mauer', email: 'emmanuelma@gmail.com', phone: '+49 1111 111 11 1', color: '#1FD7C1' },
    { id: 7, firstname: 'Marcel', lastname: 'Bauer', email: 'bauer@gmail.com', phone: '+49 1111 111 11 1', color: '#462F8A' },
    { id: 8, firstname: 'Tatjana', lastname: 'Wolf', email: 'wolf@gmail.com', phone: '+49 1111 111 11 1', color: '#FF4646' },
    { id: 9, firstname: 'Tatjana', lastname: 'Wolf', email: 'wolf@gmail.com', phone: '+49 1111 111 11 1', color: '#FF4646' }
];

function initContacts() {
    renderContacts();
}

function renderContacts() {
    let list = document.getElementById('contact-list');
    list.innerHTML = '';
    allcontacts.sort((a, b) => (a.firstname > b.firstname) ? 1 : -1);
    let prevLetter = '';
    for (let i = 1; i < allcontacts.length - 1; i++) {
        const contact = allcontacts[i];
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