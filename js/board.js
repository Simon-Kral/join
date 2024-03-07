function showTodoHtml() {
    const todotask = todoTaskHtml();
    let getplacetodo = document.getElementById('test_todo_task');
    getplacetodo.innerHTML = todotask;
    showTaskVariant();
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