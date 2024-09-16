document.addEventListener("DOMContentLoaded", function () {
  // Simulate a loading time
  setTimeout(function () {
    document.body.classList.add("loaded");

    // remove preloader after animation
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
      document.body.style = "overflow-y: auto;";
    }, 2000); // 1 sec delay to end the css animation
  }, 200);

  // Check if localStorage data is missing or invalid
  if (!Array.isArray(userLoginJson) || userLoginJson.length === 0) {
    setGuestAccountToLocalStorage();
  }

  let loggedInUserIndex = findLoggedInUserIndex(userLoginJson);
  returnAlreadyLoggedInHTML(loggedInUserIndex);
});

async function setGuestAccountToLocalStorage() {
  userLoginJson = defaultGuestAccount; // Reset global variable
  await localStorage.setItem("userLoginJson", JSON.stringify(userLoginJson));
}

document.addEventListener("scroll", function () {
  let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  let container = document.getElementById("logoId");
  container.style.opacity = scrollY === 0 ? "1" : "0";
});

function login() {
  console.log(userLoginJson);
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let userIndex = userLoginJson.findIndex(
    (u) => u.email == email && u.password == password
  );

  if (userIndex !== -1) {
    document.getElementById("loginMsgBox").style.display = "flex";
    document.getElementById("loginMsgBox").innerHTML =
      'Login successful <div class="loader"></div>';
    document.getElementById("loginMsgBox").style.color = "#29ABE2";
    document.getElementById("loginMsgBox").style.border = "2px solid #29ABE2";

    for (let i = 0; i < userLoginJson.length; i++) {
      userLoginJson[i].loggedIn = false;
    }
    userLoginJson[userIndex].loggedIn = true;
    // Save the updated userLoginJson array back to localStorage
    localStorage.setItem("userLoginJson", JSON.stringify(userLoginJson));

    // Add a delay of 3 seconds before redirecting
    setTimeout(function () {
      window.location.href = "02summary.html";
    }, 3000);

    return true;
  } else {
    document.getElementById("loginMsgBox").style.display = "flex";
    document.getElementById("loginMsgBox").style.color = "red";
    document.getElementById("loginMsgBox").innerHTML =
      "Invalid email or password";
    return false;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get("msg");
if (msg) {
  document.getElementById("loginMsgBox").style.display = "flex";
  document.getElementById("loginMsgBox").innerHTML = msg;
}

function guestLogin(event) {
  event.preventDefault();
  document.getElementById("loginMsgBox").style.display = "flex";
  document.getElementById("loginMsgBox").innerHTML =
    'Login successful <div class="loader"></div>';
  document.getElementById("loginMsgBox").style.color = "#29ABE2";
  document.getElementById("loginMsgBox").style.border = "2px solid #29ABE2";

  userLoginJson[0].loggedIn = true;
  localStorage.setItem("userLoginJson", JSON.stringify(userLoginJson));

  // Add a delay of 3 seconds before redirecting
  setTimeout(function () {
    window.location.href = "02summary.html";
  }, 3000);
}

function findLoggedInUserIndex(userLoginJson) {
  // Loop through the array and find the first object with loggedIn set to true
  for (let i = 0; i < userLoginJson.length; i++) {
    if (userLoginJson[i].loggedIn === true) {
      return i; // Return the index if found
    }
  }
  return -1; // Return -1 if no loggedIn user is found
}

function returnAlreadyLoggedInHTML(loggedInUserIndex) {
  if (loggedInUserIndex !== -1) {
    //logged in as
    document.getElementById("overlapMainContId").innerHTML = /*html*/ `
        <p style="font-size: 20px; margin: 16px 0px 0px 0px;">You are already logged in as:</p>
        <p style="font-size: 20px; font-weight: 700;">${userLoginJson[loggedInUserIndex].accountName}</p>
        <a href="02summary.html"><button class="logo-in-button">Go to startpage</button><br></a> 
        <button onclick=logout() class="logo-in-button" style="background-color: red; margin: 0px 0px 16px 0px;">Logout</button>
        `;
  }
}
