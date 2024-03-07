let taskforce = [{
    "task": "Wie definiert man in Javascript eine Variable"
}, {
    "task": "Wie  eine Variable"
}, {
    "task": "Wie definiert man in eine Variable"
}, {
    "task": "Wie definiein Javascript eine Variable"
}, {
    "task": "Wirt man in Javascript eine Variable"
},];

let currenttask = 0;

function showTodoHtml() {
    const todotask = todoTaskHtml();
    let getplacetodo = document.getElementById('test_todo_task');
    getplacetodo.innerHTML = todotask;
    showTaskVariant();
    updateProgressBar();
}

function showInProgressHtml() {
    const todotask = inprogressTaskHtml();
    let getplacetask = document.getElementById('test_inprogress_task');
    getplacetask.innerHTML = todotask;
}

function showAwaitFeedbackHtml() {
    const todotask = awaitfeedbackTaskHtml();
    let getplacetask = document.getElementById('test_awaitfeedback_task');
    getplacetask.innerHTML = todotask;
}

function showDoneHtml() {
    const todotask = doneTaskHtml();
    let getplacetask = document.getElementById('test_done_task');
    getplacetask.innerHTML = todotask;
}

function showTaskVariant() {
    const taskvariant = technicalTaskHtml();
    const taskvarianttwo = userTaskHtml();
    let getplacetaskvariant = document.getElementById('task-variant');
    getplacetaskvariant.innerHTML = taskvariant + taskvarianttwo;
}

function updateProgressBar() {
    let percent = (currenttask + 1) / taskforce.length;
    percent = Math.round(percent * 100);

    document.getElementById('progressbar').style = `width: ${percent}%`;
}
