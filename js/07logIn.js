document.addEventListener("DOMContentLoaded", function() {
    // Simuliere eine Ladeverzögerung
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Entferne den Preloader nach der Animation
        setTimeout(function() {
            document.getElementById('preloader').style.display = 'none';
        }, 1000); // 1 Sekunde Verzögerung, um die CSS-Animation zu beenden
    },);
});

function login() {
    console.log(userLoginJson);
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let rememberCheckbox = document.getElementById('rememberCheckbox').checked;

    if (!rememberCheckbox) {
        document.getElementById('loginMsgBox').innerHTML = "You must accept the remember me option";
        return false;
    }

    let user = userLoginJson.find(u => u.email == email && u.password == password);
    
    if (user) {
        document.getElementById('loginMsgBox').innerHTML = "Login successful";
        window.location.href = '02summary.html'; // Weiterleitung nach erfolgreichem Login
        return true;
    } else {
        document.getElementById('loginMsgBox').innerHTML = "Invalid email or password";
        return false;
    }
}

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if (msg) {
    document.getElementById('loginMsgBox').innerHTML = msg;
}



document.getElementById('guestLoginButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    window.location.href = './02summary.html'; // Redirect to guest login page
});