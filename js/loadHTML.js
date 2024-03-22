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
        <div class="empty-task-place">No tasks Await feedback</div>
    `;
}

function emptyTaskFieldDone() {
    return `
        <div class="empty-task-place">No tasks Done</div>
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

function todoTaskHtml(title, description, priority, i) {
    return `
        <div id="${i}" class="todo-task-container" onclick="openBordTask()" draggable="true" ondragstart="dragTodo(${i})">
            <div id="task-variant"></div>
            <h3>${title}</h3>
            <span>${description}</span>
            <div class="place-task-progress">
                <div class="progress-bar" role="progressbar" ar ia-label="Example with label" aria-valuenow="25">
                    <div class="progressbar" id="progressbar"></div>
                </div>
                <p>Subtasks</p>
            </div>
            <div class="place-user-status">
                <div class="place-user">
                </div>
                <div>
                    <img class="low-image" src="${priority}">
                </div>
            </div>
        </div>
    `;
}

function inprogressTaskHtml(title, description, priority, i) {
    return `
        <div id="${i}" class="todo-task-container" onclick="openBordTask()" draggable="true" ondragstart="dragInProgress(${i})">
            <div id="task-variant"></div>
            <h3>${title}</h3>
            <span>${description}</span>
            <div class="place-task-progress">
                <div class="progress-bar" role="progressbar" aria-label="Example with label" aria-valuenow="25">
                    <div class="progressbar" id="progressbar"></div>
                </div>
                <p>Subtasks</p>
            </div>
            <div class="place-user-status">
                <div class="place-user">
                </div>
                <div>
                    <img class="low-image" src="${priority}">
                </div>
            </div>
        </div>
    `;
}

function awaitfeedbackTaskHtml(title, description, priority, i) {
    return `
            <div id="${i}" class="todo-task-container" onclick="openBordTask()" draggable="true" ondragstart="dragAwaitFeedback(${i})">
              <div id="task-variant"></div>
              <h3>${title}</h3>
              <span>${description}</span>
              <div class="place-task-progress">
                  <div class="progress-bar" role="progressbar" aria-label="Example with label" aria-valuenow="25">
                      <div class="progressbar" id="progressbar"></div>
                  </div>
                  <p>Subtasks</p>
              </div>
              <div class="place-user-status">
                  <div class="place-user">
                  </div>
                  <div>
                      <img class="low-image" src="${priority}">
                  </div>
              </div>
          </div>
      `;
}

function doneTaskHtml(title, description, priority, i) {
    return `
            <div id="${i}" class="todo-task-container" onclick="openBordTask()" draggable="true" ondragstart="dragDone(${i})">
              <div id="task-variant"></div>
              <h3>${title}</h3>
              <span>${description}</span>
              <div class="place-task-progress">
                  <div class="progress-bar" role="progressbar" aria-label="Example with label" aria-valuenow="25">
                      <div class="progressbar" id="progressbar"></div>
                  </div>
                  <p>Subtasks</p>
              </div>
              <div class="place-user-status">
                  <div class="place-user">
                  </div>
                  <div>
                      <img class="low-image" src="${priority}">
                  </div>
              </div>
          </div>
      `;
}

function fullTaskHtml(
    title,
    description,
    date,
    priority,
    assignedto,
    subtasks
) {
    return `
              <div class="single-task-field" onclick="noCloseContent(event)">
                  <div class="place-categorie-cross">
                      <div id="task_variant_bord"></div>
                      <img onclick="closeCard()" class="single-task-close" src="./assets/img/close.png">
                  </div>
                  <div class="place-single-information">
                      <h1 class="task-head-bord">${title}</h1>
                      <span class="descript">${description}</span>
                      <div class="place-due-date-bord">
                          <span>Due date: </span>
                          <span class="due-date-bord">${date}</span>
                      </div>
                      <div class="place-priority-bord">
                          <span>Priority:</span>
                          <span class="priority-bord">${priority}</span>
                      </div>
                      <div class="assigned-to-bord">Assigned To</div>
                      <div>${assignedto}</div>
                      <span class="subtasks-bord">Subtasks</span>
                      <div class="subtasks-input-bord">
                          <div>${subtasks}</div>
                      </div>
                  </div>
                  <div class="place-delete-edit">
                      <div onclick="deleteSingleTask()" class="delete-place">
                          <img class="delete" src="./assets/img/delete.png">
                          <span>Delete</span>
                      </div>
                      <div class="one-px-line"></div>
                      <div onclick="editSingleTask()" class="edit-place">
                          <img class="edit" src="./assets/img/edit.png">
                          <span>Edit</span>
                      </div>
                  </div>
              </div>
      `;
}

