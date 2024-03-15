async function loadSummary() {
    if (sessionStorage.getItem("Guest") === null) {
        if (localStorage.getItem("userI") === null) { }
        else {
            if (localStorage.getItem('userI').length > 0) {
                loadSummaryStorage()
            }
        }
        if (sessionStorage.getItem("userI") === null) { }
        else {
            if (sessionStorage.getItem('userI').length > 0) {
                loadSummarySessionStorage()
            }
        }
    }
    else {
        guestLogin()
    }
}

function guestLogin() {
    loaduser = sessionStorage.getItem('userI')
        summary_good_morning.innerHTML = 'Good morning';
        users = [{
            name: '',
            email: '',
            password: '',
            todo: [],
            done: [],
            Urgent: [],
            tasksinboard: [],
            tasksinprogress: [],
            awaitingfeedback: [],
            deadline: []
        }]
        loadSummaryProject()
        sommary_name.innerHTML = '';
}

async function loadSummaryStorage() {
    if (localStorage.getItem('userI').length > 0) {
        users = await getItem('users')
        loaduser = localStorage.getItem('userI')
        loadSummaryProject()
    }
}

async function loadSummarySessionStorage() {
    if (sessionStorage.getItem('userI').length > 0) {
        users = await getItem('users')
        loaduser = sessionStorage.getItem('userI')
        loadSummaryProject()
    }
}

async function loadSummaryProject() {
    let todo = document.getElementById('summary_to_do');
    let done = document.getElementById('summary_done');
    let urgent = document.getElementById('summary_urgent');
    let deadline = document.getElementById('summary_deadline');
    let board = document.getElementById('summary_in_board');
    let inprogress = document.getElementById('summary_progress');
    let awaitfeedback = document.getElementById('summary_feedback');
    let name = document.getElementById('sommary_name');
    loadSummaryInnerhtml(todo, done, urgent, deadline, board, inprogress, awaitfeedback, name)
}

async function loadSummaryInnerhtml(todo, done, urgent, deadline, board, inprogress, awaitfeedback, name) {
    todo.innerHTML = users[loaduser].todo.length
    done.innerHTML = users[loaduser].done.length
    urgent.innerHTML = users[loaduser].Urgent.length

    board.innerHTML = users[loaduser].tasksinboard.length
    inprogress.innerHTML = users[loaduser].tasksinprogress.length
    awaitfeedback.innerHTML = users[loaduser].awaitingfeedback.length
    name.innerHTML = users[loaduser].name
}