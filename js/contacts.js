let colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"];

function guestLogin() {
    loaduser = sessionStorage.getItem("userI");
    users = JSON.parse(sessionStorage.getItem("Guest"));
    renderContacts();
}

async function loadLocalStorage() {
    users = await getItem("users");
    loaduser = localStorage.getItem("userI");
    await initContacts();
}

async function loadSessionStorage() {
    users = await getItem("users");
    loaduser = sessionStorage.getItem("userI");
    await initContacts();
}

async function initContacts() {
    await sortContacts();
    renderContacts();
}

async function sortContacts() {
    users[loaduser].contacts = users[loaduser].contacts.sort((a, b) => (a.firstname > b.firstname ? 1 : -1));
    await saveToServer();
}

function renderContacts() {
    let list = document.getElementById("contact-list");
    list.innerHTML = "";
    let prevLetter = "";
    for (let i = 0; i < users[loaduser].contacts.length; i++) {
        const contact = users[loaduser].contacts[i];
        if (!contact.firstname) {
            continue;
        }
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        const fullname = contact.firstname + " " + contact.lastname;
        const firstLetter = contact.firstname.charAt(0).toUpperCase();
        if (firstLetter !== prevLetter) {
            list.innerHTML += generateSeparatorHtml(firstLetter);
            prevLetter = firstLetter;
        }
        list.innerHTML += generateContactHtml(contact, abbreviation, fullname);
    }
}

function generateSeparatorHtml(letter) {
    return /*html*/ `
        <div class="contact-list-separator-box">
            <span id="separator-letter-span">${letter}</span>
            <div class="separator-horizontal"></div>
        </div>
    `;
}

function generateContactHtml(contact, abbreviation, fullname) {
    let html = "";
    html += /*html*/ `
        <div class="contact contact-list-entry pointer" onclick="openContact(${contact.id}, this)">
            <div class="contact-info-box">
                <div>
                    <span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>
                </div>
                <div class="profile-info">
                    <span class="profile-fullname">${fullname}</span>
                    <a class="profile-email disabled" href="mailto:${contact.email}">${contact.email}</a>
                </div>
            </div>
        </div>
    `;
    return html;
}

function openContact(id, card) {
    let contentbox = document.getElementById("contact-detail-box");
    document.querySelectorAll(".selected").forEach(function (selectedfield) {
        selectedfield.classList.remove("selected");
    });
    const contact = users[loaduser].contacts.find((element) => element.id === id);
    const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
    const fullname = contact.firstname + " " + contact.lastname;
    contentbox.innerHTML = "";
    contentbox.innerHTML += generateContactDetailBoxHtml(contact, abbreviation, fullname);
    if (card) {
        card.classList.add("selected");
        card.querySelector(".profile-fullname").classList.add("selected");
    }
}

function generateContactDetailBoxHtml(contact, abbreviation, fullname) {
    let html = "";
    html += /*html*/ `
        <div class="contact-detail-box-head">
            <div class="profile-badge-big-box">
                <span class="profile-badge-big" style="background-color: ${contact.color};">${abbreviation}</span>
            </div>
            <div class="profile-name-with-buttons-box">
                <div class="profile-name">${fullname}</div>
                <div class="profile-buttons">
                    <a onclick="openContactEdition(${contact.id}, '${abbreviation}', '${fullname}')">
                        <img src="./assets/img/edit.svg" alt="edit contact">
                        <span>Edit</span>
                    </a>
                    <a onclick="deleteContact(${contact.id})">
                        <img src="./assets/img/delete.svg" alt="delete contact">
                        <span>Delete</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="contact-information-box">
            <span>Contact Information</span>
        </div>
        <div class="contact-detail-box-body">
            <h4>Email</h4>
            <a class="profile-email" href="mailto:${contact.email}">${contact.email}</a>
            <h4>Phone</h4>
            <a class="profile-phone" href="mailto:tel:${contact.phone}">${contact.phone}</a>
        </div>
    `;
    return html;
}

async function deleteContact(id) {
    const index = users[loaduser].contacts.findIndex((element) => element.id === id);
    users[loaduser].contacts.splice(index, 1);
    renderContacts();
    document.querySelector(".overlay").classList.add("dnone");
    await saveToServer();
    renderContacts();
    closeOverlay();
    clearContactDetails();
}

function openContactEdition(id, abbreviation, fullname) {
    let overlay = document.querySelector(".overlay");
    let contact = users[loaduser].contacts.find((element) => element.id === id);
    overlay.innerHTML = "";
    overlay.innerHTML += generateEditContactHtml(contact, abbreviation, fullname);
    overlay.classList.remove("dnone");
}

function closeOverlay() {
    document.querySelector(".overlay").classList.add("dnone");
}

function clearContactDetails() {
    document.getElementById("contact-detail-box").innerHTML = "";
}

async function saveEditedContact(id) {
    let fullname = document.getElementById("edit_contact_name").value;
    let email = document.getElementById("edit_contact_email").value;
    let phone = document.getElementById("edit_contact_phone").value;
    let name = formatName(fullname);
    let contact = users[loaduser].contacts.find((contact) => contact.id === id);
    contact.email = email;
    contact.phone = phone;
    contact.firstname = name.firstname;
    contact.lastname = name.lastname;
    await saveToServer();
    renderContacts();
    closeOverlay();
    openContact(id);
}

function formatName(fullname) {
    let names = fullname.split(" ");
    let firstname = "";
    for (let i = 0; i < names.length - 1; i++) {
        const name = names[i];
        i != names.length - 2 ? (firstname += capitalize(name) + " ") : (firstname += capitalize(name));
    }
    let lastname = capitalize(names[names.length - 1]);
    return { firstname: firstname, lastname: lastname };
}

