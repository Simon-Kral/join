async function init() {
    await includeHTML();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
}

function bordAddTaskFieldHtml() {
    return `
        <div class="bord-add-tasks-field" onclick="noCloseContent(event)" id="add_task_page"></div>
    `;
}

function emptyTaskFieldTodo() {
    return `
        <div class="empty-task-place">No tasks To Do</div>
    `;
}

function emptyTaskFieldInprogress() {
    return `
        <div class="empty-task-place">No tasks In progress</div>
    `;
}

function emptyTaskFieldAwaitfeedback() {
    return `
        <div class="empty-task-place">no tasks await feedback</div>
    `;
}

function emptyTaskFieldDone() {
    return `
        <div class="empty-task-place">no tasks done</div>
    `;
}

function userTaskHtml() {
    return `
          <p class="user-story">user story</p>
      `;
}

function technicalTaskHtml() {
    return `
          <p class="technical-task">technical task</p>
      `;
}

function nothingFound() {
    return `
        <p class="empty-task-place">nothing found</p>
    `;
}

function todoTaskHtml() {
    return `
        <p class="user-story">User Story</p>
    `;
}

function technicalTaskHtml() {
    return `
        <p class="technical-task">Technical Task</p>
    `;
}

function urugentPrioHtml() {
    return `
        <img class="low-image" src="./assets/img/urgent.png"></img>
    `;
}

function lowPrioHtml() {
    return `
        <img class="low-image" src="./assets/img/low.png"></img>
    `;
}

function mediumPrioHtml() {
    return `
        <img class="low-image" src="./assets/img/medium_two.png"></img>
    `;
}

function urugentPrioHtmlOpenTask() {
    return `
        <span>Urgent</span>
        <img class="low-image" src="./assets/img/urgent.png"></img>
    `;
}

function lowPrioHtmlOpenTask() {
    return `
        <span>Low</span>
        <img class="low-image" src="./assets/img/low.png"></img>
    `;
}

function mediumPrioHtmlOpenTask() {
    return `
        <span>Medium</span>
        <img class="low-image" src="./assets/img/medium_two.png"></img>
    `;
}

function createProgressBar(percent) {
    return `
        <div class="progress-bar" role="progressbar" aria-label="Example with label" aria-valuenow="25">
            <div class="progressbar" id="progressbar" style ="width: ${percent}%"</div>
        </div>
    `;
}

function hoverHtml() {
    return `
        <div ondragover="this.style.background = '#F4F4F4'; this.style.borderStyle = 'dashed';" 
            ondragleave="this.style.background = '#f6f7f8'; this.style.borderStyle = 'none';" 
            class="box-hover">
        </div>
    `;
}

function subtaskProgressbarHtml(subtasklenght, selectedCheckboxCount) {
    return `
        <p class="subtasktxt">${selectedCheckboxCount - 1}/${subtasklenght}Subtasks</p>
    `;
}

function empty() {
    return ``;
}

function todoTaskHtml(choosencategory, title, description, i, subtaskstodo, contactstodo, priority, choosensubs) {
    return `
        <div id="${i}" class="todo-task-container" onclick="openBordTask(${i}, this)" draggable="true" ontouchstart="openMoveMenue(${i}, this)" ondragstart="drag(${i}, this)">
            <div class="mobile-move-place">
                <div class="collect-category">${choosencategory}</div>
                <button class="move-mobile" onclick="noCloseContent(event)" ontouchstart="openMoveMenue(${i}, this)">move</button>
            </div>
            <h3 class="bord-title">${title}</h3>
            <div class="bord-descript-max-height">
                <span class="bord-descript">${description}</span>
            </div>
            <div class="place-task-progress">
                <div class="collect-subtask">${subtaskstodo}</div>
                <p class="subtasktxt">${choosensubs}</p>
            </div>
            <div class="place-user-status">
                <div class="place-user">
                    ${contactstodo}
                </div>
                <div class="low-image">
                    ${priority}
                </div>
            </div>
        </div>
    `;
}

