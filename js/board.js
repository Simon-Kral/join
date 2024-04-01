let searchresults = [];
let currenttask = 0;
let currentdragged;
let currentdraggedarray;
let task;


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
    boardinit();
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

function openBordTask(id, element) {
    if (element.parentElement && element.parentElement.id === 'to_do_place') {
        dragTodo(id);
        openTask(id);
    } if (element.parentElement && element.parentElement.id === 'in_progress_place') {
        dragInProgress(id);
        openTask(id);
    } if (element.parentElement && element.parentElement.id === 'await_feedback_place') {
        dragAwaitFeedback(id);
        openTask(id);
    } if (element.parentElement && element.parentElement.id === 'done_place') {
        dragDone(id);
        openTask(id);
    }
}

function openTask(i) {
    let getplacecard = document.getElementById('add_bordtask_data');
    document.getElementById('fullscreen_information').classList.remove('d-none');
    const selectarray = currentdraggedarray[i];
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo, datetodo } = informationTodo(selectarray);
    const choosencategory = selectCategory(categorytodo);
    const choosensubtasks = selectSubtasks(subtaskstodo);
    const getsubtaskhtml = selectSubtaskHtml(choosensubtasks, selectarray);
    const choosenpriority = selectPriority(priotodo);
    const selectcontacts = selectContacts(contactstodo);
    getplacecard.innerHTML = fullTaskHtml(choosencategory, titletodo, descriptiontodo, i, choosenpriority, datetodo, getsubtaskhtml, selectcontacts);
}

function editSingleTask(i) {
    let getplacetaskvariantbord = document.getElementById('add_bordtask_data');
    const selectarray = currentdraggedarray[i];
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo, datetodo } = informationTodo(selectarray);
    categorytodo;
    const choosensubtasks = selectSubtasks(subtaskstodo);
    const getsubtaskhtml = selectSubtaskHtml(choosensubtasks, selectarray);
    const choosenpriority = selectPriority(priotodo);
    const selectcontacts = selectContacts(contactstodo);
    getplacetaskvariantbord.innerHTML = ``;
    getplacetaskvariantbord.innerHTML = editTaskHtml(titletodo, descriptiontodo, i, choosenpriority, datetodo, getsubtaskhtml, selectcontacts);
    initAddTask();
}

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
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo } = informationTodo(getinformationtodo);
    const choosencategory = selectCategory(categorytodo);
    const choosenpriority = selectPriority(priotodo);
    const selectedCheckboxCount = countSelectedCheckboxes(subtaskstodo);
    const barupdated = updateProgressBar(subtaskstodo, selectedCheckboxCount);
    const subtasklenght = subtaskstodo.length;
    const selectcontacts = selectContacts(contactstodo);
    getplacetodo.innerHTML += todoTaskHtml(choosencategory, titletodo, descriptiontodo, i, barupdated, selectcontacts, choosenpriority, subtasklenght, selectedCheckboxCount);
}

function selectContacts(contactstodo) {
    let contacthtml = "";
    for (let s = 1; s < contactstodo.length; s++) {
        const contact = contactstodo[s];
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        contacthtml = `<span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>`;
        return contacthtml;
    }
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
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo } = informationTodo(inprogresscollect);
    const choosencategory = selectCategory(categorytodo);
    const choosenpriority = selectPriority(priotodo);
    const selectedCheckboxCount = countSelectedCheckboxes(subtaskstodo);
    const barupdated = updateProgressBar(subtaskstodo, selectedCheckboxCount);
    const subtasklenght = subtaskstodo.length;
    const selectcontacts = selectContacts(contactstodo);
    getplaceinprogress.innerHTML += todoTaskHtml(choosencategory, titletodo, descriptiontodo, i, barupdated, selectcontacts, choosenpriority, subtasklenght, selectedCheckboxCount);
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
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo } = informationTodo(awaitfeedbackcollect);
    const choosencategory = selectCategory(categorytodo);
    const choosenpriority = selectPriority(priotodo);
    const selectedCheckboxCount = countSelectedCheckboxes(subtaskstodo);
    const barupdated = updateProgressBar(subtaskstodo, selectedCheckboxCount);
    const subtasklenght = subtaskstodo.length;
    const selectcontacts = selectContacts(contactstodo);
    getplaceawaitfeedback.innerHTML += todoTaskHtml(choosencategory, titletodo, descriptiontodo, i, barupdated, selectcontacts, choosenpriority, subtasklenght, selectedCheckboxCount);
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
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo } = informationTodo(donecollect);
    const choosencategory = selectCategory(categorytodo);
    const choosenpriority = selectPriority(priotodo);
    const selectedCheckboxCount = countSelectedCheckboxes(subtaskstodo);
    const barupdated = updateProgressBar(subtaskstodo, selectedCheckboxCount);
    const subtasklenght = subtaskstodo.length;
    const selectcontacts = selectContacts(contactstodo);
    getplacedone.innerHTML += todoTaskHtml(choosencategory, titletodo, descriptiontodo, i, barupdated, selectcontacts, choosenpriority, subtasklenght, selectedCheckboxCount);
}

