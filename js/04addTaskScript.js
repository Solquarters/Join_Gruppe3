let initialHeight;
let initialY;

// Create a set to store the IDs of the added elements: AssignedTo Dropdown SpanId Set
let addedIDs = new Set();

let inEditCardMode = true;

//Global single task/card Object, when submitting addTask or submit edit a card in board this is getting pushed to toDoCardsJSON
let temporaryNewTaskSingleCardObject = {
  title: "Title temp array",
  description: "XXXXX",
  assignedToArray: [
    // {assignedFullName:"Stefan Schulz", assignedRGB:"rgb(0,170,0)"},
    //  {assignedFullName:"Claudia Müller", assignedRGB:"rgb(190,0,0)"},
  ],
  dueDate: "2028-10-10",
  prio: "Low",
  category: "User Story",
  subtaskJson: [
    { subtaskText: "XXXTempSubtask0-1asdfasdfasdasdf", subtaskDone: false },
    { subtaskText: "AAATempSubtask0-2", subtaskDone: true },
    { subtaskText: "TempSubtask0-3", subtaskDone: true },
    { subtaskText: "TempSubtask0-4", subtaskDone: false },
  ],
  toDoStatus: "In Progress",
};

function emptyTempJson() {
  temporaryNewTaskSingleCardObject = {
    title: "",
    description: "",
    assignedToArray: [],
    dueDate: "",
    prio: "Medium",
    category: "Select a Category",
    subtaskJson: [],
    toDoStatus: "To do",
  };
  addedIDs.clear();
}

async function initAddTaskSite() {
  try {
    toDoCardsJSON = await loadData("/toDoJson");
    contactsJSON = await loadData("/contactsJson");
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    inBoardAddTask = false;
    emptyTempJson();
    renderContactsDropdownMenuContent();
    setCurrentDateInputMinValue();
    renderProfileCirclesFromTempArray();
    renderSubtaskFromTempArray();
    renderAddTaskSiteFromTempArray();
  }
}

function searchContactsDropdown() {
  let searchInput = document.getElementById("contactsInputId").value;
  document.getElementById("dropdownContactAssignId").innerHTML = "";
  if (searchInput == "") {
    ///Render all contacts
   
    renderContactsDropdownMenuContent();
    return;
  }
  searchInput = searchInput.toLowerCase();
  //If searching for contacts, all already selected contacts stay selected
  for (let i = 0; i < contactsJSON.length; i++) {
    if (getFullNameStringFromContacts(i).toLowerCase().includes(searchInput)) {
      if (contactAtIndexIsInsideTempArray(i)) {
        document.getElementById("dropdownContactAssignId").innerHTML +=
          returnAssignContactsDropdownSELECTEDHTML(i);
        setStylingForSelectedContact(i);
        addedIDs.add(`fistNameLastNameSpanId${i}`);
      } else {
        document.getElementById("dropdownContactAssignId").innerHTML +=
          returnAssignContactsDropdownHTML(i);
      }
    }
  }
}

function renderAddTaskSiteFromTempArray() {
  //RENDER ALL ATTRIBUTES FROM TEMP ARRAY TO ADD TASK SITE
  document.getElementById("titleInputId").value =
    temporaryNewTaskSingleCardObject["title"];
  document.getElementById("descriptionTextAreaId").value =
    temporaryNewTaskSingleCardObject["description"];
  document.getElementById("datePickerInputId").value =
    temporaryNewTaskSingleCardObject["dueDate"];
  setPrioFromTempArray();
  setDropdownSelectionFromTempArray();
  renderContactsDropdownMenuContent();
  setCurrentDateInputMinValue();
  renderProfileCirclesFromTempArray();
  renderSubtaskFromTempArray();
}

function setDropdownSelectionFromTempArray() {
  const selectElement = document.getElementById(
    "categoryDropdownPlaceholderId"
  );
  selectElement.innerText = temporaryNewTaskSingleCardObject.category;

  if (temporaryNewTaskSingleCardObject.category == "Select a Category") {
    document
      .getElementById("categorySelectId")
      .style.setProperty("color", "gray", "important");
  } else {
    document
      .getElementById("categorySelectId")
      .style.setProperty("color", "black", "important");
  }
}

