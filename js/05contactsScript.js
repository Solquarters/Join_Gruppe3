let contactsJSON = [{
    'firstName': 'Anton',
    'lastName': 'Mayer',
    'phone': '+49 1573 1234567',
    'email': 'antom@gmail.com',
    'profileRGB': 'rgb(50, 205, 50)'
},
{
    'firstName': 'Anja',
    'lastName': 'Schulz',
    'phone': '+49 1521 2345678',
    'email': 'schulz@hotmail.com',
    'profileRGB': 'rgb(173, 216, 230)'
},
{
    'firstName': 'Benedikt',
    'lastName': 'Ziegler',
    'phone': '+49 1590 3456789',
    'email': 'benedikt@gmail.com',
    'profileRGB': 'rgb(255, 0, 0)'
},
{
    'firstName': 'David',
    'lastName': 'Eisenberg',
    'phone': '+49 1525 4567890',
    'email': 'davidberg@gmail.com',
    'profileRGB': 'rgb(255, 165, 0)'
},
{
    'firstName': 'Eva',
    'lastName': 'Fischer',
    'phone': '+49 1578 5678901',
    'email': 'eva@gmail.com',
    'profileRGB': 'rgb(186, 85, 211)'
},
{
    'firstName': 'Emmanuel',
    'lastName': 'Mauer',
    'phone': '+49 1512 6789012',
    'email': 'emmanuelma@gmail.com',
    'profileRGB': 'rgb(255, 255, 0)'
},
{
    'firstName': 'Marcel',
    'lastName': 'Bauer',
    'phone': '+49 160 7890123',
    'email': 'bauer@gmail.com',
    'profileRGB': 'rgb(0, 255, 255)'
},
{
    'firstName': 'Tatjana',
    'lastName': 'Wolf',
    'phone': '+49 162 8901234',
    'email': 'wolf@gmail.com',
    'profileRGB': 'rgb(255, 192, 203)'
}];

load();

function renderContacts() {
    let contactsContent = document.getElementById('contactsContent');
    contactsContent.innerHTML = '';

    for (let i = 0; i < contactsJSON.length; i++) {
        let contactJSON = contactsJSON[i];
        contactsContent.innerHTML += /*html*/`
        <div id="contactsId" class="underContainer">
            <span class="alphabet">${contactJSON['lastName'].charAt(0).toUpperCase()}</span>
            <div class="contactSeperator"></div>
            <div onclick="renderContactsInfo(${i}, this)" class="underContactMain">
                <span class="nameShortOne" style="background-color: ${getProfileRGB(i)};">${contactJSON['firstName'].charAt(0)}${contactJSON['lastName'].charAt(0)}</span>
                <div class="selectContact">
                    <span>${contactJSON['firstName']} ${contactJSON['lastName']}</span>
                    <a href="#">${contactJSON['email']}</a>
                </div>
            </div>
        </div>
        `;
    }
}

