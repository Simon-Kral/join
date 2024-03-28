const STORAGE_TOKEN = "GGZFU08ASMNAH3MBMGAP9RUCKGE5H1V5Z9CP0MF1";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
        .then((res) => res.json())
        .then((res) => res.data.value)
        .then((value) => JSON.parse(value));
}

async function loadStorage() {
    if (sessionStorage.getItem("Guest") === null) {
        ifLocalStorageExist();
        ifSessionStorageExist();
    } else {
        loadAll();
    }
}

async function ifLocalStorageExist() {
    if (sessionStorage.getItem("userI") === null) {
        moveToStartIfLocalEmpty();
    } else {
        loadAll();
    }
}

async function ifSessionStorageExist() {
    if (sessionStorage.getItem("userI") === null) {
        if (localStorage.getItem("userI") === null) {
            moveToStartIfSessionEmpty();
        }
    } else {
        loadAll();
    }
}

async function loadAll() {
    if (sessionStorage.getItem("Guest") === null) {
        await loadAllIfElseLocalOrSession();
    } else {
        loaduser = sessionStorage.getItem("userI");
        users = JSON.parse(sessionStorage.getItem("Guest"));
    }
    loadAllIfElse();
    if (sessionStorage.getItem("Guest")) {
        await includeHTML();
    }
    menuLoginName();
}

async function loadAllIfElseLocalOrSession() {
    if (sessionStorage.getItem("userI") === null) {
        users = await getItem("users");
        loaduser = localStorage.getItem("userI");
    } else {
        users = await getItem("users");
        loaduser = sessionStorage.getItem("userI");
    }
}

async function loadAllIfElse() {
    if (window.loadSummaryProject) {
        loadSummaryProject();
        timeIfElse();
    }
    if (window.boardinit) {
        boardinit();
    }
    if (window.fillAddTaskSectionload && window.boardinit == null) {
        fillAddTaskSection();
    }
    if (window.initContacts) {
        contactsIfElse();
    }
}

async function contactsIfElse() {
    if (sessionStorage.getItem("Guest") === null) {
        await initContacts();
    } else {
        renderContacts();
    }
}

async function timeIfElse() {
    if (sessionStorage.getItem("Guest") === null) {
        userTime();
    } else {
        guestTime();
        sommary_name.innerHTML = "";
    }
}

function moveToStartIfLocalEmpty() {
    if (localStorage.getItem("userI") === null) {
        window.location.assign("index.html");
    }
}

function moveToStartIfSessionEmpty() {
    if (sessionStorage.getItem("userI") === null) {
        window.location.assign("index.html");
    }
}
