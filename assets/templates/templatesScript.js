function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;

              ///Added own functionality to render user initials to Header Sidebar Account Circle
              ///////Circle Initial wait to render functionality START /////
              var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === "childList") {
                        var userCircle = document.getElementById("currentUserCircleId");
                        if (userCircle) {
                            userCircle.innerHTML = "G"; // Change to the desired content
                            let userIndex = userLoginJson.findIndex(u => u.loggedIn === true);
                            if (userIndex > 0 ) {
                                let userNameInitial1 = userLoginJson[userIndex].accountName?.charAt(0).toUpperCase() ?? '';
                                let userNameInitial2 = userLoginJson[userIndex].email?.charAt(0).toUpperCase() ?? '';
                                let nameParts = userLoginJson[userIndex].accountName.split(' ');
                                if (nameParts.length > 1) {
                                  userNameInitial1 = nameParts[0].charAt(0).toUpperCase();
                                  userNameInitial2 = nameParts[1].charAt(0).toUpperCase();
                              } 
                                userCircle.innerHTML = userNameInitial1 + userNameInitial2;
                            }
                            observer.disconnect(); // Stop observing after the change
                        }
                    }
                });
            });
            observer.observe(document.body, { childList: true, subtree: true });
             ///////Circle Initial wait to render functionality END/////

            }
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }
  



