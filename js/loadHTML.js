async function init() {
    await includeHTML();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function bordAddTaskFieldHtml() {
    return `
    <div class="bord-add-tasks-field">
        <div id="add_task_prio">
            <div class="prio-buttons">
                    <input id="prio_urgent" name="prio" type="radio" value="urgent">
                    <label for="prio_urgent">
                        <span>Urgent</span>
                        <img src="./assets/img/urgent.svg" alt="urgent">
                    </label>
                    <input id="prio_medium" name="prio" type="radio" value="medium">
                    <label class="highlighted-button" for="prio_medium">
                        <span>Medium</span>
                        <img src="./assets/img/medium.svg" alt="medium">
                    </label>
                    <input id="prio_low" name="prio" type="radio" value="low">
                    <label for="prio_low">
                        <span>low</span>
                        <img src="./assets/img/low.svg" alt="low">
                    </label>
            </div>
        </div>
    </div>
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

function todoTaskHtml() {
    return `
        <div class="todo-task-container">
            <div id="task-variant"></div>
            <h3>Test Join Project</h3>
            <span>.. hier steht was zu tun ist ...</span>
            <div class="place-task-progress">
                <div class="progress-bar" role="progressbar" aria-label="Example with label" aria-valuenow="25">
                    <div class="progressbar" id="progressbar"></div>
                </div>
                <div>${currenttask}/${taskforce.length}</div>
                <p>Subtasks</p>
            </div>
            <div class="place-user-status">
                <div class="place-user">
                </div>
                <div>
                    <img class="low-image" src="./assets/img/low.png">
                    <img class="urgent-image" src="./assets/img/urgent.png">
                    <img class="medium-image" src="./assets/img/medium_two.png">
                </div>
            </div>
        </div>
    `;
}

function inprogressTaskHtml() {
    return `
        <h1>TestTesTodo</h1>
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
