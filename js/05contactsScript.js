// let contacts [{
//     'alphabet': 'A',
//     'name': 'Anton Mayer',
//     'nameShort': 'AM',
//     'email': 'antom@gmail.com'
// },
// ];

// function addContacts() {
//     let popUpContent = document.getElementById('popUpContent');
//     popUpContent.innerHTML = '';
//     popUpContent.innerHTML = `
//     <div>
//         <div class="formContent">
//             <div class="leftSide">
//                 <img src="./img/logoPopUp.png" alt="JOIN Logo">
//                 <h1>Add contact</h1>
//                 <span>Tasks are better with a team!</span>
//         </div>
//         <div class="rightSide">
//             <img src="./img/contactIcon.png" alt="Contact icon">
//             <form>
//                 <input id="name" type="text" placeholder="Name" required>
//                 <input id="email" type="email" placeholder="Email" required>
//                 <input id="phone" type="tel" placeholder="Phone">
//             </form>
//         </div>
//     </div>
//     `;
//     document.getElementById('popUpContent').classList.remove('d-none');
// }

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

// // Sicherstellen, dass das DOM vollständig geladen ist, bevor Event-Listener hinzugefügt werden
// document.addEventListener('DOMContentLoaded', function () {
//     addEventListeners();
// });
