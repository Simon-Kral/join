let tasks = [];
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
];
let allcategories = [
    { idcounter: 1 },
    { id: 0, name: 'Technical Task' },
    { id: 1, name: 'User Story' }
];
let allsubtasks = [
    { idcounter: 0 }
];
let selectedcontacts = [];


function initAddTask() {
    loadFromLocalStorage();
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
    if (prio) {
        let input = document.getElementById('prio_' + prio);
        let label = document.getElementById('prio_' + prio + '_label');
        if (label.parentElement.querySelector('label.highlighted-button')) {
            let highlightedlabel = label.parentElement.querySelector('label.highlighted-button');
            highlightedlabel.classList.remove('highlighted-button');
        }
        label.classList.add('highlighted-button');
        input.value = prio;
    } else {
        let input = document.getElementById('prio_' + prio);
        let container = document.getElementById('prio-buttons').;
        console.log(elements)
        for (let i = 0; i < container.length; i++) {
            const element = container[i];
            element.classList.remove('highlighted-button');
            element.value = '';
        }
    }
}


function selectCategory(id) {
    const input = document.getElementById('input_with_button_category');
    const selectedcategory = allcategories.find(element => element.id === id);
    input.value = selectedcategory.name;
}


function renderSelectedContacts() {
    let container = document.getElementById('selected_contacts');
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
    let addbutton = document.getElementById('add_subtask_button');
    let confirmcontainer = document.getElementById('confirm_subtask_container');
    addbutton.classList.toggle('dnone');
    confirmcontainer.classList.toggle('dnone');
}


function clearInput(id) {
    let input = document.getElementById(id);
    input.value = '';
}


function addSubtask(inputid) {
    let input = document.getElementById(inputid);
    let content = document.getElementById('selected_subtasks');
    let subtaskid = allsubtasks[0].idcounter;
    let arrayelement = { id: subtaskid, name: input.value };
    allsubtasks.push(arrayelement);
    allsubtasks[0].idcounter++;
    let html = `<div class="selected-subtask-container pointer" ondblclick="editSubtask(this, ${subtaskid})">`
    html += generateSubtaskHtml(input.value, subtaskid);
    html += `</div>`
    content.innerHTML += html;
    input.value = '';
}


function generateSubtaskHtml(name, id) {
    let html = '';
    html += `
            <ul>
                <li>${name}</li>
            </ul>
            <div id="edit-subtask-buttons" class="double-button-container">
                <a id="delete_subtask_button" onclick="editSubtask(this.parentElement.parentElement, ${id})">
                    <img src="./assets/img/edit.svg" alt="add">
                </a>
                <div class="separator-vertical"></div>
                <a id="change_subtask_button"
                    onclick="deleteSubtask(this.parentElement.parentElement, ${id})">
                    <img src="./assets/img/delete.svg" alt="add">
                </a>
            </div>
    `
    return html
}


function generateEditSubtaskHtml(id) {
    let html = '';
    html += `
        <input type="text" id="subtask_edition_input_${id}">
        <div id="subtask_edition_buttons" class="double-button-container">
            <a id="delete_subtask_button"
                onclick="deleteSubtask(this.parentElement.parentElement, ${id})">
                <img src="./assets/img/delete.svg" alt="edit">
            </a>
            <div class="separator-vertical"></div>
            <a id="change_subtask_button"
                onclick="confirmChangeSubtask(this.parentElement.parentElement, ${id})">
                <img src="./assets/img/check.svg" alt="delete">
            </a>
        </div>
    `
    return html
}


function editSubtask(entry, id) {
    const index = allsubtasks.findIndex(element => element.id === id);
    entry.innerHTML = generateEditSubtaskHtml(id);
    entry.classList.add('border-bottom-blue');
    let name = allsubtasks[index].name;
    let input = document.getElementById(`subtask_edition_input_${id}`);
    input.value = name;
}


function deleteSubtask(entry, id) {
    const index = allsubtasks.findIndex(element => element.id === id);
    allsubtasks.splice(index, 1);
    entry.remove();
}


function confirmChangeSubtask(entry, id) {
    const arrayelement = allsubtasks.find(element => element.id === id);
    let input = document.getElementById(`subtask_edition_input_${id}`);
    arrayelement.name = input.value;
    entry.innerHTML = generateSubtaskHtml(input.value, id);
    entry.classList.remove('border-bottom-blue');
}

function clearAddTaskForm() {
    let inputs = getAllAddTaskFormInputs();
    let containers = getAllAddTaskContainers();
    clearInputs(inputs);
    clearContainers(containers);
    handleClickPrio();
    allsubtasks = [{ idcounter: 0 }];
    selectedcontacts = [];
    renderAssignedTo();
}


function clearInputs(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        document.getElementById(`${input}`).value = '';
    }
    document.getElementById('input_with_button_assigned_to').value = '';
    document.getElementById('input_with_button_subtask').value = '';
}


function clearContainers(containers) {
    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        document.getElementById(`${container}`).innerHTML = '';
    }
}


function getAllAddTaskFormInputs(withKey) {
    let title = 'add_task_title_input';
    let description = 'add_task_description_textarea';
    let date = 'input_with_button_date';
    let category = 'input_with_button_category';
    if (withKey) {
        return { title, description, date, category };
    } else {
        return [title, description, date, category];
    };
}

function getAllAddTaskContainers() {
    let assignedtocontainer = 'selected_contacts';
    let subtaskcontainer = 'selected_subtasks';
    return [assignedtocontainer, subtaskcontainer]
}


function transferDate() {
    let calendar = document.getElementById('input_calendar');
    let dateinput = document.getElementById('input_with_button_date');
    let date = calendar.value;
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    let result = [day, month, year].join('/');
    dateinput.value = result;
}


function loadFromLocalStorage() {
    let tasksastext = localStorage.getItem('tasks');
    if (tasksastext) {
        tasks = JSON.parse(tasksastext);
    }
}


function saveToLocalStorage() {
    let tasksastext = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksastext);
}


function addToTasks() {
    let inputs = getAllAddTaskFormInputs(true);
    let prios = document.getElementsByName('prio');
    let task = {};
    Object.entries(inputs).forEach((entry) => {
        let [key, value] = entry;
        let inputvalue = document.getElementById(`${value}`).value;
        task[`${key}`] = inputvalue;
    });
    for (i = 0; i < prios.length; i++) {
        const prio = prios[i];
        prio.checked ? task['prio'] = prio.value : '';
    }
    task.subtasks = allsubtasks;
    task.contacts = selectedcontacts;
    tasks.push(task);
    saveToLocalStorage();
    clearAddTaskForm();
}