function setPrioFromTempArray() {
  let switchExpression = temporaryNewTaskSingleCardObject["prio"];
  switch (switchExpression) {
    case "Urgent":
      setPriority("prioButtonId1", "prioIconfillId1", "prioIconfillId2");
      break;
    case "Medium":
      setPriority("prioButtonId2", "prioIconfillId3", "prioIconfillId4");
      break;
    case "Low":
      setPriority("prioButtonId3", "prioIconfillId5", "prioIconfillId6");
      break;
  }
}

function renderContactsDropdownMenuContent() {
  document.getElementById("dropdownContactAssignId").innerHTML = "";

  ///Render all contacts unselected
  if (!inEditCardMode) {
    for (let i = 0; i < contactsJSON.length; i++) {
      document.getElementById("dropdownContactAssignId").innerHTML +=
        returnAssignContactsDropdownHTML(i);
    }
    return;
  }

  for (let i = 0; i < contactsJSON.length; i++) {
    if (contactAtIndexIsInsideTempArray(i)) {
      document.getElementById("dropdownContactAssignId").innerHTML +=
        returnAssignContactsDropdownSELECTEDHTML(i);
      setStylingForSelectedContact(i);
      addedIDs.add(`fistNameLastNameSpanId${i}`);
    } else {
      document.getElementById("dropdownContactAssignId").innerHTML +=
        returnAssignContactsDropdownHTML(i);
    }
  }
}

function contactAtIndexIsInsideTempArray(i) {
  if (temporaryNewTaskSingleCardObject.assignedToArray) {
    for (
      let j = 0;
      j < temporaryNewTaskSingleCardObject.assignedToArray.length;j++) {
      if (temporaryNewTaskSingleCardObject.assignedToArray[j].assignedFullName ==
        getFullNameStringFromContacts(i)) {
        return true;
      }
    }
  }
  return false;
}

function returnAssignContactsDropdownHTML(i) {
  return /*html*/ `
    <div onclick="selectContactAndPushToTemporaryArray(this, 'fistNameLastNameSpanId${i}', ${i})">
        <span class="circleAndNameSpanClass">
            <!-- InitialsCircle -->
            <span class="contactSvgCircleClass" id="fistNameLastNameSpanId${i}" style="background-color: ${getProfileRGB(i)};">${getNameInitials(i)}</span>
            <!-- Full contact name -->
            <span>${getFullNameStringFromContacts(i)}</span>
        </span>
        <svg class="checkbox" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" rx="4" ry="4"/>
            <path class="checkbox-unchecked" d="M5 5 H19 V19 H5 Z" />
            <path class="checkbox-checked" d="M7 13.5l3 3l7-7L14.5 8L10 12.5L8.5 11L7 13.5z" />
        </svg>
    </div>
    `;
}

function returnAssignContactsDropdownSELECTEDHTML(i) {
  return /*html*/ `
    <div id="assignedDropdownSingleLineDivId${i}" onclick="selectContactAndPushToTemporaryArray(this, 'fistNameLastNameSpanId${i}', ${i})" class="selected">
        <span class="circleAndNameSpanClass">
            <!-- InitialsCircle -->
            <span class="contactSvgCircleClass" id="fistNameLastNameSpanId${i}" style="background-color: ${getProfileRGB(i)};">${getNameInitials(i)}</span>
            <!-- Full contact name -->
            <span>${getFullNameStringFromContacts(i)}</span>
        </span>
        <svg class="checkbox" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" rx="4" ry="4"/>
            <path class="checkbox-unchecked" d="M5 5 H19 V19 H5 Z" />
            <path class="checkbox-checked" d="M7 13.5l3 3l7-7L14.5 8L10 12.5L8.5 11L7 13.5z" />
        </svg>
    </div>
    `;
}

function setStylingForSelectedContact(i) {
  let element = document.getElementById(`assignedDropdownSingleLineDivId${i}`);
  let checkboxChecked = element.querySelector(".checkbox-checked");
  let checkboxUnchecked = element.querySelector(".checkbox-unchecked");
  checkboxChecked.style.display = "block";
  checkboxUnchecked.style.display = "none";
}

function getNameInitials(i) {
  let firstInitial = contactsJSON[i].firstName.charAt(0).toUpperCase();
  let lastInitial = contactsJSON[i].lastName.charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}

function getProfileRGB(i) {
  return contactsJSON[i].profileRGB;
}

function stopResize() {
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}

// Auto Resize main input field
function autoResize(idName) {
  const inputTextArea = document.getElementById(idName);
  inputTextArea.style.height = "auto";
  inputTextArea.style.height = inputTextArea.scrollHeight + 10 + "px";
}

