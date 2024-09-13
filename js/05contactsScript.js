let oldLetter = '#';
let newLetter = 'A';
let editingIndex = null; // Added to track editing index

async function initContactSite(){
    try {
        contactsJSON = await loadData("/contactsJson");

    } catch (error) {
        console.error('Error loading data:', error);
    }
    finally{
        contactsJSON = sortContactsByFirstName(contactsJSON);
        await putData("/contactsJson", contactsJSON);
        renderContacts();
    }
}

function save() {
    let contactsJSONAsText = JSON.stringify(contactsJSON);
    localStorage.setItem('contactsJSON', contactsJSONAsText);
}

function renderContacts() {
    let contactsContent = document.getElementById('contactsContent');
    contactsContent.innerHTML = '';

    for (let i = 0; i < contactsJSON.length; i++) {

        let contactJSON = contactsJSON[i];

        contactsContent.innerHTML += /*html*/`
        <div id="contactsId" class="underContainer">
            ${returnAlphabeticalSeperator(i)}
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

    document.querySelectorAll('.active').forEach(function (element) {
        element.classList.remove('active');
    });

    divElement.classList.add('active');

    updateContactsInfoHTML(index);
}

function updateContactsInfoHTML(index){
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

function returnAlphabeticalSeperator(i) {

    newLetter = contactsJSON[i]['firstName'].charAt(0).toUpperCase();

    if (oldLetter !== newLetter) {
        oldLetter = newLetter;

        return `
        <span class="alphabet">${contactsJSON[i]['firstName'].charAt(0).toUpperCase()}</span>
        <div class="contactSeperator"></div>
        `;
    }
    else {
        return ``;
    }
}

function sortContactsByFirstName(JSONARRAY) {
    return JSONARRAY.sort((a, b) => {
        if (a.firstName < b.firstName) {
            return -1;
        }
        if (a.firstName > b.firstName) {
            return 1;
        }
        return 0;
    });
}

function getProfileRGB(i) {
    return contactsJSON[i].profileRGB;
}

async function createContact(){
    let fullName = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();

    // Check whether a contact already exists with this email
    let emailExists = contactsJSON.some((contact, index) => contact.email === email && index !== editingIndex);

    if (emailExists) {
        alert("Diese E-Mail-Adresse existiert bereits, verwenden Sie bitte eine andere E-Mail-Adresse");
    } else {
        // Get first and last name from the full name input
        let nameParts = fullName.split(' ');

        //////new contact wont create when only one name string is inputted!! ///////
        let firstName = nameParts[0];
        let lastName = '';
        if(nameParts.length > 1){
            lastName = nameParts.slice(1).join(' ');
        }
       
        

        if (editingIndex !== null) {
            // Update existing contact
            contactsJSON[editingIndex] = {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                profileRGB: contactsJSON[editingIndex].profileRGB // Keep the existing color
            };
            await putData("/contactsJson", contactsJSON);

            editingIndex = null; // Reset editing index after saving
        } else {
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
            contactsJSON = sortContactsByFirstName(contactsJSON);


            await putData("/contactsJson", contactsJSON);
        }
        renderContacts();
        hideContacts();
    }
}

// Function for show a Pop Up window
function addContacts() {
    resetEditForm();
    let popUp = document.getElementById('popUpContent');
    popUp.style.display = 'flex'; // Ensure display is set to flex before adding active class
    popUp.classList.remove('inactive');
    popUp.classList.add('active');
    document.querySelector('.addContacts').style.display = 'flex';
}

function callDropDownMenu() {
    let dropDown = document.getElementById('dropDownMenu');
    dropDown.style.display = 'flex';
    dropDown.classList.add('active');
    dropDown.classList.remove('inactive');

    function closeDropdown(event) {
        if (!dropDown.contains(event.target) && !event.target.closest('button[onclick="callDropDownMenu()"]')) {
            dropDown.classList.remove('active');
            dropDown.classList.add('inactive');
            dropDown.addEventListener('animationend', () => {
                dropDown.style.display = 'none';
            }, { once: true });
            document.removeEventListener('click', closeDropdown);
        }
    }

    document.addEventListener('click', closeDropdown);
    document.querySelector('button[onclick="callDropDownMenu()"]').addEventListener('click', event => event.stopPropagation());
}



function hideContacts() {
    let popUp = document.getElementById('popUpContent');
    popUp.classList.remove('active');
    popUp.classList.add('inactive');
    setTimeout(() => popUp.style.display = 'none', 600); // Adjust the timeout to match the slideOut animation duration
}

function contactsWindowsCancel(event) {
    event.preventDefault();
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
    currentIndex = index;
    let contact = contactsJSON[index];

    // Filling the form with the contact's information
    document.getElementById('name').value = `${contact.firstName} ${contact.lastName}`;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;

    // Set the background color of the initials span
    let initialsElement = document.querySelector('.nameShortScript');
    initialsElement.style.backgroundColor = contact.profileRGB;

    // Change the visibility of the buttons
    document.querySelector('.createContact').style.display = 'none';
    document.querySelector('.saveContact').style.display = 'flex';
    document.querySelector('.editDeleteContact').style.display = 'flex';
    document.querySelector('.addContactCancel').style.display = 'none';

    //Set the submit handler to the save function for the edited contact
    document.querySelector('form').onsubmit = function () {
        saveEditedContact(index);
        return false;
    };

    // Open the modal
    let popUp = document.getElementById('popUpContent');
    popUp.style.display = 'flex'; // Ensure display is set to flex before adding active class
    popUp.classList.remove('inactive');
    popUp.classList.add('active');

    renderContacts();
}

function editDeleteContact() {
    deleteContacts();
    renderContacts();
}

// Change Contacte
async function saveEditedContact(index) {
    // Get the edited information from the form
    let name = document.getElementById('name').value.trim().split(' ');
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();

    // Ensure that the name array has at least two parts (first and last name)
    if (name.length < 2) {
        alert('Bitte geben Sie sowohl den Vor- als auch den Nachnamen ein.');
        return;
    }

    // Update the contact in the list
    contactsJSON[index] = {
        'firstName': name[0],
        'lastName': name.slice(1).join(' '), // Join remaining parts as last name
        'phone': phone,
        'email': email,
        'profileRGB': contactsJSON[index].profileRGB // Keep the original color
    };

    await putData("/contactsJson", contactsJSON);

    // Reset the visibility of the buttons
    document.querySelector('.createContact').style.display = 'flex';
    document.querySelector('.saveContact').style.display = 'none';
    document.querySelector('.editDeleteContact').style.display = 'none';

    // Close Pop Up
    let popUp = document.getElementById('popUpContent');
    popUp.style.display = 'none';
    popUp.classList.remove('active');
    popUp.classList.add('inactive');

    renderContacts();
    resetEditForm();
    updateContactsInfoHTML(index);

    alert('Änderungen wurden gespeichert.');
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

    ////////////Hier alle active "underContactMain active" entfernen 
    const elements = document.querySelectorAll('.underContactMain.active');
    // Loop through each element and remove the 'active' class
    elements.forEach(function(element) {
        element.classList.remove('active');
    });
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

async function deleteContacts(index) {
    contactsJSON.splice(index, 1);
    await putData("/contactsJson", contactsJSON);

    let showContactsInfo = document.getElementById('showContactsInfo');
    showContactsInfo.innerHTML = '';

    if (window.innerWidth < 1285) {
        document.getElementById('showContactsText').style.display = 'none';
        document.getElementById('addContactsMain').classList.remove('d-none');
    }
    renderContacts();

    alert('Kontakt erfolgreich gelöscht!');
}



