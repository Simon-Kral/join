let searchresults = [];
let currenttask = 0;
let currentdragged;
let currentdraggedarray;
let task;

function boardinit() {
    renderTasks();
    showEmptyHtmlTodo();
    showEmptyHtmlInprogress();
    showEmptyHtmlAwaitfeedback();
    showEmptyHtmlDone();
    hoverBoxHtmlTodo();
    hoverBoxHtmlInprogress();
    hoverBoxHtmlAwaitfeedback();
    hoverBoxHtmlDone();
}

function emptyBoxHtml(containerId) {
    const empty = hoverHtml();
    let getPlace = document.getElementById(containerId);
    getPlace.innerHTML += empty;
}

function hoverBoxHtmlTodo() {
    if (users[loaduser]["todo"].length > 0) {
        emptyBoxHtml("to_do_place");
    }
}

function hoverBoxHtmlInprogress() {
    if (users[loaduser]["tasksinprogress"].length > 0) {
        emptyBoxHtml("in_progress_place");
    }
}

function hoverBoxHtmlAwaitfeedback() {
    if (users[loaduser]["awaitingfeedback"].length > 0) {
        emptyBoxHtml("await_feedback_place");
    }
}

function hoverBoxHtmlDone() {
    if (users[loaduser]["done"].length > 0) {
        emptyBoxHtml("done_place");
    }
}

function showEmptyHtmlTodo() {
    if (users[loaduser]["todo"] == 0) {
        const empty = emptyTaskFieldTodo();
        let getplacetodo = document.getElementById("to_do_place");
        getplacetodo.innerHTML = empty;
    }
}

function showEmptyHtmlInprogress() {
    if (users[loaduser]["tasksinprogress"] == 0) {
        const empty = emptyTaskFieldInprogress();
        let getplacetodo = document.getElementById("in_progress_place");
        getplacetodo.innerHTML = empty;
    }
}

function showEmptyHtmlAwaitfeedback() {
    if (users[loaduser]["awaitingfeedback"] == 0) {
        const empty = emptyTaskFieldAwaitfeedback();
        let getplacetodo = document.getElementById("await_feedback_place");
        getplacetodo.innerHTML = empty;
    }
}

function showEmptyHtmlDone() {
    if (users[loaduser]["done"] == 0) {
        const empty = emptyTaskFieldDone();
        let getemptyplacedone = document.getElementById("done_place");
        getemptyplacedone.innerHTML = empty;
    }
}

function closeCard() {
    document.getElementById("fullscreen_information").classList.add("d-none");
    selectedcontacts = [];
    boardinit();
}

function bordAddNewTask(array) {
    const card = bordAddTaskFieldHtml();
    let getplacecard = document.getElementById("add_bordtask_data");
    document.getElementById("fullscreen_information").classList.remove("d-none");
    getplacecard.innerHTML = card;
    fillAddTaskSection(array);
}

function openBordTask(id, element) {
    element.parentElement && element.parentElement.id === "to_do_place" ? (dragTodo(id), openTask(id, "todo")) : element.parentElement && element.parentElement.id === "in_progress_place" ? (dragInProgress(id), openTask(id, "tasksinprogress")) : element.parentElement && element.parentElement.id === "await_feedback_place" ? (dragAwaitFeedback(id), openTask(id, "awaitingfeedback")) : element.parentElement && element.parentElement.id === "done_place" && (dragDone(id), openTask(id, "done"));
}

function openTask(i, key) {
    let getplacecard = document.getElementById("add_bordtask_data");
    document.getElementById("fullscreen_information").classList.remove("d-none");
    const selectarray = currentdraggedarray[i];
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo, datetodo } = informationTodo(selectarray);
    const choosencategory = selectCategory(categorytodo);
    const choosensubtasks = selectSubtasks(subtaskstodo);
    const getsubtaskhtml = selectSubtaskHtml(choosensubtasks, selectarray);
    const choosenpriority = selectPriorityOpenTask(priotodo);
    const selectcontacts = selectContactsOpenTask(contactstodo);
    getplacecard.innerHTML = fullTaskHtml(choosencategory, titletodo, descriptiontodo, i, choosenpriority, datetodo, getsubtaskhtml, selectcontacts, key);
}

