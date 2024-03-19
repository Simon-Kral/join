let todoforce = [];

let currenttask = 0;

async function loadboardstorage() {
    if (sessionStorage.getItem("Guest") === null) {
        if (localStorage.getItem("userI") === null) { }
        else {
            if (localStorage.getItem('userI').length > 0) {
                loadBoardStorage()
            }
        }
        if (sessionStorage.getItem("userI") === null) { }
        else {
            if (sessionStorage.getItem('userI').length > 0) {
                loadBoardSessionStorage()
            }
        }
    }
    else {
        guestLoginBoard()
        console.log(users[loaduser])
        createTaskBoard()
    }
}

function guestLoginBoard() {
    loaduser = sessionStorage.getItem('userI')
    users = JSON.parse(sessionStorage.getItem('Guest'))
}

async function loadBoardStorage() {
    if (localStorage.getItem('userI').length > 0) {
        users = await getItem('users')
        loaduser = localStorage.getItem('userI')
    }
}

async function loadBoardSessionStorage() {
    if (sessionStorage.getItem('userI').length > 0) {
        users = await getItem('users')
        loaduser = sessionStorage.getItem('userI')
    }
}

async function createTaskBoard() {
    showTodoHtml();
}

function boardinit() {
    showEmptyHtmlTodo();
    showEmptyHtmlInprogress();
    showEmptyHtmlAwaitfeedback();
    showEmptyHtmlDone();
}

function showEmptyHtmlTodo() {
    if (todoforce == 0) {
        const empty = emptyTaskFieldTodo();
        let getplacetodo = document.getElementById('to_do_place');
        getplacetodo.innerHTML = empty;
    }
}

function showEmptyHtmlInprogress() {
    if (todoforce == 0) {
        const empty = emptyTaskFieldInprogress();
        let getplacetodo = document.getElementById('in_progress_place');
        getplacetodo.innerHTML = empty;
    }
}

function showEmptyHtmlAwaitfeedback() {
    if (todoforce == 0) {
        const empty = emptyTaskFieldAwaitfeedback();
        let getplacetodo = document.getElementById('await_feedback_place');
        getplacetodo.innerHTML = empty;
    }
}

function showEmptyHtmlDone() {
    if (todoforce == 0) {
        const empty = emptyTaskFieldDone();
        let getemptyplacedone = document.getElementById('done_place');
        getemptyplacedone.innerHTML = empty;
    }
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

function todoNewTask() {
    const todocard = bordAddTaskFieldHtml();
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    getplacecard.innerHTML = todocard;
    initAddTask();
}

function inprogressNewTask() {
    const inprogresscard = bordAddTaskFieldHtml();
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    getplacecard.innerHTML = inprogresscard;
    initAddTask();
}

function awaitfeedbackNewTask() {
    const awaitfeedbackcard = bordAddTaskFieldHtml();
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    getplacecard.innerHTML = awaitfeedbackcard;
    initAddTask();
}

function openBordTask() {
    const showfulltask = fullTaskHtml();
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    getplacecard.innerHTML = showfulltask;
    showTaskCategoryBig();
}

//* Start

function renderTodo() {
    let todo = users[loaduser]['todo'];
    for (let i = 0; i < todo.length; i++) {
        todocollect = todo[i];
        console.log(todocollect);
        showTodoHtml(todocollect);
    }
}

function showTodoHtml(getinformationtodo) {
    let getplacetodo = document.getElementById('to_do_place');
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo } = informationTodo(getinformationtodo);
    getplacetodo.innerHTML += todoTaskHtml(categorytodo, titletodo, descriptiontodo, subtaskstodo);
    showTaskCategorySmall();
    updateProgressBar();
}

function informationTodo(getinformationtodo) {
    let categorytodo = getinformationtodo['category'];
    let titletodo = getinformationtodo['title'];
    let descriptiontodo = getinformationtodo['description'];
    return { categorytodo, titletodo, descriptiontodo };
}

function showInProgressHtml() {
    const todotask = inprogressTaskHtml();
    let getplaceinprogress = document.getElementById('in_progress_place');
    getplaceinprogress.innerHTML = ``;
    getplaceinprogress.innerHTML += todotask;
}

function informationInProgress(getinformationtodo) {
    let categoryinprogress = getinformationtodo['category'];
    let titletodoinprogress = getinformationtodo['title'];
    let descriptiontodoinprogress = getinformationtodo['description'];
    return { categoryinprogress, titletodoinprogress, descriptiontodoinprogress };
}

function showAwaitFeedbackHtml() {
    const todotask = awaitfeedbackTaskHtml();
    let getplaceawaitfeedback = document.getElementById('await_feedback_place');
    getplaceawaitfeedback.innerHTML += todotask;
}

function informationAwaitProgress(getinformationtodo) {
    let categoryawaitprogress = getinformationtodo['category'];
    let titletodoawaitprogress = getinformationtodo['title'];
    let descriptiontodoawaitprogress = getinformationtodo['description'];
    return { categoryawaitprogress, titletodoawaitprogress, descriptiontodoawaitprogress };
}

function showDoneHtml() {
    const todotask = doneTaskHtml();
    let getplacedone = document.getElementById('done_place');
    getplacedone.innerHTML += todotask;
}

function showTaskCategorySmall(category) {
    const technicalTask = technicalTaskHtml();
    const userTask = userTaskHtml();
    let getplacetaskcategory = document.getElementById('task-variant');
    if (category == "Technical Task") {
        getplacetaskcategory.innerHTML = technicalTask;
    } else {
        getplacetaskcategory.innerHTML = userTask;
    }
}

function showTaskCategoryBig(category) {
    const technicalTask = technicalTaskHtml();
    const userTask = userTaskHtml();
    let getplacebordcategory = document.getElementById('task_variant_bord');
    if (category == "Technical Task") {
        getplacebordcategory.innerHTML = technicalTask;
    } else {
        getplacebordcategory.innerHTML = userTask;
    }
}

function editSingleTask() {
    const edithtml = editTaskHtml();
    let getplacetaskvariantbord = document.getElementById('add_bordtask_data');
    getplacetaskvariantbord.innerHTML = ``;
    getplacetaskvariantbord.innerHTML = edithtml;
    initAddTask();
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

function noCloseContent(event) {
    event.stopPropagation();
}