// Call whenever a task is created
function resetTextAreaSize(idName, height) {
  inputTextArea = document.getElementById(idName);
  inputTextArea.style.height = height + "px";
}

function resetPrioButtons() {
  for (let i = 1; i < 4; i++) {
    let prioButtonId = `prioButtonId${i}`;
    document.getElementById(prioButtonId).style.backgroundColor = "white";
    document.getElementById(prioButtonId).style.color = "black";

    switch (i) {
      case 1:
        document.getElementById("prioIconfillId1").style.fill = "#FF4207";
        document.getElementById("prioIconfillId2").style.fill = "#FF4207";
        break;
      case 2:
        document.getElementById("prioIconfillId3").style.fill = "#FFA800";
        document.getElementById("prioIconfillId4").style.fill = "#FFA800";
        break;
      case 3:
        document.getElementById("prioIconfillId5").style.fill = "#7AE229";
        document.getElementById("prioIconfillId6").style.fill = "#7AE229";
        break;
    }
  }
}

function setPriority(ButtonId, SVGfillId1, SVGfillId2) {
  resetPrioButtons();
  switch (ButtonId) {
    case "prioButtonId1":
      document.getElementById(ButtonId).style.backgroundColor = "#FF3D00";
      temporaryNewTaskSingleCardObject.prio = "Urgent";
      break;
    case "prioButtonId2":
      document.getElementById(ButtonId).style.backgroundColor = "#FFA800";
      temporaryNewTaskSingleCardObject.prio = "Medium";
      break;
    case "prioButtonId3":
      document.getElementById(ButtonId).style.backgroundColor = "#7AE229";
      temporaryNewTaskSingleCardObject.prio = "Low";
      break;
  }
  document.getElementById(ButtonId).style.color = "white";
  document.getElementById(SVGfillId1).style.fill = "white";
  document.getElementById(SVGfillId2).style.fill = "white";
}

function selectContactAndPushToTemporaryArray(element, nameSpanId, i) {
  let checkboxChecked = element.querySelector(".checkbox-checked");
  let checkboxUnchecked = element.querySelector(".checkbox-unchecked");

  if (element.classList.contains("selected")) {
    element.classList.remove("selected");
    checkboxChecked.style.display = "none";
    checkboxUnchecked.style.display = "block";

    // Remove the element from the set if it's deselected
    addedIDs.delete(nameSpanId);

    removeUserProfileCircle(nameSpanId);

    ////Hier aus temp to do splicen
    removeAssignedNameAndRgbFromTempArray(i);
    renderProfileCirclesFromTempArray(i);
  } else {
    element.classList.add("selected");
    checkboxChecked.style.display = "block";
    checkboxUnchecked.style.display = "none";

    // Only add the element if it hasn't been added before
    if (!addedIDs.has(nameSpanId)) {
      addedIDs.add(nameSpanId);

      ///Hier ins temp to do single card pushen
      pushAssignedNameAndRgbToTempArray(i);
      renderProfileCirclesFromTempArray(i);
    }
  }
}

function renderProfileCirclesFromTempArray() {
  document.getElementById("assignedUsersCircleDivId").innerHTML = "";

  if (temporaryNewTaskSingleCardObject.assignedToArray.length > 0) {
    for (
      let j = 0;
      j < temporaryNewTaskSingleCardObject.assignedToArray.length;j++) {
      document.getElementById("assignedUsersCircleDivId").innerHTML += /*html*/ `
        <div class="userProfileCircleDivClass" style="background-color: ${getProfileRgbFromTempArray(j)};">${returnInitialsFromTwoWordString(
        temporaryNewTaskSingleCardObject.assignedToArray[j].assignedFullName)}</div>
        `;
    }
  }
}

function getProfileRgbFromTempArray(j) {
  return temporaryNewTaskSingleCardObject.assignedToArray[j].assignedRGB;
}

function pushAssignedNameAndRgbToTempArray(i) {
  let assignedFullNameString = getFullNameStringFromContacts(i);
  let assignedRGBString = contactsJSON[i].profileRGB;
  const assignedObject = {
    assignedFullName: assignedFullNameString,
    assignedRGB: assignedRGBString,
  };
  temporaryNewTaskSingleCardObject.assignedToArray.push(assignedObject);
}

