let contactsJSON = [{
    'firstName': 'Anton',
    'lastName': 'Mayer',
    'phone': '+49 1573 1234567',
    'email': 'antom@gmail.com'
},
{
    'firstName': 'Anja',
    'lastName': 'Schulz',
    'phone': '+49 1521 2345678',
    'email': 'schulz@hotmail.com'
},
{
    'firstName': 'Benedikt',
    'lastName': 'Ziegler',
    'phone': '+49 1590 3456789',
    'email': 'benedikt@gmail.com'
},
{
    'firstName': 'David',
    'lastName': 'Eisenberg',
    'phone': '+49 1525 4567890',
    'email': 'davidberg@gmail.com'
},
{
    'firstName': 'Eva',
    'lastName': 'Fischer',
    'phone': '+49 1578 5678901',
    'email': 'eva@gmail.com'
},
{
    'firstName': 'Emmanuel',
    'lastName': 'Mauer',
    'phone': '+49 1512 6789012',
    'email': 'emmanuelma@gmail.com'
},
{
    'firstName': 'Marcel',
    'lastName': 'Bauer',
    'phone': '+49 160 7890123',
    'email': 'bauer@gmail.com'
},
{
    'firstName': 'Tatjana',
    'lastName': 'Wolf',
    'phone': '+49 162 8901234',
    'email': 'wolf@gmail.com'
}];

function renderContacts() {
    let contactsContent = document.getElementById('contactsContent');
    contactsContent.innerHTML = '';

    for (let i = 0; i < contactsJSON.length; i++) {
        let contactJSON = contactsJSON[i];
        contactsContent.innerHTML += /*html*/`
            <div class="contactsContentMain">
                <div class="underContainer">
                    <span class="alphabet">${contactJSON['lastName'].charAt(0).toUpperCase()}</span>
                    <div class="contactSeperator"></div>
                    <div class="underContactMain">
                        <span class="nameShortOne">${contactJSON['firstName'].charAt(0)}${contactJSON['lastName'].charAt(0)}</span>
                        <div class="selectContact">
                            <span>${contactJSON['firstName']} ${contactJSON['lastName']}</span>
                            <a href="mailto:${contactJSON['email']}">${contactJSON['email']}</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}


// Funktion zum Anzeigen des Popups
function addContacts() {
    document.getElementById('popUpContent').style.display = "flex";
}

function hideContacts() {
    document.getElementById('popUpContent').style.display = "none";
}

function contactsWindowsCancel() {
    document.getElementById('popUpContent').style.display = "none";
}










// // Funktion zum Hinzufügen der 'active' Klasse zum angeklickten Kontakt und Entfernen bei den anderen
// function selectContact(element) {
//     let items = document.querySelectorAll('.underContactMain, .underContactMain a, .underContactMainTwo');
//     items.forEach(function (item) {
//         item.classList.remove('active');
//     });
//     element.classList.add('active');
// }

// // Funktion zum Hinzufügen von Event-Listenern zu allen Kontaktelementen
// function addEventListeners() {
//     let items = document.querySelectorAll('.underContactMain, .underContactMain a, .underContactMainTwo');
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
