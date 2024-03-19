function guestLogin() {
    loaduser = sessionStorage.getItem('userI')
    summary_good_morning.innerHTML = 'Good morning!';
    users = JSON.parse(sessionStorage.getItem('Guest'))
    loadSummaryProject()
    sommary_name.innerHTML = '';
}

async function loadLocalStorage() {
    if (localStorage.getItem('userI').length > 0) {
        users = await getItem('users')
        loaduser = localStorage.getItem('userI')
        loadSummaryProject()
    }
}

async function loadSessionStorage() {
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
    let inprogress = document.getElementById('summary_progress');
    let awaitfeedback = document.getElementById('summary_feedback');
    let inboard = document.getElementById('summary_in_board')
    let name = document.getElementById('sommary_name');
    loadSummaryInnerhtml(inboard, todo, done, urgent, deadline, inprogress, awaitfeedback, name)
    console.log(users)
}

async function loadSummaryInnerhtml(inboard, todo, done, urgent, deadline, inprogress, awaitfeedback, name) {
    todo.innerHTML = users[loaduser].todo.length
    done.innerHTML = users[loaduser].done.length
    urgent.innerHTML = users[loaduser].Urgent.length
    inboard.innerHTML = users[loaduser].todo.length+users[loaduser].done.length+users[loaduser].tasksinprogress.length+users[loaduser].awaitingfeedback.length
    inprogress.innerHTML = users[loaduser].tasksinprogress.length
    awaitfeedback.innerHTML = users[loaduser].awaitingfeedback.length
    name.innerHTML = users[loaduser].name
    summaryDeadline(deadline)
}

function summaryDeadline(deadline) {
    if (users[loaduser].todo.length === 0) {
        deadline.innerHTML = ''
        summary_deadline_string.innerHTML = 'No Upcoming Deadline'
    } 
    else {
        let date = users[loaduser].todo.map(urgent => urgent.date)
        let minDate = new Date(Math.min.apply(null, date.map(date => new Date(formatDate(date)))));
        deadline.innerHTML = formatOutputDate(minDate)
    }
}

function formatDate(date) {
    let [day, month, year] = date.split('/');
    return `${month}/${day}/${year}`;
}

function formatOutputDate(date) {
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

document.addEventListener("DOMContentLoaded", function() {
    let alreadyPlayed = sessionStorage.getItem("handyWelcomePlayed");
    let summaryWelcome = document.querySelector('.summary-welcome');

    if (!alreadyPlayed) {
        summaryWelcome.classList.add('animateOnce');
        summaryWelcome.addEventListener('animationend', function() {
            sessionStorage.setItem("handyWelcomePlayed", true);
        }, { once: true });
    } else {
        summaryWelcome.style.display = 'none';
    }
});