function removeAssignedNameAndRgbFromTempArray(i) {
  if (i < 0 || i >= contactsJSON.length) {
    console.error("Invalid index");
    return;
  }
  let assignedFullNameString = getFullNameStringFromContacts(i);
  //Find the index of the assignedFullNameString in assignedToArray
  let assignedToArrayIndex = -1;
  for (
    let j = 0;
    j < temporaryNewTaskSingleCardObject.assignedToArray.length;j++) {
    if(temporaryNewTaskSingleCardObject.assignedToArray[j].assignedFullName ===assignedFullNameString) {
      assignedToArrayIndex = j;
      break;
    }
  }
  //If found, splice it from the array
  if (assignedToArrayIndex !== -1) {
    temporaryNewTaskSingleCardObject.assignedToArray.splice(
      assignedToArrayIndex,1);
  }
}

//Remove added circles below assigned contacts selection
function removeUserProfileCircle(nameSpanId) {
  let circleElement = document.getElementById(`circle-${nameSpanId}`);
  if (circleElement) {
    circleElement.remove();
  }
}


//Dropdown Menu Contacts
function toggleDropdown(thisElement) {
  let dropdownButton = document.querySelector(".dropbtn");
  dropdownButton.classList.toggle("active");

  let dropdownContent = document.getElementById("dropdownContactAssignId");
  dropdownContent.classList.toggle("show");

  if (thisElement.classList.contains("open")) {
    thisElement.style.backgroundImage =
      "url('./assets/img/addTaskImg/inputArrowDownHover.svg')";
  } else {
    thisElement.style.backgroundImage =
      "url('./assets/img/addTaskImg/inputArrowUp.svg')";
  }
  thisElement.classList.toggle("open");
}

function openDropdownOnInput(thisElement) {
  let dropdownContent = document.getElementById("dropdownContactAssignId");

  // Check if the dropdown is already open, if yes, do nothing
  if (dropdownContent.classList.contains("show")) {
    return; // Dropdown is already open, so exit the function
  }

  // If dropdown is not open, open it
  let dropdownButton = document.querySelector(".dropbtn");
  dropdownButton.classList.add("active");
  dropdownContent.classList.add("show");

  // Update the arrow image to indicate dropdown is open
  thisElement.style.backgroundImage =
    "url('./assets/img/addTaskImg/inputArrowUp.svg')";
  thisElement.classList.add("open");
}

function toggleDropdown2(thisElement) {
  let dropdownButton = document.querySelector(".dropbtn");
  dropdownButton.classList.toggle("active");

  if (thisElement.classList.contains("open")) {
    thisElement.style.backgroundImage =
      "url('./assets/img/addTaskImg/inputArrowDownHover.svg')";
  } else {
    thisElement.style.backgroundImage =
      "url('./assets/img/addTaskImg/inputArrowUp.svg')";
  }
  thisElement.classList.toggle("open");
}

// Close the dropdown if the user clicks outside of it, except when clicking on the checkboxes
window.onclick = function (event) {
  if (
    !event.target.matches(".dropbtn") &&
    !event.target.closest(".dropdownContactDivClass")
  ) {
    let dropdowns = document.getElementsByClassName("dropdownContactDivClass");
    let dropdownButtons = document.getElementsByClassName("dropbtn");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
    for (let i = 0; i < dropdownButtons.length; i++) {
      let activeButton = dropdownButtons[i];
      if (activeButton.classList.contains("active")) {
        activeButton.classList.remove("active");
      }
    }
    //On click outside the input - change background arrow to default state
    contactInputId = document.getElementById("contactsInputId");
    if (contactInputId) {
      contactInputId.classList.remove("open");
      contactInputId.style.backgroundImage =
        "url('./assets/img/addTaskImg/inputArrowDown.svg')";
    }
  }

  //On click outside the category input - change background arrow to default state
  if (!event.target.matches(".categorySelectClass")) {
    categorySelectId = document.getElementById("categorySelectId");
    if (categorySelectId) {
      categorySelectId.classList.remove("open");
      categorySelectId.style.backgroundImage =
        "url('./assets/img/addTaskImg/inputArrowDown.svg')";
    }
  }
};

function changeFontColorOfCategoryInput() {
  document
    .getElementById("categorySelectId")
    .style.setProperty("color", "rgb(#000000)", "important");
}

function toggleCategoryDropdown() {
  let dropdownButton = document.querySelector(".dropbtn");
  let dropdownContent = document.getElementById("dropdownCategoryAssignId");
  dropdownButton.classList.toggle("active");
  dropdownContent.classList.toggle("show");
}

