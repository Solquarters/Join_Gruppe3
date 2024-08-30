document.addEventListener("DOMContentLoaded", function() {
    // Simuliere eine Ladeverzögerung
    // document.body.style = "overflow-y: hidden;"
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Entferne den Preloader nach der Animation
        setTimeout(function() {
            document.getElementById('preloader').style.display = 'none';
            document.body.style = "overflow-y: auto;"
        }, 2000); // 1 Sekunde Verzögerung, um die CSS-Animation zu beenden
    }, 200);

    ////////IF LOCAL STORAGE NULL SET LOCAL STORAGE TO DEFAULT LOGINJSON
       let userLoginJson = localStorage.getItem('userLoginJson');
    if (!userLoginJson || userLoginJson === "[]" || userLoginJson === "{}") {
        userLoginJson = [{ accountName: "Guest", email: "guest@guest.com", password: "guestpassword", loggedIn: false }];
        localStorage.setItem('userLoginJson', JSON.stringify(userLoginJson));
    }

});


function login() {
    console.log(userLoginJson);
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
   
    let userIndex = userLoginJson.findIndex(u => u.email == email && u.password == password);
    
    if (userIndex !== -1) {
        document.getElementById('loginMsgBox').style.display = 'flex';
        document.getElementById('loginMsgBox').innerHTML = 'Login successful <div class="loader"></div>';
        document.getElementById('loginMsgBox').style.color = '#29ABE2';
        document.getElementById('loginMsgBox').style.border = '2px solid #29ABE2';

        for(let i= 0; i < userLoginJson.length; i++){
            userLoginJson[i].loggedIn = false;
        }
        userLoginJson[userIndex].loggedIn = true;
        // Save the updated userLoginJson array back to localStorage
        localStorage.setItem('userLoginJson', JSON.stringify(userLoginJson));

        // Add a delay of 3 seconds before redirecting
        setTimeout(function() {
            window.location.href = '02summary.html';
        }, 3000);

        return true;
    } else {
        document.getElementById('loginMsgBox').style.display = 'flex';
        document.getElementById('loginMsgBox').style.color = 'red';
        document.getElementById('loginMsgBox').innerHTML = "Invalid email or password";
        return false;
    }
}


const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if (msg) {
    document.getElementById('loginMsgBox').style.display = 'flex';
    document.getElementById('loginMsgBox').innerHTML = msg;
}


document.addEventListener('scroll', function() {
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    
    
    var container = document.getElementById("logoId");
    if (scrollY === 0) {
        container.style.opacity = "1";
    } else {
        container.style.opacity = "0";
    }
});


function guestLogin(event){
    event.preventDefault();
    document.getElementById('loginMsgBox').style.display = 'flex';
    document.getElementById('loginMsgBox').innerHTML = 'Login successful <div class="loader"></div>';
    document.getElementById('loginMsgBox').style.color = '#29ABE2';
    document.getElementById('loginMsgBox').style.border = '2px solid #29ABE2';

    userLoginJson[0].loggedIn = true;
    localStorage.setItem('userLoginJson', JSON.stringify(userLoginJson));

    // Add a delay of 3 seconds before redirecting
    setTimeout(function() {
        window.location.href = '02summary.html';
    }, 3000);
}