function capitalize(string) {
    return string.replace(/(?<=[-\s]+|^)([a-zA-Z])/g, function (match) {
        return match.toUpperCase();
    });
}

async function saveToServer() {
    if (sessionStorage.getItem("Guest") === null) {
        await setItem("users", JSON.stringify(users));
    } else {
        sessionStorage.setItem("Guest", JSON.stringify(users));
    }
}

function generateEditContactHtml(contact, abbreviation, fullname) {
    let html = "";
    html += /*html*/ `
    <div class="overlay-box">
      <div class="overlay-box-head">
          <img src="./assets/img/join_logo.svg" alt="logo" />
          <h1>Edit contact</h1>
          <img src="./assets/img/line_horizontal.svg" alt="line" />
      </div>
      <div class="overlay-box-body">
          <a class="close-overlay-box" onclick="closeOverlay()">
              <img src="./assets/img/cross.svg" alt="close" />
          </a>
          <div class="overlay-body-content">
              <div class="profile-badge-big-box">
                  <span class="profile-badge-big" style="background-color: ${contact.color}">${abbreviation}</span>
              </div>
              <form class="edit-contact-form-box" onsubmit="saveEditedContact(${contact.id});return false" autocomplete="off">
                  <div class="input-with-img-wrapper">
                      <input type="text" value="${fullname}" pattern="\w+(\s\w+)+" class="styled-input focus-blue edit-contact-input" id="edit_contact_name"/>
                      <img src="./assets/img/person.svg" alt="person" />
                  </div>
                  <div class="input-with-img-wrapper">
                      <input type="email" value="${contact.email}" class="styled-input focus-blue edit-contact-input" id="edit_contact_email"/>
                      <img src="./assets/img/mail.svg" alt="mail" />
                  </div>
                  <div class="input-with-img-wrapper">
                      <input type="tel" value="${contact.phone}" class="styled-input focus-blue edit-contact-input" id="edit_contact_phone"/>
                      <img src="./assets/img/call.svg" alt="call" />
                  </div>
                  <div class="edit-contact-form-buttons">
                      <button type="button" class="white-button" onclick="deleteContact(${contact.id})">
                          <span>Delete</span>
                      </button>
                      <button type="submit" id="edit-contact-save-button" class="blue-button">
                          <span>Save</span>
                          <img src="./assets/img/check.svg" alt="check" />
                      </button>
                  </div>
              </form>
          </div>
      </div>
    </div>
  `;
    return html;
}

function openContactAdding() {
    let overlay = document.querySelector(".overlay");
    let color = colors[Math.floor(Math.random() * colors.length)];
    overlay.innerHTML = "";
    overlay.innerHTML += generateAddContactHtml(color);
    overlay.classList.remove("dnone");
}

async function saveNewContact() {
    let fullname = document.getElementById("add_contact_name").value;
    let email = document.getElementById("add_contact_email").value;
    let phone = document.getElementById("add_contact_phone").value;
    let color = document.getElementById("add_contact_color").value;
    let name = formatName(fullname);
    newcontact = buildNewContactArray(name, email, phone, color);
    users[loaduser].contacts.push(newcontact);
    await saveToServer();
    initContacts();
    closeOverlay();
}

function buildNewContactArray(name, email, phone, color) {
    let counter = users[loaduser].contacts.find((element) => element.idcounter).idcounter;
    counter++;
    users[loaduser].contacts.find((element) => element.idcounter).idcounter = counter;
    return { id: counter, firstname: name.firstname, lastname: name.lastname, email: email, phone: phone, color: color };
}

function generateAddContactHtml(color) {
    let html = "";
    html += /*html*/ `
  <div class="overlay-box">
    <div class="overlay-box-head">
        <img src="./assets/img/join_logo.svg" alt="logo" />
        <h1>Add contact</h1>
        <h2>Tasks are better with a team!</h2>
        <img src="./assets/img/line_horizontal.svg" alt="line" />
    </div>
    <div class="overlay-box-body">
        <a class="close-overlay-box" onclick="closeOverlay()">
            <img src="./assets/img/cross.svg" alt="close" />
        </a>
        <div class="overlay-body-content">
            <div class="profile-badge-big-box">
                <span class="profile-badge-big" style="background-color: ${color}"><img src="./assets/img/person_big.svg" alt="person"></span>
            </div>
            <form name="addContact" class="edit-contact-form-box" onsubmit="saveNewContact();return false" autocomplete="off">
                <div class="input-with-img-wrapper">
                    <input required placeholder="Name" type="text" pattern="[A-Za-z]+([ ][A-Za-z]+)+" class="styled-input focus-blue edit-contact-input" id="add_contact_name"/>
                    <img src="./assets/img/person.svg" alt="person" />
                </div>
                <div class="input-with-img-wrapper">
                    <input required placeholder="Email" type="email" class="styled-input focus-blue edit-contact-input" id="add_contact_email"/>
                    <img src="./assets/img/mail.svg" alt="mail" />
                </div>
                <div class="input-with-img-wrapper">
                    <input required placeholder="Phone" type="tel" class="styled-input focus-blue edit-contact-input" id="add_contact_phone"/>
                    <img src="./assets/img/call.svg" alt="call" />
                </div>
                <input type="text" class="dnone" value="${color}" id="add_contact_color">
                <div class="add-contact-form-buttons">
                    <button type="button" class="white-button" onclick="closeOverlay()">
                        <span>Cancel</span>
                        <img src="./assets/img/cross.svg" alt="cross" />
                    </button>
                    <button type="submit" id="add-contact-save-button" class="blue-button">
                        <span>Create contact</span>
                        <img src="./assets/img/check.svg" alt="check" />
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
`;
    return html;
}