function renderContactsInfo(index, divElement) {

    // document.querySelectorAll('.active').forEach(function(element) {
    //     element.classList.remove('active');
    // });

    ///hier css classe "active" hinzufügen
    // divElement.classList.add('') 


    let showContactsInfo = document.getElementById('showContactsInfo');
    showContactsInfo.innerHTML = '';

    showContactsInfo.innerHTML = /*html*/`
    <div>
        <div class="nameEditDelete">
            <span class="nameShortScript" style="background-color: ${getProfileRGB(index)};">${contactsJSON[index]['firstName'].charAt(0)}${contactsJSON[index]['lastName'].charAt(0)}</span>
            <div class="nameEditDeleteMain">
                <div class="nameContainer">
                    <span><b>${contactsJSON[index]["firstName"]}</b></span>
                    <span><b>${contactsJSON[index]["lastName"]}</b></span>
                </div>
                <div class="editDelete">
                    <button onclick="editContact(${index})" class="editButton">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                        </svg>Edit</button>
                    <button onclick="deleteContacts(${index})" class="deleteButton">    
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.0958333 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
                        </svg>Delete</button>
                </div>
            </div>
        </div>
        <div class="contactEmailPhoneContainer">
            <span class="informationTxt">Contact Information</span>
            <div class="emailContainer">
                <span><b>Email</b></span>
                <a href="mailto:${contactsJSON[index].email}">${contactsJSON[index].email}</a>
            </div>
            <div class="phoneContainer">
                <span><b>Phone</b></span>
                <a href="tel:${contactsJSON[index].phone}">${contactsJSON[index].phone}</a>
            </div>
        </div>
    </div>
    <div class="callDropDownMenuContainer d-none">
        <button onclick="callDropDownMenu()" class="callDropDownMenu">
            <div class="point"></div>
            <div class="pointCenter"></div>
            <div class="pointLast"></div>
        </button>
    </div>
    <div id="dropDownMenu" class="dropDownMenu d-none">
        <div class="dropDownUnderMenu">
            <button onclick="editContact(${index})" class="editButtonSame">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                </svg>Edit</button>
            <button onclick="deleteContacts(${index})" class="deleteButtonSame">    
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.0958333 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
                </svg>Delete</button>
        </div>
    </div>
    `;
    if (window.innerWidth < 1285) {
        document.getElementById('addContactsMain').classList.add('d-none');
        document.getElementById('showContactsText').style.display = 'block';
    } else {
        document.getElementById('addContactsMain').classList.remove('d-none');
        document.getElementById('showContactsText').style.display = 'block';
    }
}

function getProfileRGB(i) {
    return contactsJSON[i].profileRGB;
}

function createContact() {
    let fullName = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    // Get first and last name from the full name input
    let nameParts = fullName.split(' ');
    let firstName = nameParts[0];
    let lastName = "";
    if (nameParts.length > 1) {
        lastName = nameParts.slice(1).join(' ');
    }
    // Generate a random color for the profileRGB
    let profileRGB = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    // Create a new contact object
    let newContact = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        profileRGB: profileRGB
    };
    contactsJSON.push(newContact);
    renderContacts();
    hideContacts();
    save();
}

// Function for show a Pop Up window
function addContacts() {
    let popUp = document.getElementById('popUpContent');
    popUp.style.display = 'flex'; // Ensure display is set to flex before adding active class
    popUp.classList.remove('inactive');
    popUp.classList.add('active');
}

function callDropDownMenu() {
    let dropDown = document.getElementById('dropDownMenu');
    dropDown.style.display = 'flex';
    dropDown.classList.add('active');
    dropDown.classList.remove('inactive');
    document.addEventListener('click', function (event) {
        let isClickInside = dropDown.contains(event.target) || event.target.matches('button[onclick="callDropDownMenu()"]');
        if (!isClickInside) {
            dropDown.classList.remove('active');
            dropDown.classList.add('inactive');
            dropDown.addEventListener('animationend', function () {
                dropDown.style.display = 'none';
            }, { once: true });
        }
    });
    document.querySelector('button[onclick="callDropDownMenu()"]').addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

// function closeDropDownMenu() {
//     document.getElementById('dropDownMenu').classList.add('d-none');
//     console.log('funktioniert');
// }

function hideContacts() {
    let popUp = document.getElementById('popUpContent');
    popUp.classList.remove('active');
    popUp.classList.add('inactive');
    setTimeout(() => popUp.style.display = 'none', 300); // Adjust the timeout to match the slideOut animation duration
}

function contactsWindowsCancel() {
    // Close the modal
    let popUp = document.getElementById('popUpContent');
    popUp.classList.remove('active');
    popUp.classList.add('inactive');
    popUp.style.display = 'none';

    // Reset the form
    resetEditForm();
    editingIndex = null; // Reset editingIndex after cancelling
}

function editContact(index) {
    // Open the modal
    let popUp = document.getElementById('popUpContent');
    popUp.style.display = 'flex'; // Ensure display is set to flex before adding active class
    popUp.classList.remove('inactive');
    popUp.classList.add('active');

    // Find the contact by index and pre-fill the form
    let editingContact = findContactByIndex(index);
    if (editingContact) {
        document.getElementById('name').value = editingContact.firstName + ' ' + editingContact.lastName;
        document.getElementById('email').value = editingContact.email;
        document.getElementById('phone').value = editingContact.phone;
    }
}

// Function to find a contact by index
function findContactByIndex(index) {
    return contactsJSON[index];
}

function resetEditForm() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
}