function fullTaskHtml(choosencategory, title, description, i, priotodo, date, subtaskstodo, contacts, key) {
    return `
        <div class="single-task-field" onclick="noCloseContent(event)">
            <div class="place-categorie-cross">
                <div class="collect-category">${choosencategory}</div>
                <img onclick="closeCard()" class="single-task-close" src="./assets/img/close.png">
            </div>
            <div class="place-single-information">
                <h1 class="task-head-bord">${title}</h1>
                <div class="descript">${description}</div>
                <div class="place-due-date-bord">
                    <span class="single-task-design">Due date:&nbsp;</span>
                    <span class="due-date-bord">${date}</span>
                </div>
                <div class="place-priority-bord single-task-design">
                    <span>Priority:&nbsp;</span>
                    <span class="priority-bord">${priotodo}</span>
                </div>
                <div class="assigned-to-bord single-task-design">Assigned To:</div>
                    <div class="place-user-single-card">
                        ${contacts}
                    </div>
                    <span class="subtasks-bord single-task-design">Subtasks:</span>
                    <div class="subtasks-input-bord">
                        <ul>
                            ${subtaskstodo}
                        </ul>
                    </div>
                </div>
                <div class="place-delete-edit">
                    <div onclick="deleteSingleTask(${i})" class="delete-place">
                        <img class="delete" src="./assets/img/delete.png">
                        <span>Delete</span>
                    </div>
                    <div class="one-px-line"></div>
                <div onclick="editSingleTask(${i}, '${key}')" class="edit-place">
                    <img class="edit" src="./assets/img/edit.png">
                    <span>Edit</span>
                </div>
            </div>
        </div>
      `;
}

