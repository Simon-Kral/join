let todoforce = [];

let currenttask = 0;


async function createTaskBoard() {
    showTodoHtml();
}

function boardinit() {
    showEmptyHtmlTodo();
    showEmptyHtmlInprogress();
    showEmptyHtmlAwaitfeedback();
    showEmptyHtmlDone();
}
//load stoarge--
function guestLogin() {
    loaduser = sessionStorage.getItem('userI')
    users = JSON.parse(sessionStorage.getItem('Guest'))
}

async function loadLocalStorage() {
        users = await getItem('users')
        loaduser = localStorage.getItem('userI')
        console.log(users[loaduser].todo)
}

async function loadSessionStorage() {
        users = await getItem('users')
        loaduser = sessionStorage.getItem('userI')
}
//--

async function pushboard() {

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

function renderTasks() {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
    }
}

function showTodoHtml() {
    let getplacetodo = document.getElementById('to_do_place');
    let getinformationtodo = users[loaduser]['todo'][0];
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo } = informationTodo(getinformationtodo);
    getplacetodo.innerHTML += todoTaskHtml(categorytodo, titletodo, descriptiontodo, subtaskstodo);
    showTaskCategorySmall();
    updateProgressBar();
}

function informationTodo(getinformationtodo) {
    let categorytodo = getinformationtodo['category'];
    let titletodo = getinformationtodo['title'];
    let descriptiontodo = getinformationtodo['description'];
    // let subtaskstodo = getSubTasks(getinformationtodo);
    return { categorytodo, titletodo, descriptiontodo };
}

// function getSubTasks(getinformationtodo) {
//     let subtask = '';
//     for (let sub = 0; sub < getinformationtodo['todo'].length; sub++) {
//         subtask = getinformationtodo[0][sub];
//     }
// }

function showInProgressHtml() {
    const todotask = inprogressTaskHtml();
    let getplaceinprogress = document.getElementById('in_progress_place');
    getplaceinprogress.innerHTML = ``;
    getplaceinprogress.innerHTML += todotask;
}

function showAwaitFeedbackHtml() {
    const todotask = awaitfeedbackTaskHtml();
    let getplaceawaitfeedback = document.getElementById('await_feedback_place');
    getplaceawaitfeedback.innerHTML += todotask;
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