function backStep() {
    if (window.innerWidth < 1285) {
        document.getElementById('showContactsText').style.display = 'none';
    }
    document.getElementById('addContactsMain').classList.remove('d-none');
}

let isBelowThreshold = false; // Flag, um den Zustand zu verfolgen

window.addEventListener('resize', changeWidth);

function changeWidth() {
    if (window.innerWidth >= 1285 && isBelowThreshold) {
        document.getElementById('addContactsMain').classList.remove('d-none');
        document.getElementById('showContactsText').style.display = 'block';
        isBelowThreshold = false;
    } else if (window.innerWidth < 1285 && !isBelowThreshold) {
        document.getElementById('addContactsMain').classList.remove('d-none');
        document.getElementById('showContactsText').style.display = 'none';
        isBelowThreshold = true;
    }
}

function deleteContacts(index) {
    contactsJSON.splice(index, 1);

    let showContactsInfo = document.getElementById('showContactsInfo');
    showContactsInfo.innerHTML = '';

    if (window.innerWidth < 1285) {
        document.getElementById('showContactsText').style.display = 'none';
        document.getElementById('addContactsMain').classList.remove('d-none');
    }
    renderContacts();
    save();
}

function save() {
    let contactsJSONAsText = JSON.stringify(contactsJSON);
    localStorage.setItem('contactsJSON', contactsJSONAsText);
}

function load() {
    let contactsJSONAsText = localStorage.getItem('contactsJSON');
    if (contactsJSONAsText) {
        contactsJSON = JSON.parse(contactsJSONAsText);
        renderContacts();
    }
}
///////////////////////////////////////////
// Vergleichsfunktion für Strings
// function compareStrings(a, b) {
//     // Annahme: Case-insensitive Vergleich
//     a = a.toLowerCase();
//     b = b.toLowerCase();

//     return (a < b) ? -1 : (a > b) ? 1 : 0;
// }

// // Kontakte nach Vornamen sortieren
// contactsJSON.sort(function (a, b) {
//     return compareStrings(a.firstName, b.firstName);
// });

// ///////////////////////////////////////////////

// // Sortieren der Kontakte nach dem Vornamen
// contactsJSON.sort(function(a, b) {
//     return a.firstName.localeCompare(b.firstName);
// });

// // Vergleichsfunktion für Strings
// function compareStrings(a, b) {
//     // Annahme: Case-insensitive Vergleich
//     a = a.toLowerCase();
//     b = b.toLowerCase();

//     return a.localeCompare(b); // Direkter Vergleich für die Sortierung
// }












// // Funktion zum Hinzufügen der 'active' Klasse zum angeklickten Kontakt und Entfernen bei den anderen
// function selectContact(element) {
//     let items = document.querySelectorAll('.underContactMain.active');
//     items.forEach(function (item) {
//         item.classList.remove('active');
//     });
//     element.classList.add('active');
// }

// // Funktion zum Hinzufügen von Event-Listenern zu allen Kontaktelementen
// function addEventListeners() {
//     let items = document.querySelectorAll('.underContactMain.active');
//     items.forEach(function (item) {
//         item.addEventListener('click', function (event) {
//             event.stopPropagation();
//             selectContact(item);
//         });
//     });

//     document.addEventListener('click', function () {
//         items.forEach(function (item) {
//             item.classList.remove('active');
//         });
//     });
// }