const STORAGE_TOKEN = 'GGZFU08ASMNAH3MBMGAP9RUCKGE5H1V5Z9CP0MF1';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
        .then(res => res.json())
        .then(res => res.data.value)
        .then(value => JSON.parse(value))
}

async function loadStorage() {
    if (sessionStorage.getItem("Guest") === null) {
        if (localStorage.getItem("userI") === null) {
            if (sessionStorage.getItem("userI") === null) { moveToStartIfLocalEmpty() }
        }
        else {
            loadLocalStorage()
            loadmenuLocalStorage()
        }
        if (sessionStorage.getItem("userI") === null) {
            if (localStorage.getItem("userI") === null) { moveToStartIfSessionEmpty() }
        }
        else {
            loadSessionStorage()
            loadmenuSessionStorage()
        }
    }
    else {
        guestLogin()
        guestLoginMenu()
    }
}