function informationTodo(getinformationtodo) {
    let categorytodo = getinformationtodo['category'];
    let titletodo = getinformationtodo['title'];
    let descriptiontodo = getinformationtodo['description'];
    let subtaskstodo = getinformationtodo['subtasks'];
    let contactstodo = getinformationtodo['contacts'];
    let priotodo = getinformationtodo['prio'];
    let datetodo = getinformationtodo['date'];
    return { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo, datetodo };
}

function selectCategory(category) {
    if (category == "Technical Task") {
        let technicaltask = technicalTaskHtml();
        return technicaltask;
    } else {
        let userstory = userTaskHtml();
        return userstory;
    }
}

function updateProgressBar(subtasks, selectedCheckboxCount) {
    let percent = selectedCheckboxCount / subtasks.length;
    percent = Math.round(percent * 100);

    if (subtasks <= 0) {
        let emptyplace = emptyPlaceHtml();
        return emptyplace;
    } else {
        let progressbar = createProgressBar(percent);
        return progressbar;
    }
}

function selectPriority(priority) {
    if (priority == "urgent") {
        let urugentprio = urugentPrioHtml();
        return urugentprio;
    } if (priority = "low") {
        let lowprio = lowPrioHtml();
        return lowprio;
    } if (priority = "medium") {
        let mediumprio = mediumPrioHtml();
        return mediumprio;
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

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(id, element) {
    if (element.parentElement && element.parentElement.id === 'to_do_place') {
        dragTodo(id);
    } if (element.parentElement && element.parentElement.id === 'in_progress_place') {
        dragInProgress(id);
    } if (element.parentElement && element.parentElement.id === 'await_feedback_place') {
        dragAwaitFeedback(id);
    } if (element.parentElement && element.parentElement.id === 'done_place') {
        dragDone(id);
    }
}

function selectSubtasks(subtaskstodo) {
    let iteratedList = [];
    for (let st = 1; st < subtaskstodo.length; st++) {
        let sublistplace = subtaskstodo[st];
        let list = sublistplace['name'];
        iteratedList.push(list);
    }
    return iteratedList;
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

async function dropTodo(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select['todo'].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
}

async function dropInProgress(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select['tasksinprogress'].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
}

async function dropAwaitFeedBack(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select['awaitingfeedback'].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
}

async function dropDone(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select['done'].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
}

function setTodoArray() {
    let selecttodo = users[loaduser]['todo'];
    checkboxtodo = selecttodo;
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

function searchTaskPlace() {
    let todoplace = document.getElementById(`to_do_place`);
    let inprogressplace = document.getElementById(`in_progress_place`);
    let awaitfeedbackplace = document.getElementById(`await_feedback_place`);
    let doneplace = document.getElementById(`done_place`);
    return { todoplace, inprogressplace, awaitfeedbackplace, doneplace };
}

function getSearchInput() {
    let search = document.getElementById('search_input').value.trim().toLowerCase();
    const searchlength = search.length;
    return { search, searchlength };
}

function searchTitleStart() {
    const { search, searchlength } = getSearchInput();
    const { todoplace, inprogressplace, awaitfeedbackplace, doneplace } = searchTaskPlace();
    searchStart(searchlength, search, todoplace, inprogressplace, awaitfeedbackplace, doneplace);
    searchClear(searchlength);
}

function filterResults(search) {
    const resultstodo = filterTodo(search);
    const resultsinprogress = filterInProgress(search);
    const resultsawaitfeedback = filterAwaitFeedback(search);
    const resultsdone = filterDone(search);
    return { resultstodo, resultsinprogress, resultsawaitfeedback, resultsdone };
}

function renderResults(filteredResults, todoplace, inprogressplace, awaitfeedbackplace, doneplace) {
    renderResultsTodo(filteredResults.resultstodo, todoplace);
    renderResultsInProgress(filteredResults.resultsinprogress, inprogressplace);
    renderResultsAwaitFeedback(filteredResults.resultsawaitfeedback, awaitfeedbackplace);
    renderResultsDone(filteredResults.resultsdone, doneplace);
}

function searchStart(searchlength, search, todoplace, inprogressplace, awaitfeedbackplace, doneplace) {
    if (searchlength >= 1) {
        const filteredResults = filterResults(search);
        renderResults(filteredResults, todoplace, inprogressplace, awaitfeedbackplace, doneplace);
    }
}

function searchClear(searchlength) {
    if (searchlength <= 0) {
        boardinit();
    }
}

function filterTodo(search) {
    let todoarray = setTodoArray();
    let results = [];

    for (let t = 0; t < todoarray.length; t++) {
        let searchcollector = todoarray[t];
        const name = searchcollector['title'];
        if (name.toLowerCase().includes(search)) {
            results.push(searchcollector);
        }
    }
    return results;
}

function renderResultsTodo(resultstodo, todoplace) {
    todoplace.innerHTML = ``;
    if (resultstodo <= 0) {
        todoplace.innerHTML = nothingFound();
    } else {
        for (let i = 0; i < resultstodo.length; i++) {
            todocollect = resultstodo[i];
            showTodoHtml(todocollect, i);
        }
    }
}

function filterInProgress(search) {
    let inprogressarray = setInProgressArray();
    let results = [];

    for (let index = 0; index < inprogressarray.length; index++) {
        let searchcollector = inprogressarray[index];
        const name = searchcollector['title'];
        if (name.toLowerCase().includes(search)) {
            results.push(searchcollector);
        }
    }
    return results;
}


function renderResultsInProgress(resultsinprogress, inprogressplace) {
    inprogressplace.innerHTML = ``;
    if (resultsinprogress <= 0) {
        inprogressplace.innerHTML = nothingFound();
    } else {
        for (let i = 0; i < resultsinprogress.length; i++) {
            todocollect = resultsinprogress[i];
            showInProgressHtml(todocollect, i);
        }
    }
}

function filterAwaitFeedback(search) {
    let afeedbackarray = setAwaitFeedbackArray();
    let results = [];

    for (let index = 0; index < afeedbackarray.length; index++) {
        let searchcollector = afeedbackarray[index];
        const name = searchcollector['title'];
        if (name.toLowerCase().includes(search)) {
            results.push(searchcollector);
        }
    }
    return results;
}


function renderResultsAwaitFeedback(resultsawaitfeedback, awaitfeedbackplace) {
    awaitfeedbackplace.innerHTML = ``;
    if (resultsawaitfeedback <= 0) {
        awaitfeedbackplace.innerHTML = nothingFound();
    } else {
        for (let i = 0; i < resultsawaitfeedback.length; i++) {
            todocollect = resultsawaitfeedback[i];
            showAwaitFeedbackHtml(todocollect, i);
        }
    }
}

function filterDone(search) {
    let donearray = setDoneForm();
    let results = [];

    for (let index = 0; index < donearray.length; index++) {
        let searchcollector = donearray[index];
        const name = searchcollector['title'];
        if (name.toLowerCase().includes(search)) {
            results.push(searchcollector);
        }
    }
    return results;
}

function renderResultsDone(resultsdone, doneplace) {
    doneplace.innerHTML = ``;
    if (resultsdone <= 0) {
        doneplace.innerHTML = nothingFound();
    } else {
        for (let i = 0; i < resultsdone.length; i++) {
            todocollect = resultsdone[i];
            showDoneHtml(todocollect, i);
        }
    }
}

async function deleteSingleTask(i) {
    currentdraggedarray.splice(i, 1);
    boardinit();
    closeCard();
    await saveToServer();
}

async function saveToServer() {
    if (sessionStorage.getItem("Guest") === null) {
        await setItem("users", JSON.stringify(users));
    } else {
        sessionStorage.setItem("Guest", JSON.stringify(users));
    }
}

async function updateSelectedCheckboxes(index, isChecked) {
    task["subtasks"][index]["isChecked"] = isChecked;
    await saveToServer();
}

function countSelectedCheckboxes(subtaskstodo) {
    let count = 1;
    for (let checkindex = 0; checkindex < subtaskstodo.length; checkindex++) {
        const check = subtaskstodo[checkindex]["isChecked"];
        if (check === true) {
            count++;
        }
    }
    return count;
}

function selectSubtaskHtml(sublist, selectarray) {
    let html = "";
    for (let i = 0; i < sublist.length; i++) {
        const subtask = sublist[i];
        const isChecked = subtask.isChecked ? "checked" : ""; 
        html += `<li><input type="checkbox" id="subtask${i}" name="subtask${i}" onchange="updateSelectedCheckboxes(${i}, this.checked)" ${isChecked}>`;
        html += `<label for="subtask${i}">${subtask}</label></li>`; 
    }
    task = selectarray;
    return html;
}