function editTaskHtml(titletodo, descriptiontodo, i, choosenpriority, datetodo, key) {
    return `
        <div class="single-task-field" onclick="noCloseContent(event)">
            <main class="edit-task">
                <form class="add-task-form-section" onsubmit="applyChangesToTask(${i}, '${key}');return false"  autocomplete="off">
                    <div class="input-wrapper scroll-wrapper">
                        <section class="input-box">
                            <div id="add_task_title">
                                <div class="required-header">
                                    <h3>Title</h3>
                                    <h3 style="color: #FF8190;">*</h3>
                                </div>
                                <input class="styled-input focus-blue" placeholder="Enter a title" required type="text"
                                    id="add_task_title_input" maxlength="35" value="${titletodo}">
                            </div>
                            <span class="required-field dnone">This field is required</span>
                            <div id="add_task_description">
                                <h3>Description</h3>
                                <div class="textarea-wrapper">
                                    <textarea class="focus-blue" placeholder="Enter a Description" name="add_task_description"
                                        id="add_task_description_textarea" spellcheck="false">${descriptiontodo}</textarea>
                                </div>
                            </div>
                        </section>
                        <section class="input-box">
                            <div id="add_task_due_date">
                                <div class="required-header">
                                    <h3>Due date</h3>
                                    <h3 style="color: #FF8190;">*</h3>
                                </div>
                                <div class="input-with-button-wrapper">
                                    <input id="input_with_button_date" class="styled-input focus-blue" placeholder="dd/mm/yyyy"
                                        type="text" required pattern="([0-9]{2}\/[0-9]{2}\/[0-9]{4})" value="${datetodo}">
                                    <input id="input_calendar" class="calendar-input" type="date" value=""
                                        onchange="transferDate()" min='1899-01-01'>
                                </div>
                                <span class="required-field dnone">This field is required</span>
                            </div>
                            <div class="add_task_prio">
                                <h3>Prio</h3>
                                <div id="prio-buttons">
                                    <input id="prio_urgent" name="prio" type="radio" value="urgent">
                                    <label id="prio_urgent_label" for="prio_urgent" onclick="handleClickPrio('urgent')">
                                        <span>Urgent</span>
                                        <img src="./assets/img/urgent.svg" alt="urgent">
                                    </label>
                                    <input id="prio_medium" name="prio" type="radio" value="medium">
                                    <label id="prio_medium_label" for="prio_medium" onclick="handleClickPrio('medium')">
                                        <span>Medium</span>
                                        <img src="./assets/img/medium.svg" alt="medium">
                                    </label>
                                    <input id="prio_low" name="prio" type="radio" value="low">
                                    <label id="prio_low_label" for="prio_low" onclick="handleClickPrio('low')">
                                        <span>Low</span>
                                        <img src="./assets/img/low.svg" alt="low">
                                    </label>
                                </div>
                            </div>
                            <div id="add_task_assigned_to">
                                <h3>Assigned to</h3>
                                <div class="input-with-button-wrapper">
                                    <input class="styled-input focus-blue" placeholder="Select contacts to assign" type="text"
                                        id="input_with_button_assigned_to"
                                        onfocusin="openDropDownMenu('drop_down_assigned_to', 'in')"
                                        onfocusout="openDropDownMenu('drop_down_assigned_to', 'out')" oninput="setFilter(this)">
                                    <a onclick="setFocusOnElement('input_with_button_assigned_to', event)">
                                        <img id="drop_down_assigned_to_arrow" src="./assets/img/arrow_drop_down.png" alt="add">
                                    </a>
                                    </div>
                                    <div class="drop-down dnone custom-scrollbar" id="drop_down_assigned_to"></div>
                                <div id="selected_contacts"></div>
                            </div>
                            <div class="edit-place-user-single-card">
                            </div>
                            <div id="add_task_subtask">
                                <h3>Subtask</h3>
                                <div class="input-with-button-wrapper">
                                    <input class="styled-input focus-blue" placeholder="Add new subtask" type="text"
                                        id="input_with_button_subtask" onfocusin="changeSubtaskIcons('in')"
                                        onfocusout="changeSubtaskIcons('out')" maxlength="35">
                                    <a id="add_subtask_button" onclick="setFocusOnElement('subtask')">
                                        <img src="./assets/img/add.png" alt="add">
                                    </a>
                                    <div id="confirm_subtask_container" class="input-with-double-button dnone">
                                        <a id="clear_subtask_button"
                                            onmousedown="fpreventDefault(event); clearInput('input_with_button_subtask')">
                                            <img src="./assets/img/cross.svg" alt="cross">
                                        </a>
                                        <div class="separator-vertical"></div>
                                        <a id="confirm_subtask_button"
                                            onmousedown="fpreventDefault(event); addSubtask('input_with_button_subtask')">
                                            <img src="./assets/img/check.svg" alt="check">
                                        </a>
                                    </div>
                                </div>
                                <div id="selected_subtasks"></div>
                            </div>
                        </section>
                    </div>
                    <section class="bottom-section">
                        <div class="bottom-buttons">
                            <button class="create-task-button">
                                <span>Ok</span>
                                <img src="./assets/img/check.png" alt="create task">
                            </button>
                        </div>
                    </section>
                </form>
            </main>
        </div>    
    `;
}

function awaitfeedbackTaskHtml() {
    return `
        <h1>TestTesTodo</h1>
    `;
}

function doneTaskHtml() {
    return `
        <h1>TestTesTodo</h1>
    `;
}

function userTaskHtml() {
    return `
        <p class="user-story">User Story</p>
    `;
}

function technicalTaskHtml() {
    return `
        <p class="technical-task">Technical Task</p>
    `;
}

