let subtasksforce = ['teste', 'test', 'tes', 'tasum'];
let todoforce = [];
let inprogressforce = [];
let awaitfeedbackforce = [];
let doneforce = [];

let currenttask = 0;


function boardinit() {
    showEmptyHtmlTodo();
    showEmptyHtmlInprogress();
    showEmptyHtmlAwaitfeedback();
    showEmptyHtmlDone();
}

function noCloseContent(event) {
    event.stopPropagation();
}

function closeCard() {
    document.getElementById('fullscreen_information').classList.add('d-none');
}

function bordAddNewTask() {
    const card = bordAddTaskFieldHtml();
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    getplacecard.innerHTML = card;
    initAddTask();
}

function openBordTask() {
    const showfulltask = fullTaskHtml();
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    getplacecard.innerHTML = showfulltask;
    showTaskVariantBig();
}

function showEmptyHtmlTodo() {
    const empty = emptyTaskFieldTodo();
    let getplacetodo = document.getElementById('to_do_place');
    getplacetodo.innerHTML = empty;
}

function showTodoHtml() {
    const todotask = todoTaskHtml();
    let getplacetodo = document.getElementById('to_do_place');
    getplacetodo.innerHTML += todotask;
    showTaskVariantSmall();
    updateProgressBar();
}

function showInProgressHtml() {
    const todotask = inprogressTaskHtml();
    let getplaceinprogress = document.getElementById('in_progress_place');
    getplaceinprogress.innerHTML = ``;
    getplaceinprogress.innerHTML += todotask;
    // showTaskVariant();
    // updateProgressBar();
}

function showEmptyHtmlInprogress() {
    const empty = emptyTaskFieldInprogress();
    let getplacetodo = document.getElementById('in_progress_place');
    getplacetodo.innerHTML = empty;
}

function showAwaitFeedbackHtml() {
    const todotask = awaitfeedbackTaskHtml();
    let getplaceawaitfeedback = document.getElementById('await_feedback_place');
    getplaceawaitfeedback.innerHTML += todotask;
    // showTaskVariant();
    // updateProgressBar();
}

function showEmptyHtmlAwaitfeedback() {
    const empty = emptyTaskFieldAwaitfeedback();
    let getplacetodo = document.getElementById('await_feedback_place');
    getplacetodo.innerHTML = empty;
}

function showDoneHtml() {
    const todotask = doneTaskHtml();
    let getplacedone = document.getElementById('done_place');
    getplacedone.innerHTML += todotask;
    // showTaskVariant();
    // updateProgressBar();
}

function showEmptyHtmlDone() {
    const empty = emptyTaskFieldDone();
    let getemptyplacedone = document.getElementById('done_place');
    getemptyplacedone.innerHTML = empty;
}

function showTaskVariantSmall() {
    const taskvariant = technicalTaskHtml();
    const taskvarianttwo = userTaskHtml();
    let getplacetaskvariant = document.getElementById('task-variant');
    getplacetaskvariant.innerHTML = taskvariant + taskvarianttwo;
}

function showTaskVariantBig() {
    const taskvariant = technicalTaskHtml();
    const taskvarianttwo = userTaskHtml();
    let getplacetaskvariantbord = document.getElementById('task_variant_bord');
    getplacetaskvariantbord.innerHTML = taskvariant + taskvarianttwo;
}

function updateProgressBar() {
    let percent = (currenttask) / todoforce.length;
    percent = Math.round(percent * 100);

    document.getElementById('progressbar').style = `width: ${percent}%`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}