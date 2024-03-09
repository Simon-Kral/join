let users = [];

async function register(){
    users.push({
        name: register_name.value,
        email: register_email.value,
        password: register_password.value,
    })
    resetForm()
}

function resetForm(){
    register_name.value = '';
    register_email.value = '';
    register_password.value = '';
    register_confirm_password.value = '';
    register_checkbox.checked = false
}