function fillAddTaskSection(array) {
    let page = document.getElementById("add_task_page");
    html = "";
    html += /*html*/ `
        <main class="add-task">
            <h1>Add Task</h1>
            <form class="add-task-form-section" onsubmit="addToTasks(${array});return false" autocomplete="off">
                <div class="input-wrapper">
                    <section class="input-box box-left">
                        <div id="add_task_title">
                            <div class="required-header">
                                <h3>Title</h3>
                                <h3 style="color: #FF8190;">*</h3>
                            </div>
                            <input class="styled-input focus-blue" placeholder="Enter a title" required type="text"
                                id="add_task_title_input" maxlength="35">
                        </div>
                        <span class="required-field dnone">This field is required</span>
                        <div id="add_task_description">
                            <h3>Description</h3>
                            <div class="textarea-wrapper">
                                <textarea class="focus-blue" placeholder="Enter a Description"
                                    name="add_task_description" id="add_task_description_textarea" spellcheck="false"></textarea>
                            </div>
                        </div>
                        <div id="add_task_assigned_to">
                            <h3>Assigned to</h3>
                            <div class="input-with-button-wrapper">
                                <input class="styled-input focus-blue" placeholder="Select contacts to assign"
                                    type="text" id="input_with_button_assigned_to"
                                    onfocusin="openDropDownMenu('drop_down_assigned_to', 'in')"
                                    onfocusout="openDropDownMenu('drop_down_assigned_to', 'out')"
                                    oninput="setFilter(this)">
                                <a onmousedown="fpreventDefault(event); setFocusOnElement('assigned_to')">
                                    <img id="drop_down_assigned_to_arrow" src="./assets/img/arrow_drop_down.png"
                                        alt="add">
                                </a>
                            </div>
                            <div class="drop-down dnone custom-scrollbar" id="drop_down_assigned_to"></div>
                            <div id="selected_contacts"></div>
                        </div>
                    </section>
                    <section class="separator-vertical"></section>
                    <section class="input-box box-right">
                        <div id="add_task_due_date">
                            <div class="required-header">
                                <h3>Due date</h3>
                                <h3 style="color: #FF8190;">*</h3>
                            </div>
                            <div class="input-with-button-wrapper">
                                <input id="input_with_button_date" class="styled-input focus-blue"
                                    placeholder="dd/mm/yyyy" type="text" required
                                    pattern="([0-9]{2}\/[0-9]{2}\/[0-9]{4})">
                                <input id="input_calendar" class="calendar-input" type="date" value=""
                                    onchange="transferDate()">
                            </div>
                            <span class="required-field dnone">This field is required</span>

                        </div>
                        <div class="add_task_prio">
                            <h3>Prio</h3>
                            <div id="prio-buttons">
                                <input id="prio_urgent" name="prio" type="radio" value="urgent">
                                <label id="prio_urgent_label" for="prio_urgent" onclick="handleClickPrio('urgent')">
                                    <span>Urgent</span>
                                    <img src="./assets/img/urgent.svg" alt="urgent">
                                </label>
                                <input id="prio_medium" name="prio" type="radio" value="medium">
                                <label id="prio_medium_label" for="prio_medium" onclick="handleClickPrio('medium')">
                                    <span>Medium</span>
                                    <img src="./assets/img/medium.svg" alt="medium">
                                </label>
                                <input id="prio_low" name="prio" type="radio" value="low">
                                <label id="prio_low_label" for="prio_low" onclick="handleClickPrio('low')">
                                    <span>Low</span>
                                    <img src="./assets/img/low.svg" alt="low">
                                </label>
                            </div>
                        </div>
                        <div id="add_task_category">
                            <div class="required-header">
                                <h3>Category</h3>
                                <h3 style="color: #FF8190;">*</h3>
                            </div>
                            <div class="input-with-button-wrapper">
                                <input class="styled-input focus-blue" placeholder="Select task category" required
                                    type="text" id="input_with_button_category"
                                    onfocusin="openDropDownMenu('drop_down_category', 'in')"
                                    onfocusout="openDropDownMenu('drop_down_category', 'out')"
                                    oninput="setFilter(this)">
                                <a onmousedown="fpreventDefault(event); setFocusOnElement('category')">
                                    <img id="drop_down_category_arrow" src="./assets/img/arrow_drop_down.png" alt="add">
                                </a>
                            </div>
                            <span class="required-field dnone">This field is required</span>
                            <div class="drop-down dnone" id="drop_down_category"></div>
                        </div>
                        <div id="add_task_subtask">
                            <h3>Subtask</h3>
                            <div class="input-with-button-wrapper">
                                <input class="styled-input focus-blue" placeholder="Add new subtask" type="text"
                                    id="input_with_button_subtask" onfocusin="changeSubtaskIcons('in')"
                                    onfocusout="changeSubtaskIcons('out')" maxlength="35">
                                <a id="add_subtask_button" onclick="setFocusOnElement('subtask')">
                                    <img src="./assets/img/add.png" alt="add">
                                </a>
                                <div id="confirm_subtask_container" class="input-with-double-button dnone">
                                    <a id="clear_subtask_button"
                                        onmousedown="fpreventDefault(event); clearInput('input_with_button_subtask')">
                                        <img src="./assets/img/cross.svg" alt="cross">
                                    </a>
                                    <div class="separator-vertical"></div>
                                    <a id="confirm_subtask_button"
                                        onmousedown="fpreventDefault(event); addSubtask('input_with_button_subtask')">
                                        <img src="./assets/img/check.svg" alt="check">
                                    </a>
                                </div>
                            </div>
                            <div id="selected_subtasks"></div>
                        </div>
                    </section>
                </div>
                <section class="bottom-section">
                    <div class="bottom-text" id="required-info">
                        <span style="color: #FF8190;">*</span>
                        <span>This field is required</span>
                    </div>
                    <div class="bottom-buttons">
                        <button class="white-button" onclick="clearAddTaskForm()" type="button">
                            <span>Clear</span>
                            <img src="./assets/img/cross.svg" alt="clear Form">
                        </button>
                        <button class="blue-button create-task-button">
                            <span>Create Task</span>
                            <img src="./assets/img/check.png" alt="create task">
                        </button>
                    </div>
                </section>
            </form>
            <div id="task-added-notification">
                <span>Task added to board</span>
                <img src="./assets/img/task_added.svg" alt="task added">
            </div>
        </main>
    `;
    page.innerHTML = html;
    initAddTask();
}

