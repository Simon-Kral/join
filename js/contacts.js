let examplecontacts = [
  { idcounter: 9 },
  {
    id: 0,
    firstname: "Sofia",
    lastname: "Müller (You)",
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
  },
  {
    id: 6,
    firstname: "Emmanuel",
    lastname: "Mauer",
    email: "emmanuelma@gmail.com",
    phone: "+49 1111 111 11 1",
    color: "#1FD7C1",
  },
  {
    id: 7,
    firstname: "Marcel",
    lastname: "Bauer",
    email: "bauer@gmail.com",
    phone: "+49 1111 111 11 1",
    color: "#462F8A",
  },
  {
    id: 8,
    firstname: "Tatjana",
    lastname: "Wolf",
    email: "wolf@gmail.com",
    phone: "+49 1111 111 11 1",
    color: "#FF4646",
  },
  {
    id: 9,
    firstname: "Tatjana",
    lastname: "Wolf",
    email: "wolf@gmail.com",
    phone: "+49 1111 111 11 1",
    color: "#FF4646",
  },
];

function guestLogin() {
  loaduser = sessionStorage.getItem("userI");
  users = JSON.parse(sessionStorage.getItem("Guest"));
  renderContacts();
}

async function loadLocalStorage() {
  users = await getItem("users");
  loaduser = localStorage.getItem("userI");
  renderContacts();
}

async function loadSessionStorage() {
  users = await getItem("users");
  loaduser = sessionStorage.getItem("userI");
  renderContacts();
}

function renderContacts() {
  let list = document.getElementById("contact-list");
  list.innerHTML = "";
  let userscontact = [];
  if (examplecontacts.length > 0) {
    userscontact = examplecontacts.sort((a, b) =>
      a.firstname > b.firstname ? 1 : -1
    );
  } else {
    userscontact = users[loaduser].contacts.sort((a, b) =>
      a.firstname > b.firstname ? 1 : -1
    );
  }
  let prevLetter = "";
  for (let i = 0; i < userscontact.length - 1; i++) {
    const contact = userscontact[i];
    const abbreviation =
      contact.firstname.charAt(0) + contact.lastname.charAt(0);
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
  return `
        <div class="contact-list-separator-box">
            <span id="separator-letter-span">${letter}</span>
            <div class="separator-horizontal"></div>
        </div>
    `;
}

function generateContactHtml(contact, abbreviation, fullname) {
  let html = "";
  html += `
        <div class="contact contact-list-entry pointer" onclick="openContact(this, ${contact.id})">
            <div class="contact-info-box">
                <div>
                    <span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>
                </div>
                <div class="profile-info">
                    <span class="profile-fullname">${fullname}</span>
                    <a class="profile-email" href="mailto:${contact.email}">${contact.email}</a>
                </div>
            </div>
        </div>
    `;
  return html;
}

function openContact(card, id) {
  let contentbox = document.getElementById("contact-detail-box");
  document.querySelectorAll(".selected").forEach(function (selectedfield) {
    selectedfield.classList.remove("selected");
  });
  if (examplecontacts.length > 0) {
    userscontact = examplecontacts;
  } else {
    userscontact = users[loaduser].contacts;
  }
  const index = userscontact.findIndex((element) => element.id === id);
  const contact = userscontact[index];
  const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
  const fullname = contact.firstname + " " + contact.lastname;
  contentbox.innerHTML = "";
  contentbox.innerHTML += generateContactDetailBoxHtml(
    contact,
    abbreviation,
    fullname
  );
  card.classList.add("selected");
  card.querySelector(".profile-fullname").classList.add("selected");
}

function generateContactDetailBoxHtml(contact, abbreviation, fullname) {
  let html = "";
  html += `
        <div class="contact-detail-box-head">
            <div class="profile-badge-big-box">
                <span class="profile-badge-big" style="background-color: ${contact.color};">${abbreviation}</span>
            </div>
            <div class="profile-name-with-buttons-box">
                <div class="profile-name">${fullname}</div>
                <div class="profile-buttons">
                    <a>
                        <img src="./assets/img/edit.svg" alt="edit contact">
                        <span>Edit</span>
                    </a>
                    <a onclick="deletecontact(${contact.id})">
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
