let allcontacts = [
    { idcounter: 9 },
    { id: 0, firstname: 'Sofia', lastname: 'Müller (You)', color: '#00BEE8' },
    { id: 1, firstname: 'Anton', lastname: 'Mayer', color: '#FF7A00' },
    { id: 2, firstname: 'Anja', lastname: 'Schulz', color: '#9327FF' },
    { id: 3, firstname: 'Benedikt', lastname: 'Ziegler', color: '#6E52FF' },
    { id: 4, firstname: 'David', lastname: 'Eisenberg', color: '#FC71FF' },
    { id: 5, firstname: 'Eva', lastname: 'Fischer', color: '#FFBB2B' },
    { id: 6, firstname: 'Emmanuel', lastname: 'Mauer', color: '#1FD7C1' },
    { id: 7, firstname: 'Marcel', lastname: 'Bauer', color: '#462F8A' },
    { id: 8, firstname: 'Tatjana', lastname: 'Wolf', color: '#FF4646' },
    { id: 9, firstname: 'Tatjana', lastname: 'Wolf', color: '#FF4646' }
]
let allcategories = [
    { idcounter: 1 },
    { id: 0, name: 'Technical Task' },
    { id: 1, name: 'User Story' }
]

let selectedcontacts = [];


function initAddTask() {
    renderAssignedTo();
    renderCategory();
}


function renderAssignedTo() {
    let dropdown = document.getElementById('drop_down_assigned_to');
    dropdown.innerHTML = '';
    for (let i = 1; i < allcontacts.length; i++) {
        const contact = allcontacts[i];
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        const fullname = contact.firstname + ' ' + contact.lastname;
        const color = contact.color;
        const id = contact.id;
        dropdown.innerHTML += generateContactHtml(abbreviation, fullname, color, id);
    }
}


function renderCategory() {
    let dropdown = document.getElementById('drop_down_category');
    dropdown.innerHTML = '';
    for (let i = 1; i < allcategories.length; i++) {
        const category = allcategories[i];
        const name = category.name;
        const id = category.id;
        dropdown.innerHTML += generateCategoryHtml(name, id);
    }
}


function generateContactHtml(abbreviation, fullname, color, id) {
    html = '';
    html += `
        <div class="drop-down-assigned-to-entry pointer" onmousedown="dontChangeFocus(event); selectContacts (this, ${id})">
            <div class="profile-info">
                <span class="profile-badge" style="background-color: ${color};">${abbreviation}</span>
                <span class="profile-fullname">${fullname}</span>
            </div>
            <img src="./assets/img/check_button_unchecked.svg" alt="">
        </div>
    `
    return html
}


function generateCategoryHtml(name, id) {
    html = '';
    html += `
        <div class="drop-down-category-entry pointer" onmousedown="dontChangeFocus(event); selectCategory (${id})">
            <span class="category-name">${name}</span>
        </div>
    `
    return html
}


function dontChangeFocus(event) {
    event.preventDefault();
}


function selectContacts(entry, id, selected) {
    entry.classList.toggle('selected');
    entry.children[1].attributes[0].value === './assets/img/check_button_unchecked.svg' ? entry.children[1].src = "./assets/img/check_button_checked.svg" : entry.children[1].attributes[0].value === './assets/img/check_button_checked.svg' ? entry.children[1].src = "./assets/img/check_button_unchecked.svg" : "";
    console.log(entry)
    if (selected === true) {
        const index = selectedcontacts.findIndex(element => element.id === id);
        selectedcontacts.splice(index, 1);
        entry.setAttribute('onmousedown', `dontChangeFocus(event); selectContacts(this, ${id}, ${!selected})`);
    } else {
        selectedcontacts.push(allcontacts.find(element => element.id === id));
        entry.setAttribute('onmousedown', `dontChangeFocus(event); selectContacts(this, ${id}, ${!selected})`);
    }
    renderSelectedContacts();
}


function handleClickPrio(prio) {
    let input = document.getElementById('prio_' + prio);
    let label = document.getElementById('prio_' + prio + '_label');
    let highlightedlabel = label.parentElement.querySelector('label.highlighted-button');
    highlightedlabel.classList.remove('highlighted-button');
    label.classList.add('highlighted-button');
}


function selectCategory(id) {
    const input = document.getElementById('input_with_button_category');
    const selectedcategory = allcategories.find(element => element.id === id);
    input.value = selectedcategory.name;
}


function renderSelectedContacts() {
    let container = document.getElementById('selectedContacts');
    container.innerHTML = '';
    for (let i = 0; i < selectedcontacts.length; i++) {
        const contact = selectedcontacts[i];
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        container.innerHTML += `<span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>`;
    }
}


function openDropDownMenu(id) {
    let dropdown = document.getElementById(id);
    let arrow = document.getElementById(id + '_arrow');
    dropdown.classList.toggle('dnone');
    arrow.style.transform === 'rotate(180deg)' ? arrow.style.transform = 'rotate(0deg)' : arrow.style.transform = 'rotate(180deg)';
}


function setFocusOnElement(id) {
    document.getElementById(id).focus();
}


function changeSubtaskIcons(focus) {
    console.log()
}