function generateCategoryHtml(category) {
    html = "";
    html += /*html*/ `
        <div class="drop-down-category-entry pointer" onmousedown="dontChangeFocus(event); selectTaskCategory(${category.id})">
            <span class="category-name">${category.name}</span>
        </div>
    `;
    return html;
}

function generateContactDropdownHtml(contact, contactdata) {
    html = "";
    html += /*html*/ `
        <div class="contact-list-entry pointer" onmousedown="dontChangeFocus(event); selectTaskContacts(this, ${contact.id})">
            <div class="profile-info-box">
                <span class="profile-badge" style="background-color: ${contact.color};">${contactdata.abbreviation}</span>
                <span class="profile-fullname">${contactdata.fullname}</span>
            </div>
            <img src="./assets/img/check_button_unchecked.svg" alt="">
        </div>
    `;
    return html;
}

function generateSubtaskHtml(name, id) {
    let html = "";
    html += /*html*/ `
    <ul>
        <li>${name}</li>
    </ul>
    <div id="edit-subtask-buttons" class="double-button-container" ondblclick="fstopPropagation(event)">
        <a id="delete_subtask_button" onclick="editSubtask(this.parentElement.parentElement, ${id})">
            <img src="./assets/img/edit.svg" alt="add">
        </a>
        <div class="separator-vertical"></div>
        <a id="change_subtask_button"
            onclick="deleteSubtask(this.parentElement.parentElement, ${id})">
            <img src="./assets/img/delete.svg" alt="add">
        </a>
    </div>
  `;
    return html;
}

function generateEditSubtaskHtml(id) {
    let html = "";
    html += /*html*/ `
        <input type="text" id="subtask_edition_input_${id}">
        <div id="subtask_edition_buttons" class="double-button-container">
            <a id="delete_subtask_button"
                onclick="deleteSubtask(this.parentElement.parentElement, ${id})">
                <img src="./assets/img/delete.svg" alt="delete">
            </a>
            <div class="separator-vertical"></div>
            <a id="change_subtask_button"
                onclick="confirmChangeSubtask(this.parentElement.parentElement, ${id})">
                <img src="./assets/img/check.svg" alt="check">
            </a>
        </div>
    `;
    return html;
}

