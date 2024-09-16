document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const privacyCheckbox = document.getElementById("privacyCheckbox");
  const signUpButton = document.getElementById("signUpButton");
  const msgBox = document.getElementById("msgBox");

  function validateForm() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const privacyChecked = privacyCheckbox.checked;

    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      privacyChecked &&
      password === confirmPassword
    ) {
      signUpButton.disabled = false;
      msgBox.innerHTML = ""; // Clear any messages
    } else {
      signUpButton.disabled = true;
      if (password !== confirmPassword) {
        msgBox.innerHTML = "Passwords do not match";
      }
    }
  }

  nameInput.addEventListener("name", validateForm);
  emailInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);
  confirmPasswordInput.addEventListener("input", validateForm);
  privacyCheckbox.addEventListener("change", validateForm);
});

function saveUsers() {
  localStorage.setItem("userLoginJson", JSON.stringify(userLoginJson));
}

function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let privacyCheckbox = document.getElementById("privacyCheckbox").checked;

  if (!privacyCheckbox) {
    document.getElementById("msgBox").style.display = "flex";
    document.getElementById("msgBox").innerHTML =
      "You must accept the privacy policy";
    return false;
  }

  if (password !== confirmPassword) {
    document.getElementById("msgBox").style.display = "flex";
    document.getElementById("msgBox").innerHTML = "Passwords do not match";
    return false;
  }

  if (userLoginJson.some((user) => user.email === email)) {
    document.getElementById("msgBox").style.display = "flex";
    document.getElementById("msgBox").innerHTML = "Email already registered";
    return false;
  }

  userLoginJson.push({
    accountName: name,
    email: email,
    password: password,
    loggedIn: false,
  });
  saveUsers();
  window.location.href = "07logIn.html?msg=Signed up successfully";
  return true;
}
