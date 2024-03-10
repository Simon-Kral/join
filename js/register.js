let users = [];

async function register(){
    if(register_password.value != register_confirm_password.value) {
        register_confirm_password.setCustomValidity("Passwords Don't Match");
    }
    else{
    users.push({
        name: register_name.value,
        email: register_email.value,
        password: register_password.value,
    })
    resetForm()
}
}

function resetForm(){
    register_name.value = '';
    register_email.value = '';
    register_password.value = '';
    register_confirm_password.value = '';
    register_checkbox.checked = false
    backToLogin()
    singedUpSucces()
}

function singedUpSucces(){
    let singedupsucces = document.getElementById('singed_Up_Succes')
    singedupsucces.classList.replace('d-none','singed-Up-Succes')
    setTimeout(singedUpSuccesRemove, 2000)
}

function singedUpSuccesRemove() {
    let singedupsucces = document.getElementById('singed_Up_Succes')
    singedupsucces.classList.replace('singed-Up-Succes','d-none')
}