function editSingleTask(i, key) {
    let getplacetaskvariantbord = document.getElementById("add_bordtask_data");
    const selectarray = currentdraggedarray[i];
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo, datetodo } = informationTodo(selectarray);
    categorytodo;
    const choosenpriority = selectPriority(priotodo);
    getplacetaskvariantbord.innerHTML = editTaskHtml(titletodo, descriptiontodo, i, choosenpriority, datetodo, key);
    initAddTask(i, priotodo);
    editContactsFactory(contactstodo);
    editSubtaskFactory(subtaskstodo);
}

function renderTasks() {
    const taskSections = ["to_do_place", "in_progress_place", "await_feedback_place", "done_place"];

    taskSections.forEach((sectionId) => {
        let sectionElement = document.getElementById(sectionId);
        sectionElement.innerHTML = ``;

        let tasks = sectionId === "to_do_place" ? users[loaduser]["todo"] : sectionId === "in_progress_place" ? users[loaduser]["tasksinprogress"] : sectionId === "await_feedback_place" ? users[loaduser]["awaitingfeedback"] : sectionId === "done_place" ? users[loaduser]["done"] : [];
        tasks.forEach((task, index) => {
            showTaskHtml(task, index, sectionId);
        });
    });
}

function showTaskHtml(task, index, sectionId) {
    let sectionElement = document.getElementById(sectionId);
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo } = informationTodo(task);
    const { choosencategory, choosenpriority, selectedCheckboxCount, barupdated, choosensubs, selectcontacts } = informationsFactory(categorytodo, priotodo, subtaskstodo, contactstodo);
    sectionElement.innerHTML += todoTaskHtml(choosencategory, titletodo, descriptiontodo, index, barupdated, selectcontacts, choosenpriority, choosensubs, selectedCheckboxCount, sectionId);
}

function informationTodo(task) {
    let { category, title, description, subtasks, contacts, prio, date } = task;
    return { categorytodo: category, titletodo: title, descriptiontodo: description, subtaskstodo: subtasks, contactstodo: contacts, priotodo: prio, datetodo: date };
}

function informationsFactory(category, priority, subtasks, contacts) {
    const choosencategory = selectCategory(category);
    const choosenpriority = selectPriority(priority);
    const selectedCheckboxCount = countSelectedCheckboxes(subtasks);
    const barupdated = updateProgressBar(subtasks, selectedCheckboxCount);
    const choosensubs = choosenSubtasks(subtasks, selectedCheckboxCount);
    const selectcontacts = selectContacts(contacts);
    return { choosencategory, choosenpriority, selectedCheckboxCount, barupdated, choosensubs, selectcontacts };
}

function selectCategory(category) {
    return category == "Technical Task" ? technicalTaskHtml() : userTaskHtml();
}

function selectContacts(contactstodo) {
    let contacthtml = "";
    for (let s = 0; s < contactstodo.length; s++) {
        const contact = contactstodo[s];
        if (!contact.firstname) continue;
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        contacthtml += `
            <div class="contact-name-place">
                <span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>
            </div>`;
    }
    return contacthtml;
}

function selectContactsOpenTask(contactstodo) {
    let contacthtml = "";
    for (let s = 0; s < contactstodo.length; s++) {
        const contact = contactstodo[s];
        if (!contact.firstname) continue;
        const selectfirstnamecon = contact["firstname"];
        const selectlastnamecon = contact["lastname"];
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        contacthtml += `
            <div class="contact-name-place">
                <span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>
                <span>${selectfirstnamecon}&nbsp;${selectlastnamecon}</span>
            </div>`;
    }
    return contacthtml;
}

function selectPriority(priority) {
    return priority === "urgent" ? urugentPrioHtml() : priority === "low" ? lowPrioHtml() : priority === "medium" ? mediumPrioHtml() : mediumPrioHtml();
}

function selectPriorityOpenTask(priority) {
    return priority === "urgent" ? urugentPrioHtmlOpenTask() : priority === "low" ? lowPrioHtmlOpenTask() : priority === "medium" ? mediumPrioHtmlOpenTask() : mediumPrioHtmlOpenTask();
}

