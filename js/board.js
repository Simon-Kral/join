let todoforce = [];

let currenttask = 0;

let currentdragged;

let currentdraggedarray;

function guestLogin() {
    loaduser = sessionStorage.getItem('userI')
    users = JSON.parse(sessionStorage.getItem('Guest'))
    boardinit()
}

async function loadLocalStorage() {
    users = await getItem('users')
    loaduser = localStorage.getItem('userI')
    boardinit()
}

async function loadSessionStorage() {
    users = await getItem('users')
    loaduser = sessionStorage.getItem('userI')
    boardinit()
}

function boardinit() {
    renderTodo();
    renderInProgress();
    renderAwaitFeedback();
    renderDone();
    showEmptyHtmlTodo();
    showEmptyHtmlInprogress();
    showEmptyHtmlAwaitfeedback();
    showEmptyHtmlDone();
}

function showEmptyHtmlTodo() {
    if (users[loaduser]['todo'] == 0) {
        const empty = emptyTaskFieldTodo();
        let getplacetodo = document.getElementById('to_do_place');
        getplacetodo.innerHTML = empty;
    }
}

function showEmptyHtmlInprogress() {
    if (users[loaduser]['tasksinprogress'] == 0) {
        const empty = emptyTaskFieldInprogress();
        let getplacetodo = document.getElementById('in_progress_place');
        getplacetodo.innerHTML = empty;
    }
}

function showEmptyHtmlAwaitfeedback() {
    if (users[loaduser]['awaitingfeedback'] == 0) {
        const empty = emptyTaskFieldAwaitfeedback();
        let getplacetodo = document.getElementById('await_feedback_place');
        getplacetodo.innerHTML = empty;
    }
}

function showEmptyHtmlDone() {
    if (users[loaduser]['done'] == 0) {
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
    fillAddTaskSection();
}

function todoNewTask() {
    const todocard = bordAddTaskFieldHtml();
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    getplacecard.innerHTML = todocard;
    fillAddTaskSection();
}

function inprogressNewTask() {
    const inprogresscard = bordAddTaskFieldHtml();
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    getplacecard.innerHTML = inprogresscard;
    fillAddTaskSection();
}

function awaitfeedbackNewTask() {
    const awaitfeedbackcard = bordAddTaskFieldHtml();
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    getplacecard.innerHTML = awaitfeedbackcard;
    fillAddTaskSection();
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
    let getplacetodo = document.getElementById('to_do_place');
    getplacetodo.innerHTML = ``;
    let todo = users[loaduser]['todo'];
    for (let i = 0; i < todo.length; i++) {
        todocollect = todo[i];
        showTodoHtml(todocollect, i);
    }
}

function showTodoHtml(getinformationtodo, i) {
    let getplacetodo = document.getElementById('to_do_place');
    const { categorytodo, titletodo, descriptiontodo } = informationTodo(getinformationtodo);
    getplacetodo.innerHTML += todoTaskHtml(categorytodo, titletodo, descriptiontodo, i, getinformationtodo);
    showTaskCategorySmall();
    updateProgressBar();
    console.log(i);
}

function informationTodo(getinformationtodo) {
    let categorytodo = getinformationtodo['category'];
    let titletodo = getinformationtodo['title'];
    let descriptiontodo = getinformationtodo['description'];
    return { categorytodo, titletodo, descriptiontodo };
}

function renderInProgress() {
    let getplacetodo = document.getElementById('in_progress_place');
    getplacetodo.innerHTML = ``;
    let inprogress = users[loaduser]['tasksinprogress'];
    for (let i = 0; i < inprogress.length; i++) {
        inprogresscollect = inprogress[i];
        showInProgressHtml(inprogresscollect, i);
    }
}

function showInProgressHtml(inprogresscollect, i) {
    let getplaceinprogress = document.getElementById('in_progress_place');
    const { categorytodo, titletodo, descriptiontodo } = informationTodo(inprogresscollect);
    getplaceinprogress.innerHTML += inprogressTaskHtml(categorytodo, titletodo, descriptiontodo, i);
    showTaskCategorySmall();
    updateProgressBar();
}

function informationInProgress(getinformationtodo) {
    let categoryinprogress = getinformationtodo['category'];
    let titletodoinprogress = getinformationtodo['title'];
    let descriptiontodoinprogress = getinformationtodo['description'];
    return { categoryinprogress, titletodoinprogress, descriptiontodoinprogress };
}

function renderAwaitFeedback() {
    let getplacetodo = document.getElementById('await_feedback_place');
    getplacetodo.innerHTML = ``;
    let awaitfeedback = users[loaduser]['awaitingfeedback'];
    for (let i = 0; i < awaitfeedback.length; i++) {
        awaitfeedbackcollect = awaitfeedback[i];
        showAwaitFeedbackHtml(awaitfeedbackcollect, i);
    }
}

function showAwaitFeedbackHtml(awaitfeedbackcollect, i) {
    let getplaceawaitfeedback = document.getElementById('await_feedback_place');
    const { categorytodo, titletodo, descriptiontodo } = informationTodo(awaitfeedbackcollect);
    getplaceawaitfeedback.innerHTML += awaitfeedbackTaskHtml(categorytodo, titletodo, descriptiontodo, i);
    showTaskCategorySmall();
    updateProgressBar();
}

function informationAwaitProgress(getinformationtodo) {
    let categoryawaitprogress = getinformationtodo['category'];
    let titletodoawaitprogress = getinformationtodo['title'];
    let descriptiontodoawaitprogress = getinformationtodo['description'];
    return { categoryawaitprogress, titletodoawaitprogress, descriptiontodoawaitprogress };
}

function renderDone() {
    let getplacetodo = document.getElementById('done_place');
    getplacetodo.innerHTML = ``;
    let done = users[loaduser]['done'];
    for (let i = 0; i < done.length; i++) {
        donecollect = done[i];
        showDoneHtml(donecollect, i);
    }
}

function showDoneHtml(donecollect, i) {
    let getplacedone = document.getElementById('done_place');
    const { categorytodo, titletodo, descriptiontodo } = informationTodo(donecollect);
    getplacedone.innerHTML += doneTaskHtml(categorytodo, titletodo, descriptiontodo, i);
    showTaskCategorySmall();
    updateProgressBar();
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

function dragTodo(id) {
    currentdragged = id;
    currentdraggedarray = setTodoArray();
}

function dragInProgress(id) {
    currentdragged = id;
    currentdraggedarray = setInProgressArray();
}

function dragAwaitFeedback(id) {
    currentdragged = id;
    currentdraggedarray = setAwaitFeedbackArray();
}

function dragDone(id) {
    currentdragged = id;
    currentdraggedarray = setDoneForm();
}

function dropTodo(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select['todo'].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1); 
    boardinit();
}

function dropInProgress(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select['tasksinprogress'].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1); 
    boardinit();
}

function dropAwaitFeedBack(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select['awaitingfeedback'].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1); 
    boardinit();
}

function dropDone(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select['done'].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1); 
    boardinit();
}

function setTodoArray() {
    let selecttodo = users[loaduser]['todo'];
    return selecttodo;
}

function setInProgressArray() {
    let selectinprogress = users[loaduser]['tasksinprogress'];
    return selectinprogress;
}

function setAwaitFeedbackArray() {
    let selectafeedback = users[loaduser]['awaitingfeedback'];
    return selectafeedback;
}

function setDoneForm() {
    let selectdone = users[loaduser]['done'];
    return selectdone;
}

function noCloseContent(event) {
    event.stopPropagation();
}


