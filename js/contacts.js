let colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"];
window.onresize = switchViewOnSize;

async function initContacts() {
    await sortContacts();
    renderContacts();
    setResizeBehaviour();
}

async function sortContacts() {
    users[loaduser].contacts = users[loaduser].contacts.sort((a, b) => (a.firstname > b.firstname ? 1 : -1));
    await saveToServer();
}

function renderContacts() {
    const list = document.getElementById("contact-list");
    list.innerHTML = "";
    let prevLetter = "";
    for (let i = 0; i < users[loaduser].contacts.length; i++) {
        const contact = users[loaduser].contacts[i];
        if (!contact.firstname) continue;
        const contactdata = generateContactData(contact);
        if (contactdata.firstLetter !== prevLetter) {
            list.innerHTML += generateSeparatorHtml(contactdata.firstLetter);
            prevLetter = contactdata.firstLetter;
        }
        list.innerHTML += generateContactHtml(contact, contactdata);
    }
}

function generateContactData(contact) {
    const contactdata = {};
    contactdata.abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
    contactdata.fullname = contact.firstname + " " + contact.lastname;
    contactdata.firstLetter = contact.firstname.charAt(0).toUpperCase();
    return contactdata;
}

function openContact(id, card) {
    let contentbox = document.getElementById("contact-detail-box");
    contentbox.innerHTML = "";
    unselectSelected();
    const contact = users[loaduser].contacts.find((element) => element.id === id);
    const contactdata = generateContactData(contact);
    contentbox.innerHTML += generateContactDetailBoxHtml(contact, contactdata);
    if (card && document.documentElement.clientWidth > 850) {
        card.classList.add("selected");
        card.querySelector(".profile-fullname").classList.add("selected");
    }
    document.documentElement.clientWidth <= 500 ? changeViewMobile() : "";
}

function unselectSelected() {
    document.querySelectorAll(".selected").forEach(function (selectedfield) {
        selectedfield.classList.remove("selected");
    });
}

function switchViewOnSize() {
    if (document.documentElement.clientWidth > 500) {
        switchToDefault();
    }
}

function switchToDefault() {
    let profilebuttons = document.querySelector(".profile-buttons");
    document.querySelector(".contact-list-box").style.removeProperty("width");
    document.querySelector(".contact-list-box").classList.remove("dnone");
    document.querySelector(".open-menu-button-box").classList.add("dnone");
    document.querySelector(".go-back-button").classList.add("dnone");
    document.querySelector(".contact-detail").classList.remove("mobile-contact-detail");
    if (profilebuttons) {
        profilebuttons.classList.remove("animation-mobile-sidebar");
    }
}

function changeViewMobile() {
    document.querySelector(".contact-detail").classList.add("mobile-contact-detail");
    document.querySelector(".contact-list-box").style.width = "0px";
    document.querySelector(".contact-list-box").classList.add("dnone");
    document.querySelector(".open-menu-button-box").classList.remove("dnone");
    document.querySelector(".go-back-button").classList.remove("dnone");
}

function openContactsSideMenu(event) {
    let menu = document.querySelector(".profile-buttons");
    let main = document.querySelector("main.contacts");
    menu.classList.add("animation-mobile-sidebar");
    menu.style.width = "96px";
    menu.style.padding = "10px";
    event.stopPropagation();
    main.onclick = closeContactsSideMenu;
}

async function closeContactsSideMenu() {
    let menu = document.querySelector(".profile-buttons");
    let main = document.querySelector("main.contacts");
    menu.style.removeProperty("width");
    await delay(300);
    menu.style.removeProperty("padding");
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
    document.getElementById("contact-added-notification").classList.add("notification-display");
    await delay(1500);
    document.getElementById("contact-added-notification").classList.remove("notification-display");
}

function buildNewContactArray(name, email, phone, color) {
    let counter = users[loaduser].contacts.find((element) => element.idcounter).idcounter;
    counter++;
    users[loaduser].contacts.find((element) => element.idcounter).idcounter = counter;
    return { id: counter, firstname: name.firstname, lastname: name.lastname, email: email, phone: phone, color: color };
}

function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