function generateSeparatorHtml(letter) {
    return /*html*/ `
        <div class="contact-list-separator-box">
            <span id="separator-letter-span">${letter}</span>
            <div class="separator-horizontal"></div>
        </div>
    `;
}

function generateContactHtml(contact, contactdata) {
    let html = "";
    html += /*html*/ `
        <div class="contact contact-list-entry pointer" onclick="openContact(${contact.id}, this)">
            <div class="contact-info-box">
                <div>
                    <span class="profile-badge" style="background-color: ${contact.color};">${contactdata.abbreviation}</span>
                </div>
                <div class="profile-info">
                    <span class="profile-fullname">${contactdata.fullname}</span>
                    <a class="profile-email disabled" href="mailto:${contact.email}">${contact.email}</a>
                </div>
            </div>
        </div>
    `;
    return html;
}

function generateContactDetailBoxHtml(contact, contactdata) {
    let html = "";
    html += /*html*/ `
        <div class="contact-detail-box-head">
            <div class="profile-badge-big-box">
                <span class="profile-badge-big" style="background-color: ${contact.color};">${contactdata.abbreviation}</span>
            </div>
            <div class="profile-name-with-buttons-box">
                <div class="profile-name">${contactdata.fullname}</div>
                <div class="profile-buttons">
                    <a onclick="openContactEdition(${contact.id}, '${contactdata.abbreviation}', '${contactdata.fullname}')">
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
            <a class="profile-phone" href="tel:${contact.phone}">${contact.phone}</a>
        </div>
    `;
    return html;
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
          <div class="overlay-body-content">
              <div class="profile-badge-big-box">
                  <span class="profile-badge-big" style="background-color: ${contact.color}">${abbreviation}</span>
              </div>
              <form class="edit-contact-form-box" onsubmit="saveEditedContact(${contact.id});return false" autocomplete="off">
                  <div class="input-with-img-wrapper">
                      <input type="text" value="${fullname}" pattern="[A-Za-zäöüÄÖÜ]+([ ][A-Za-zäöüÄÖÜ]+)+" class="styled-input focus-blue edit-contact-input" id="edit_contact_name" oninvalid="this.setCustomValidity('Enter your full name here: Firstname (Secondname) Lastname')" oninput="this.setCustomValidity('')" maxlength="35">
                      <img src="./assets/img/person.svg" alt="person" />
                  </div>
                  <div class="input-with-img-wrapper">
                      <input type="email" value="${contact.email}" class="styled-input focus-blue edit-contact-input" id="edit_contact_email" maxlength="35">
                      <img src="./assets/img/mail.svg" alt="mail" />
                  </div>
                  <div class="input-with-img-wrapper">
                      <input type="tel" value="${contact.phone}" class="styled-input focus-blue edit-contact-input" id="edit_contact_phone" maxlength="35">
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
      <a class="close-overlay-box" onclick="closeOverlay()">
      <img src="./assets/img/cross.svg" alt="close" />
  </a>
    </div>
  `;
    return html;
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
                    <input required placeholder="Name" type="text" pattern="[A-Za-zäöüÄÖÜ]+([ ][A-Za-zäöüÄÖÜ]+)+" class="styled-input focus-blue edit-contact-input" id="add_contact_name" oninvalid="this.setCustomValidity('Enter your full name here: Firstname (Secondname) Lastname')" oninput="this.setCustomValidity('')" maxlength="35">
                    <img src="./assets/img/person.svg" alt="person" />
                </div>
                <div class="input-with-img-wrapper">
                    <input required placeholder="Email" type="email" class="styled-input focus-blue edit-contact-input" id="add_contact_email" maxlength="35">
                    <img src="./assets/img/mail.svg" alt="mail" />
                </div>
                <div class="input-with-img-wrapper">
                    <input required placeholder="Phone" type="tel" class="styled-input focus-blue edit-contact-input" id="add_contact_phone" maxlength="35">
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
