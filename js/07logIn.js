document.addEventListener("DOMContentLoaded", function() {
    // Simuliere eine Ladeverzögerung
    document.body.style = "overflow-y: hidden;"
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Entferne den Preloader nach der Animation
        setTimeout(function() {
            document.getElementById('preloader').style.display = 'none';
            document.body.style = "overflow-y: auto;"
        }, 2000); // 1 Sekunde Verzögerung, um die CSS-Animation zu beenden
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














// ///Logo Overlap 
// function isOverlapping(container, otherElement) {
//     const containerRect = container.getBoundingClientRect();
//     const otherRect = otherElement.getBoundingClientRect();

//     return !(
//         containerRect.right < otherRect.left ||
//         containerRect.left > otherRect.right ||
//         containerRect.bottom < otherRect.top ||
//         containerRect.top > otherRect.bottom
//     );
// }

// function checkOverlap() {
//     const container = document.getElementById('overlapMainContId');
//     const otherElement = document.getElementById('logoId');

//     if (isOverlapping(container, otherElement)) {
//         otherElement.style.opacity = '0'; // Fade out
//     } else {
//         otherElement.style.opacity = '1'; // Fade in
//     }
// }

// // Attach event listeners for scroll and resize
// window.addEventListener('scroll', checkOverlap);
// window.addEventListener('resize', checkOverlap);

// // Initial check in case elements are already overlapping on page load
// document.addEventListener('DOMContentLoaded', () => {
//     checkOverlap();
// });

document.addEventListener('scroll', function() {
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    console.log('Scroll event triggered, scrollY:', scrollY);
    
    var container = document.getElementById("logoId");
    if (scrollY === 0) {
        container.style.opacity = "1";
    } else {
        container.style.opacity = "0";
    }
});