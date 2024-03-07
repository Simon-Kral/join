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

function todoTaskHtml() {
    return `
        <div class="todo-task-container">
            <div id="task-variant"></div>
            <h3>Test Join Project</h3>
            <span>.. hier steht was zu tun ist ...</span>
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