function displayAddAndDeleteSubtasksButtons() {
  document.getElementById("deleteSubtaskInputId").style.display = "flex";
  document.getElementById("addSubtaskInputId").style.display = "flex";

  if (document.getElementById("subtaskTextareaId").value == 0) {
    document.getElementById("deleteSubtaskInputId").style.display = "none";
    document.getElementById("addSubtaskInputId").style.display = "none";
  }
}

function clearSubtaskInput() {
  document.getElementById("subtaskTextareaId").value = "";
  displayAddAndDeleteSubtasksButtons();
}

function renderAndSafeSubtask() {
  addSubtaskToTempArray();
  renderSubtaskFromTempArray();
  document.getElementById("subtaskTextareaId").value = "";
  document.getElementById("deleteSubtaskInputId").style.display = "none";
  document.getElementById("addSubtaskInputId").style.display = "none";
}

function renderSubtaskFromTempArray() {
  const container = document.getElementById("subtasksDivContainerId");
  container.innerHTML = "";
  if (temporaryNewTaskSingleCardObject.subtaskJson) {
    for (
      let m = 0;
      m < temporaryNewTaskSingleCardObject.subtaskJson.length;
      m++
    ) {
      container.innerHTML += /*html*/ `
                <div class="subtaskDynamicDivClass" contenteditable="true"   oninput="updateSubtaskArray(this, ${m})" onmouseover="showIcons(this)" onmouseout="hideIcons(this)">
                    <div id="subtaskTextDivId${m}"   class="subtaskFocusDivClass">
                        &nbsp&nbsp•&nbsp <span id="subtaskTextSpanId${m}">${temporaryNewTaskSingleCardObject.subtaskJson[m].subtaskText}</span> 
                    </div>
                    <div class="iconsClass">
                        <img src="./assets/img/addTaskImg/smallEditSVG.svg" alt="" onclick="editParentDivText(${m})">
                        <img src="./assets/img/addTaskImg/smallDeleteSVG.svg" alt="" onclick="deleteSubtask(this, ${m})">
                    </div>
                </div>
            `;
    }
  }
}

function updateSubtaskArray(element, m) {
  const subtaskTextDiv = document.getElementById(`subtaskTextDivId${m}`);
  const spanElement = subtaskTextDiv.querySelector(`#subtaskTextSpanId${m}`);
  if (spanElement) {
    temporaryNewTaskSingleCardObject.subtaskJson[m].subtaskText =
      spanElement.innerText.trim();
    if (spanElement.innerText.trim().length === 0) {
      deleteSubtask(element, m);
    }
  } else {
    console.error(`Span element with id #subtaskTextSpanId${m} not found.`);
  }
}

function addSubtaskToTempArray() {
  let tempSubtask = {
    subtaskText: `${document.getElementById("subtaskTextareaId").value}`,
    subtaskDone: false,
  };

  //ACHTUNG: temporaryNewTaskSingleCardObject.subtaskJson ist eine direkte Referenz auf das subtask Array im toDoJson !!!
  // das liegt an einer shallow kopie, die im boardScript in Zeile 390 passiert
  // temporaryNewTaskSingleCardObject = { ...toDoCardsJSON[i] };
  //Das referenziert die arrays innerhalb des toDoJson Objekts und macht nicht einfach nur Kopien
  temporaryNewTaskSingleCardObject.subtaskJson.push(tempSubtask);
}

function showIcons(element) {
  document
    .querySelectorAll(".iconsClass")
    .forEach((icons) => (icons.style.display = "none"));
  element.querySelector(".iconsClass").style.display = "flex";
}

function hideIcons(element) {
  element.querySelector(".iconsClass").style.display = "none";
}

function deleteSubtask(element, m) {
  const grandparent = element.parentElement.parentElement;
  grandparent.remove();
  temporaryNewTaskSingleCardObject.subtaskJson.splice(m, 1);
}

function editParentDivText(m) {
  // Find the subtaskTextDivId within the parent div
  let subtaskTextDiv = document.getElementById(`subtaskTextDivId${m}`);
  // Make the subtaskTextDiv editable
  subtaskTextDiv.contentEditable = "true";
  // Set focus on the subtaskTextDiv and move cursor to the end of the text content
  let range = document.createRange();
  let selection = window.getSelection();
  range.selectNodeContents(subtaskTextDiv);
  range.collapse(false); // collapse range to end
  selection.removeAllRanges();
  selection.addRange(range);
}

