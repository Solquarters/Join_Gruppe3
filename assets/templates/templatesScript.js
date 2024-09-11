function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4) {
                  if (this.status == 200) {
                      elmnt.innerHTML = this.responseText;

                      // Directly trigger the user initials update after HTML is loaded
                      updateUserInitials();
                      showActiveSiteinSidebar();

                  }
                  if (this.status == 404) {
                      elmnt.innerHTML = "Page not found.";
                  }
                  elmnt.removeAttribute("w3-include-html");
              }
          }
          xhttp.open("GET", file, true);
          xhttp.send();
          return;
      }
  }
}

function updateUserInitials() {
  var userCircle = document.getElementById("currentUserCircleId");
  if (userCircle) {
      let userIndex = userLoginJson.findIndex(u => u.loggedIn === true);
      //If logged in user is not guest then get initials for account circle display
      if (userIndex > 0) {
          let userNameInitial1 = userLoginJson[userIndex].accountName?.charAt(0).toUpperCase() ?? '';
          let userNameInitial2 = userLoginJson[userIndex].email?.charAt(0).toUpperCase() ?? '';
          let nameParts = userLoginJson[userIndex].accountName.split(' ');
          if (nameParts.length > 1) {
              userNameInitial1 = nameParts[0].charAt(0).toUpperCase();
              userNameInitial2 = nameParts[1].charAt(0).toUpperCase();
          }
          userCircle.innerHTML = userNameInitial1 + userNameInitial2;
          //if logged user is guest, found index will be 0
      } else {
          userCircle.innerHTML = "G";
      }
  }
}


  
  function openAccountMenu() {
    let menu = document.getElementById('accountMenuDivId');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex'; // Show the element before triggering the transition
        setTimeout(function() {
            menu.classList.add('open');
        }, 10); // Small timeout to ensure the display:block takes effect
    } else {
        menu.classList.remove('open');
        setTimeout(function() {
            menu.style.display = 'none';
        }, 500); // Match the duration of the CSS transition to hide after it slides out
    }
}

function closeMenuIfClickedOutside(event) {
    let menu = document.getElementById('accountMenuDivId');
    let toggleButton = document.getElementById('currentUserCircleId'); // Assuming you have a button to open/close the menu
    if (menu.style.display === 'flex' && !menu.contains(event.target) && !toggleButton.contains(event.target)) {
        openAccountMenu(); // Close the menu if clicked outside
    }
}

// Event listener for clicks (for desktop)
document.addEventListener('click', function(event) {
    closeMenuIfClickedOutside(event);
});

// Event listener for touchstart (for mobile)
document.addEventListener('touchstart', function(event) {
    closeMenuIfClickedOutside(event);
});




function showActiveSiteinSidebar(){
    // Get the current URL path
    const currentPath = window.location.pathname;

    // Select all the anchor tags inside the sidebar container
    const navLinks = document.querySelectorAll('.sideBarNavigationDivClass a');

    // Iterate through each anchor tag
    navLinks.forEach(link => {
      // Get the href attribute from each anchor tag
      const href = link.getAttribute('href');

      // Check if the current URL path contains the href value (ignoring any query params)
      if (currentPath.includes(href)) {
        // Add style to the parent div to change the background
        link.querySelector('.navLinksClass').style.background= '#455a75'; 
      }
    });
}