function showTaskCategoryBig(category) {
    const html = category === "Technical Task" ? technicalTaskHtml() : userTaskHtml();
    document.getElementById("task_variant_bord").innerHTML = html;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(id, element) {
    const parentElementId = element.parentElement ? element.parentElement.id : null;
    const dragFunctions = {
        to_do_place: dragTodo,
        in_progress_place: dragInProgress,
        await_feedback_place: dragAwaitFeedback,
        done_place: dragDone,
    };
    const dragFunction = dragFunctions[parentElementId];
    dragFunction ? dragFunction(id) : null;
    // emptytaskplacedrop()
}

// function emptytaskplacedrop(){
//     if (document.getElementById('empty-task-place-drop0')) {
//         let emptytaskplacedrop0 = document.getElementById('empty-task-place-drop0')
//         emptytaskplacedrop0.style.backgroundColor = '#E7E7E7';
//     }
// }

function choosenSubtasks(subtasks, selectedCheckboxCount) {
    let subtasklength = subtasks.length;
    if (subtasklength <= 1) {
        let nullsubs = empty();
        return nullsubs;
    } else {
        let checksubs = subtaskProgressbarHtml(subtasklength - 1, selectedCheckboxCount);
        return checksubs;
    }
}

function updateProgressBar(subtasks, selectedCheckboxCount) {
    let percent = selectedCheckboxCount === 1 ? 0 : Math.round((selectedCheckboxCount / subtasks.length) * 100);
    if (subtasks.length <= 1) {
        let nullsubs = empty();
        return nullsubs;
    } else {
        let checksubs = createProgressBar(percent);
        return checksubs;
    }
}

function selectSubtasks(subtaskstodo) {
    let iteratedList = [];
    for (let st = 1; st < subtaskstodo.length; st++) {
        let sublistplace = subtaskstodo[st];
        let list = sublistplace["name"];
        iteratedList.push(list);
    }
    return iteratedList;
}

async function updateSelectedCheckboxes(index, isChecked) {
    task["subtasks"][index]["isChecked"] = isChecked;
    await saveToServer();

    const imgElement = document.getElementById(`subtask${index}`);
    if (isChecked == true) {
        imgElement.src = "./assets/img/bord_check.png";
    } else {
        imgElement.src = "./assets/img/bord_uncheck.png";
    }
}

function countSelectedCheckboxes(subtaskstodo) {
    let count = 1; // Start counting from 1
    for (let checkindex = 0; checkindex < subtaskstodo.length; checkindex++) {
        const check = subtaskstodo[checkindex]["isChecked"];
        check == true ? count++ : "";
    }
    return count;
}

function selectSubtaskHtml(sublist, selectarray) {
    let html = "";
    for (let i = 0; i < sublist.length; i++) {
        const subtask = sublist[i];
        const isChecked = selectarray["subtasks"][i]["isChecked"] ? "checked" : "";
        const imgSrc = selectarray["subtasks"][i]["isChecked"] ? "./assets/img/bord_check.png" : "./assets/img/bord_uncheck.png";
        html += `<li><input class="check-bord" id="toggle_button${i}" type="checkbox" onchange="updateSelectedCheckboxes(${i}, this.checked)" ${isChecked}>`;
        html += `<label for="toggle_button${i}"><img id="subtask${i}" src="${imgSrc}"></label>`;
        html += `<label class="single-subtask-element" for="subtask${i}">${subtask}</label></li>`;
    }
    task = selectarray;
    return html;
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

function setTodoArray() {
    let selecttodo = users[loaduser]["todo"];
    checkboxtodo = selecttodo;
    return selecttodo;
}

function setInProgressArray() {
    let selectinprogress = users[loaduser]["tasksinprogress"];
    return selectinprogress;
}

function setAwaitFeedbackArray() {
    let selectafeedback = users[loaduser]["awaitingfeedback"];
    return selectafeedback;
}

function setDoneForm() {
    let selectdone = users[loaduser]["done"];
    return selectdone;
}

async function dropTodo(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select["todo"].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
}

async function dropInProgress(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select["tasksinprogress"].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
}

async function dropAwaitFeedBack(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select["awaitingfeedback"].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
}

async function dropDone(ev) {
    ev.preventDefault();
    let select = users[loaduser];
    select["done"].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
}

function noCloseContent(event) {
    event.stopPropagation();
}

function searchTaskPlace() {
    return {
        todoplace: document.getElementById(`to_do_place`),
        inprogressplace: document.getElementById(`in_progress_place`),
        awaitfeedbackplace: document.getElementById(`await_feedback_place`),
        doneplace: document.getElementById(`done_place`),
    };
}

function getSearchInput() {
    const search = document.getElementById("search_input").value.trim().toLowerCase();
    return { search, searchlength: search.length };
}

function searchTitleStart() {
    const { search, searchlength } = getSearchInput();
    const { todoplace, inprogressplace, awaitfeedbackplace, doneplace } = searchTaskPlace();
    searchlength >= 1 ? renderResults(filterResults(search), todoplace, inprogressplace, awaitfeedbackplace, doneplace) : boardinit();
}

function filterResults(search) {
    return {
        resultstodo: filterArray(setTodoArray(), search),
        resultsinprogress: filterArray(setInProgressArray(), search),
        resultsawaitfeedback: filterArray(setAwaitFeedbackArray(), search),
        resultsdone: filterArray(setDoneForm(), search),
    };
}

function filterArray(array, search) {
    return array.filter((item) => item.title.toLowerCase().includes(search));
}

function renderResults(filteredResults, todoplace, inprogressplace, awaitfeedbackplace, doneplace) {
    renderResultsCategory(filteredResults.resultstodo, todoplace);
    renderResultsCategory(filteredResults.resultsinprogress, inprogressplace);
    renderResultsCategory(filteredResults.resultsawaitfeedback, awaitfeedbackplace);
    renderResultsCategory(filteredResults.resultsdone, doneplace);
}

function renderResultsCategory(results, place) {
    place.innerHTML = "";
    results.length <= 0 ? (place.innerHTML = nothingFound()) : results.forEach((item, index) => showHtml(item, place, index));
}

function showHtml(item, place, index) {
    place.id === "to_do_place" && showTaskHtml(item, index, "to_do_place");
    place.id === "in_progress_place" && showTaskHtml(item, index, "in_progress_place");
    place.id === "await_feedback_place" && showTaskHtml(item, index, "await_feedback_place");
    place.id === "done_place" && showTaskHtml(item, index, "done_place");
}

async function deleteSingleTask(i) {
    currentdraggedarray.splice(i, 1);
    boardinit();
    closeCard();
    await saveToServer();
}

async function saveToServer() {
    sessionStorage.getItem("Guest") === null ? await setItem("users", JSON.stringify(users)) : sessionStorage.setItem("Guest", JSON.stringify(users));
}

function editContactsFactory(selectcontacts) {
    for (let j = 0; j < selectcontacts.length; j++) {
        const selected = selectcontacts[j];
        const idselected = selected["id"];
        selectContactById(idselected);
    }
}

function editSubtaskFactory(subtaskstodo) {
    for (let h = 0; h < subtaskstodo.length; h++) {
        const selected = subtaskstodo[h];
        if (selected.name) addSubtask(0, selected);
    }
}

function openMoveMenue(i, ele) {
    const parentId = ele.parentElement.parentElement.parentElement.id;
    parentId === 'to_do_place' ? (dragTodo(i), openMoveTaskMenu(i, "todo")) :
    parentId === 'in_progress_place' ? (dragInProgress(i), openMoveTaskMenu(i, "tasksinprogress")) :
    parentId === 'await_feedback_place' ? (dragAwaitFeedback(i), openMoveTaskMenu(i, "awaitingfeedback")) :
    parentId === 'done_place' && (dragDone(i), openMoveTaskMenu(i, "done"));
}

function openMoveTaskMenu(i, movekey) {
    let getplacecard = document.getElementById("add_bordtask_data");
    document.getElementById("fullscreen_information").classList.remove("d-none");
    getplacecard.innerHTML = moveTaskMenue(i, movekey);
    movekey === "todo" ? document.getElementById("light_todo").classList.add("highlight-color") :
    movekey === "tasksinprogress" ? document.getElementById("light_inprogress").classList.add("highlight-color") :
    movekey === "awaitingfeedback" ? document.getElementById("light_awaitfeedback").classList.add("highlight-color") :
    movekey === "done" && document.getElementById("light_done").classList.add("highlight-color");
}

async function moveTask(category) {
    let select = users[loaduser];
    select[category].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
    document.getElementById("fullscreen_information").classList.add("d-none");
}

async function moveTodo() {
    moveTask("todo");
}

async function moveInprogress() {
    moveTask("tasksinprogress");
}

async function moveAwaitfeedback() {
    moveTask("awaitingfeedback");
}

async function moveDone() {
    moveTask("done");
}