function changeInputArrow(inputElement) {
  if (inputElement.classList.contains("open")) {
    inputElement.style.backgroundImage =
      "url('./assets/img/addTaskImg/inputArrowUpHover.svg')";
  } else {
    inputElement.style.backgroundImage =
      "url('./assets/img/addTaskImg/inputArrowDownHover.svg')";
  }
}

function changeBackInputArrow(inputElement) {
  if (inputElement.classList.contains("open")) {
    inputElement.style.backgroundImage =
      "url('./assets/img/addTaskImg/inputArrowUp.svg')";
  } else {
    inputElement.style.backgroundImage =
      "url('./assets/img/addTaskImg/inputArrowDown.svg')";
  }
}

//Date picker input min value always on today:
function setCurrentDateInputMinValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  document
    .getElementById("datePickerInputId")
    .setAttribute("min", `${year}-${month}-${day}`);
}

async function submitAddTaskForm() {
  // Get all the input elements
  const input1 = document.getElementById("titleInputId");
  const input2 = document.getElementById("datePickerInputId");
  const input3 = document.getElementById("categorySelectId");

  // Validate each input element
  const isInput1Valid = input1.checkValidity();
  const isInput2Valid = input2.checkValidity();
  const isInput3Valid = input3.checkValidity();

  // If any input is invalid, prevent form submission and show validation messages
  if (!isInput1Valid || !isInput2Valid || !isInput3Valid) {
    // Optionally, display custom error messages
    if (!isInput3Valid){input3.reportValidity();}
    if (!isInput2Valid){input2.reportValidity();}
    if (!isInput1Valid){input1.reportValidity();}
  } else {
    //Display success message and redirect to board
    displaySuccessAddingTask();
    await pushNewCardToJson();
  }
}

function navigateTo(url) {
  window.location.href = url;
}

function clearAddTaskForm() {
  emptyTempJson();
  resetPrioButtons();
  renderAddTaskSiteFromTempArray();
  document.getElementById("categoryMainFormId").reset();
  document.getElementById("categorySelectId").style.color = "gray";
  clearSubtaskInput();
}

async function pushNewCardToJson() {
  temporaryNewTaskSingleCardObject["title"] = document.getElementById("titleInputId").value;
  temporaryNewTaskSingleCardObject["description"] = document.getElementById("descriptionTextAreaId").value;
  //Date Value correct?
  temporaryNewTaskSingleCardObject["dueDate"] = document.getElementById("datePickerInputId").value;
  //Category already changed onclick, if not clicked, it stays empty

  //PUSHE TEMP ARRAY AN DIE STELLE IM TODOJSON
  ///HIER SUCHE INDEX DES ERSTEN TODO OBJECKTS
  let indexOfFirstToDoinMainJson = findIndexOfFirstCategoryInMainJson(temporaryNewTaskSingleCardObject.toDoStatus);
  if (indexOfFirstToDoinMainJson >= 1) {
    toDoCardsJSON.splice(indexOfFirstToDoinMainJson - 1,0,temporaryNewTaskSingleCardObject);
    //Pushing to server
    await putData("/toDoJson", toDoCardsJSON);
    }else{
    toDoCardsJSON.splice(0, 0, temporaryNewTaskSingleCardObject);
    await putData("/toDoJson", toDoCardsJSON);}

  if (inBoardAddTask) {
    createNewTask();
    inBoardAddTask = false;
  }

 //REDIRECT TO BOARD?
}

function createNewTask() {
  renderAllCardToBoard();
  clearAddTaskForm();
  closeAddTaskOverlay();
}

function changeCategoryInTempArray(categoryInput) {
  temporaryNewTaskSingleCardObject["category"] = `${categoryInput}`;
}

function updateDateInTempArray() {
  temporaryNewTaskSingleCardObject["dueDate"] =
    document.getElementById("datePickerInputId").value;
}

function displaySuccessAddingTask() {
  let overlay = document.getElementById("successOverlayId");

  // Show the overlay by setting the display to 'flex'
  overlay.style.display = "flex";

  // Trigger the fade-in effect by adding the class
  setTimeout(function () {
    overlay.classList.add("fade-in");
  }, 10); // Slight delay to allow for the CSS transition to take effect

  setTimeout(function () {
    window.location.href = "03board.html";
  }, 2000); // Redirects after 2 seconds
}
