function saveUsers() {
    localStorage.setItem('userLoginJson', JSON.stringify(userLoginJson));
}

function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let privacyCheckbox = document.getElementById('privacyCheckbox').checked;

    if (!privacyCheckbox) {
        document.getElementById('msgBox').innerHTML = "You must accept the privacy policy";
        return false;
    }

    if (password !== confirmPassword) {
        document.getElementById('msgBox').innerHTML = "Passwords do not match";
        return false;
    }

    if (userLoginJson.some(user => user.email === email)) {
        document.getElementById('msgBox').innerHTML = "Email already registered";
        return false;
    }

    userLoginJson.push({ accountName: name, email: email, password: password });
    saveUsers();
    window.location.href = '07logIn.html?msg=Du hast dich erfolgreich registriert';
    return true;
}