function editTaskHtml() {
    return `
        <div class="single-task-field" onclick="noCloseContent(event)">
            <main class="edit-task">
                <form class="add-task-form-section" onsubmit="addToTasks();return false"  autocomplete="off">
                    <div class="input-wrapper scroll-wrapper">
                        <section class="input-box">
                            <div id="add_task_title">
                                <div class="required-header">
                                    <h3>Title</h3>
                                    <h3 style="color: #FF8190;">*</h3>
                                </div>
                                <input class="styled-input focus-blue" placeholder="Enter a title" required type="text"
                                    id="add_task_title_input">
                            </div>
                            <span class="required-field dnone">This field is required</span>
                            <div id="add_task_description">
                                <h3>Description</h3>
                                <div class="textarea-wrapper">
                                    <textarea class="focus-blue" placeholder="Enter a Description" name="add_task_description"
                                        id="add_task_description_textarea"></textarea>
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
                        </section>
                        <section class="input-box">
                            <div id="add_task_due_date">
                                <div class="required-header">
                                    <h3>Due date</h3>
                                    <h3 style="color: #FF8190;">*</h3>
                                </div>
                                <div class="input-with-button-wrapper">
                                    <input id="input_with_button_date" class="styled-input focus-blue" placeholder="dd/mm/yyyy"
                                        type="text" required pattern="([0-9]{2}\/[0-9]{2}\/[0-9]{4})">
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
                                        onfocusout="openDropDownMenu('drop_down_category', 'out')"  oninput="setFilter(this)">
                                    <a onclick="setFocusOnElement('input_with_button_category', event)">
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
                                        onfocusout="changeSubtaskIcons('out')">
                                    <a id="add_subtask_button" onclick="setFocusOnElement('input_with_button_subtask')">
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

function fillAddTaskSection() {
    let page = document.getElementById("add_task_page");
    html = "";
    html += `
        <main class="add-task">
            <h1>Add Task</h1>
            <form class="add-task-form-section" onsubmit="addToTasks();return false" autocomplete="off">
                <div class="input-wrapper">
                    <section class="input-box">
                        <div id="add_task_title">
                            <div class="required-header">
                                <h3>Title</h3>
                                <h3 style="color: #FF8190;">*</h3>
                            </div>
                            <input class="styled-input focus-blue" placeholder="Enter a title" required type="text"
                                id="add_task_title_input">
                        </div>
                        <span class="required-field dnone">This field is required</span>
                        <div id="add_task_description">
                            <h3>Description</h3>
                            <div class="textarea-wrapper">
                                <textarea class="focus-blue" placeholder="Enter a Description"
                                    name="add_task_description" id="add_task_description_textarea"></textarea>
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
                    <section class="input-box">
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
                                    onfocusout="changeSubtaskIcons('out')">
                                <a id="add_subtask_button" onclick="setFocusOnElement('input_with_button_subtask')">
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
                    <div class="bottom-text">
                        <span style="color: #FF8190;">*</span>
                        <span>This field is required</span>
                    </div>
                    <div class="bottom-buttons">
                        <button class="clear-button" onclick="clearAddTaskForm()" type="button">
                            <span>Clear</span>
                            <img src="./assets/img/cross.svg" alt="clear Form">
                        </button>
                        <button class="create-task-button">
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
