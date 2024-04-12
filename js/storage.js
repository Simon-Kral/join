const STORAGE_TOKEN = "GGZFU08ASMNAH3MBMGAP9RUCKGE5H1V5Z9CP0MF1";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
/**
 * set storage
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}
/**
 * get storage
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
        .then((res) => res.json())
        .then((res) => res.data.value)
        .then((value) => JSON.parse(value));
}
/**
 * load storage
 */
async function loadStorage() {
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
/**
 * Separate guest storage and customer storage
 */
async function loadAllIfElseLocalOrSession() {
    if (sessionStorage.getItem("userI") === null) {
        users = await getItem("users");
        loaduser = localStorage.getItem("userI");
        ifLocalStorageExist();
    } else {
        users = await getItem("users");
        loaduser = sessionStorage.getItem("userI");
        ifSessionStorageExist;
    }
}
/**
 * move to start if no local storage (no login)
 */
async function ifLocalStorageExist() {
    if (localStorage.getItem("userI") === null) {
        window.location.assign("index.html");
    }
}
/**
 * move to start if no session storage (no login)
 */
async function ifSessionStorageExist() {
    if (sessionStorage.getItem("userI") === null) {
        window.location.assign("index.html");
    }
}
/**
 * Separate guest storage and customer storage
 */
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
/**
 * if userer = load from backend, else = load form session storage
 */
async function contactsIfElse() {
    if (sessionStorage.getItem("Guest") === null) {
        await initContacts();
    } else {
        renderContacts();
    }
}
/**
 * if userer = load userTime, else = load guestTime
 */
async function timeIfElse() {
    if (sessionStorage.getItem("Guest") === null) {
        userTime();
    } else {
        guestTime();
        sommary_name.innerHTML = "";
    }
}