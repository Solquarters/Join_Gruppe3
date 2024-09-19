let currentDraggedElement = null;
let touchStartX = 0,
  touchStartY = 0;

async function initializeBoard() {
  try {
    toDoCardsJSON = await loadData("/toDoJson");
    contactsJSON = await loadData("/contactsJson");
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    renderAllCardToBoard();
  }
}

function renderAllCardToBoard() {
  ///Reset all boards
  document.getElementById("toDoStatusDivId").innerHTML = "";
  document.getElementById("inProgressStatusDivId").innerHTML = "";
  document.getElementById("awaitFeedbackStatusDivId").innerHTML = "";
  document.getElementById("doneStatusDivId").innerHTML = "";
  //Get data from toDoCardsJSON
  for (let i = 0; i < Object.keys(toDoCardsJSON).length; i++) {
    if (toDoCardsJSON[i]["toDoStatus"] == "To do") {
      document.getElementById("toDoStatusDivId").innerHTML +=
        returnSingleCardHTML(i);
    }
    if (toDoCardsJSON[i]["toDoStatus"] == "In progress") {
      document.getElementById("inProgressStatusDivId").innerHTML +=
        returnSingleCardHTML(i);
    }
    if (toDoCardsJSON[i]["toDoStatus"] == "Await feedback") {
      document.getElementById("awaitFeedbackStatusDivId").innerHTML +=
        returnSingleCardHTML(i);
    }
    if (toDoCardsJSON[i]["toDoStatus"] == "Done") {
      document.getElementById("doneStatusDivId").innerHTML +=
        returnSingleCardHTML(i);
    }

    returnAssignedContactCircle(i);
  }

  renderHtmlIfCategoryIsEmpty();
}

function renderHtmlIfCategoryIsEmpty() {
  if (document.getElementById("toDoStatusDivId").innerHTML == "") {
    document.getElementById(
      "toDoStatusDivId"
    ).innerHTML = `<div class="emptyDragareaClass"><span>No tasks to do</span></div>`;
  }
  if (document.getElementById("inProgressStatusDivId").innerHTML == "") {
    document.getElementById(
      "inProgressStatusDivId"
    ).innerHTML = `<div class="emptyDragareaClass"><span>No tasks in progress</span></div>`;
  }
  if (document.getElementById("awaitFeedbackStatusDivId").innerHTML == "") {
    document.getElementById(
      "awaitFeedbackStatusDivId"
    ).innerHTML = `<div class="emptyDragareaClass"><span>No tasks awaiting feedback</span></div>`;
  }
  if (document.getElementById("doneStatusDivId").innerHTML == "") {
    document.getElementById(
      "doneStatusDivId"
    ).innerHTML = `<div class="emptyDragareaClass"><span>No tasks done</span></div>`;
  }
}

function returnSingleCardHTML(i) {
  const cardHTML = /*html*/ `
    <div class="mainSingleCardDivClass" id="singleCardId${i}" draggable="true"
         ondragstart="startDragging(${i})"
         onclick="openLargeCardOverlay(${i})">
        <div class="cardContainerInnert">
            ${returnCategoryHTML(i)}
            <div id="containerformularId${i}" class="containerformularDivClass">
                <span >${toDoCardsJSON[i]["title"]}</span>
            </div>
            <div id="descriptionDivId${i}" class="descriptionDivClass">
                <span id="descriptionSpanId${i}">${
    toDoCardsJSON[i]["description"]
  }</span>
            </div>
            ${getProgressBarHTML(i)}
            <div class="contactPrioDiv">
                <div class="singleCardAssignedContactsParentDivClass" id="singleCardContactCircleDivId${i}"></div>
                <div>
                    <div id="prioDivId${i}" class="prioDiv">
                        ${returnPrioSvgHTML(i)}
                    </div>
                </div>     
            </div>
        </div>
    </div>`;

  appendMobileDragEventListeners(i);

  return cardHTML;
}

function appendMobileDragEventListeners(i) {
  // Use setTimeout to ensure the element is available in the DOM
  setTimeout(() => {
    const cardElement = document.getElementById(`singleCardId${i}`);
    cardElement.addEventListener(
      "touchstart",
      (event) => handleTouchStart(event, i),
      { passive: true }
    );
    cardElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    cardElement.addEventListener("touchend", handleTouchEnd, { passive: true });
  }, 0);
}

function returnAssignedContactCircle(i) {
  document.getElementById(`singleCardContactCircleDivId${i}`).innerHTML = "";

  if (toDoCardsJSON[i].assignedToArray) {
    let renderedCircles = 0;

    for (let j = 0; j < toDoCardsJSON[i].assignedToArray.length; j++) {
      if (renderedCircles == 7) {
        document.getElementById(
          `singleCardContactCircleDivId${i}`
        ).innerHTML += /*html*/ `
            <div class="singleCardCircleDivClass" style="background-color: #2A3647">+${
              toDoCardsJSON[i].assignedToArray.length - 7
            }</div>
            `;
        return;
      }
      document.getElementById(
        `singleCardContactCircleDivId${i}`
      ).innerHTML += /*html*/ `
            <div class="singleCardCircleDivClass" style="background-color: ${
              toDoCardsJSON[i].assignedToArray[j].assignedRGB
            }">${returnInitialsFromTwoWordString(
        toDoCardsJSON[i].assignedToArray[j].assignedFullName
      )}</div>
            `;
      renderedCircles++;
    }
  }
}

function getProgressBarHTML(i) {
  let card = toDoCardsJSON[i];
  if (!card || !card.subtaskJson) {
    return "";
  }
  let subtasks = card.subtaskJson;
  let totalSubtasks = subtasks.length;
  let completedSubtasks = subtasks.filter(
    (subtask) => subtask.subtaskDone == true
  ).length;
  let progress =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return `<div class="progessBarAndTextClass">
        <div class="progressBarParentDivClass">
            <div style="width: ${progress}%" class="innerProgressBarClass"></div>
            
        </div>
        ${completedSubtasks}/${totalSubtasks} Subtasks
    </div>`;
}

function returnCategoryHTML(i) {
  if (toDoCardsJSON[i]["category"] == "User Story") {
    return /*html*/ `<div id="cardHeadlineId${i}" class="cardHeadlineClass userStoryClass">
                <span id="">${toDoCardsJSON[i]["category"]}</span>
            </div>`;
  } else if (toDoCardsJSON[i]["category"] == "Technical Task") {
    return /*html*/ `<div id="cardHeadlineId${i}" class="cardHeadlineClass technicalTaskClass">
        <span id="">${toDoCardsJSON[i]["category"]}</span>
        </div>`;
  }
}

///DRAG AND DROP MOUSE FUNCTION START
function startDragging(index) {
  currentDraggedElement = index;
  document.getElementById(`singleCardId${index}`).classList.add("rotateOnDrag");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(categoryInput) {
  moveDraggedCardToCategoryInsideJson(categoryInput);
  document.querySelectorAll(".drag-area-highlight").forEach(function (element) {
    element.classList.remove("drag-area-highlight");
  });
  document.querySelectorAll(".rotateOnDrag").forEach(function (element) {
    element.classList.remove("rotateOnDrag");
  });
  renderAllCardToBoard();
}

function moveDraggedCardToCategoryInsideJson(categoryInput) {
  let tempObject = toDoCardsJSON[currentDraggedElement];

  tempObject.toDoStatus = categoryInput;

  let indexOfFirstCategoryinJson =
    findIndexOfFirstCategoryInMainJson(categoryInput);
  toDoCardsJSON.splice(currentDraggedElement, 1);

  if (indexOfFirstCategoryinJson >= 1) {
    toDoCardsJSON.splice(indexOfFirstCategoryinJson - 1, 0, tempObject);
    putData("/toDoJson", toDoCardsJSON);
  } else {
    toDoCardsJSON.splice(0, 0, tempObject);
    putData("/toDoJson", toDoCardsJSON);
  }
}

function highlight(mainCategoryDivId) {
  document
    .getElementById(mainCategoryDivId)
    .classList.add("drag-area-highlight");
}

function removeHighlight(mainCategoryDivId) {
  document
    .getElementById(mainCategoryDivId)
    .classList.remove("drag-area-highlight");
}

function handleDragLeave(event, mainCategoryDivId) {
  let rect = document.getElementById(mainCategoryDivId).getBoundingClientRect();
  let x = event.clientX;
  let y = event.clientY;

  // Check if the mouse is outside the parent element
  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
    document
      .querySelectorAll(".drag-area-highlight")
      .forEach(function (element) {
        element.classList.remove("drag-area-highlight");
      });
  }
}

///DRAG AND DROP MOUSE FUNCTION END

///MOBILE DRAG DROP FUNCTION START:
function handleTouchStart(event, index) {
  currentDraggedElement = index;

  // Get initial touch coordinates
  const touch = event.touches[0];

  touchStartX = touch.clientX;
  touchStartY = touch.clientY;

  // Add visual feedback
  document.getElementById(`singleCardId${index}`).classList.add("rotateOnDrag");
}

// Adjusted touch move handler to check all containers
function handleTouchMove(event) {
  event.preventDefault(); // Prevent scrolling

  const touch = event.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  // Check if the card is over any drop area
  [
    "toDoStatusDivId",
    "inProgressStatusDivId",
    "awaitFeedbackStatusDivId",
    "doneStatusDivId",
  ].forEach((mainCategoryDivId) => {
    const rect = document
      .getElementById(mainCategoryDivId)
      .getBoundingClientRect();

    if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
      highlight(mainCategoryDivId); // Highlight the container
    } else {
      removeHighlight(mainCategoryDivId); // Remove highlight if outside
    }
  });
}

function handleTouchEnd(event) {
  const touch = event.changedTouches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  // Clean up highlights and visual feedback
  document.querySelectorAll(".drag-area-highlight").forEach(function (element) {
    element.classList.remove("drag-area-highlight");
  });
  document.querySelectorAll(".rotateOnDrag").forEach(function (element) {
    element.classList.remove("rotateOnDrag");
  });


  ///CHECK IF USER MOVED THE DRAGGED TOUCH MORE THAN 10PX IN ANY DIRECTION
 // Calculate the difference between touch start and end positions
 const deltaX = Math.abs(x - touchStartX);
 const deltaY = Math.abs(y - touchStartY);

 // Check if the user moved more than 10px in any direction
 if (deltaX <= 15 && deltaY <= 15) {
   // If not moved more than 10px, return early
   return;
 }

  // Mapping of container IDs to category names
  const categoryMapping = {
    toDoStatusDivId: "To do",
    inProgressStatusDivId: "In progress",
    awaitFeedbackStatusDivId: "Await feedback",
    doneStatusDivId: "Done",
  };

  // Check where the touch ended and move the card if it is over a valid drop area
  Object.keys(categoryMapping).forEach((mainCategoryDivId) => {
    const rect = document
      .getElementById(mainCategoryDivId)
      .getBoundingClientRect();

    if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
      const categoryInput = categoryMapping[mainCategoryDivId]; // Get the corresponding category
      moveTo(categoryInput); // Move the card to the category
    }
  });
}
///MOBILE DRAG DROP FUNCTION END

function returnPrioSvgHTML(i) {
  if (toDoCardsJSON[i]["prio"] == "Low") {
    return `<img src="./assets/img/Priority symbols low.svg">`;
  }

  if (toDoCardsJSON[i]["prio"] == "Medium") {
    return `<img src="./assets/img/Priority symbols medium.svg">`;
  }

  if (toDoCardsJSON[i]["prio"] == "Urgent") {
    return `<img src="./assets/img/Priority symbols urgent.svg">`;
  }
}

function openEmptyAddTaskOverlay(toDoStatus) {
  inBoardAddTask = true;
  slideInAddTaskOverlay();
  //Accessing GLOBAL SCRIPT
  renderAddTaskHTMLForBoardOverlay();
  emptyTempJson();
  setToDoStatusInTempArray(toDoStatus);
  renderAddTaskSiteFromTempArray();
  renderContactsDropdownMenuContent();
  setCurrentDateInputMinValue();
  renderProfileCirclesFromTempArray();
  renderSubtaskFromTempArray();
  fitAddTaskCssAttributesToBoardTemplate();
}

function setToDoStatusInTempArray(toDoStatus) {
  temporaryNewTaskSingleCardObject.toDoStatus = toDoStatus;
}

function slideInAddTaskOverlay() {
  const parentOverlay = document.getElementById("addEmptyTaskMainOverlayId");
  const childOverlay = document.getElementById("addEmptyTaskChildOverlayId");

  // Show the parent overlay first
  parentOverlay.style.display = "flex"; // Set display to flex immediately
  setTimeout(() => {
    parentOverlay.style.opacity = "1"; // Fade in the parent
  }, 0); // Short delay to ensure it is applied after display is set

  // Slide in the child overlay
  setTimeout(() => {
    childOverlay.classList.add("active"); // Add active class to start the slide
  }, 50); // Small delay to ensure display change takes effect
}

function slideOutAddTaskOverlay() {
  const parentOverlay = document.getElementById("addEmptyTaskMainOverlayId");
  const childOverlay = document.getElementById("addEmptyTaskChildOverlayId");

  // Remove the active class to slide the child out
  childOverlay.classList.remove("active");

  // Wait for the slide-out animation to finish (500ms matches the CSS transition)
  setTimeout(() => {
    parentOverlay.style.opacity = "0"; // Fade out the parent
  }, 500); // Delay matches the child overlay's transition duration

  // After the fade-out completes, hide the parent
  setTimeout(() => {
    parentOverlay.style.display = "none"; // Set display to none after opacity transition
  }, 700); // This delay accounts for both the slide-out and fade-out transitions
}

function closeAddTaskOverlay() {
  slideOutAddTaskOverlay();
  setTimeout(() => {
    document.getElementById("addEmptyTaskChildOverlayId").innerHTML = "";
  }, 500);
}

function handleOverlayClick(event) {
  // Check if the click happened outside the child element
  if (event.target.id === "addEmptyTaskMainOverlayId") {
    closeAddTaskOverlay();
  }
}

function openLargeCardOverlay(i) {
  currentLargeCardIndex = i;

  setupOverlayHTMLandCSS();

  ///SaveChanges - pushing TempArray to JSON , render to Large Card Overlay
  let categorySpan = document.getElementById("largeCardOverlayCategorySpanId");
  categorySpan.innerText = toDoCardsJSON[i].category;
  if (toDoCardsJSON[i]["category"] == "User Story") {
    categorySpan.style.backgroundColor = "blue";
  } else if (toDoCardsJSON[i]["category"] == "Technical Task") {
    categorySpan.style.backgroundColor = "#1FD7C1";
  }

  document.getElementById("largeCardTitleSpanId").innerText =
    toDoCardsJSON[i].title;
  document.getElementById("largeCardDescriptionSpanId").innerText =
    toDoCardsJSON[i].description;
  document.getElementById("largeCardDateSpanId").innerText =
    formatToGermanDate(toDoCardsJSON[i].dueDate) + " (german)";
  document.getElementById("largeCardPrioSpanId").innerHTML = /*html*/ `${
    toDoCardsJSON[i].prio
  }&nbsp${returnPrioSvgHTML(i)}`;

  ///Go through JSONTODO[i].assignedTo Array und render circle and name
  returnLargeCardAssignedHTML(i);
  returnLargeCardSubtasksHTML(i);
  renderDeleteAndEditButton(i);
}

function setupOverlayHTMLandCSS() {
  document.getElementById("mainLargeCardOverlayId").style.display = "flex";
  document.getElementById("popupMainDivId").innerHTML =
    returnLargeCardOverlayHTML();
  document.getElementById("popupMainDivId").scrollTop = 0;
  disableScrolling();
}

function formatToGermanDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

function renderDeleteAndEditButton(i) {
  //DELETE BUTTON
  document.getElementById("deleteContactDivId").innerHTML = ` 
    <svg onclick="deleteSingleCard(${i})" width="81" height="24" viewBox="0 0 81 24" fill="none" >
    <mask id="mask0_192987_4275" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_192987_4275)">
    <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
    </g>
    <path d="M37 17.5H33.4091V5.86364H37.1591C38.2879 5.86364 39.2538 6.09659 40.0568 6.5625C40.8598 7.02462 41.4754 7.68939 41.9034 8.55682C42.3314 9.42045 42.5455 10.4545 42.5455 11.6591C42.5455 12.8712 42.3295 13.9148 41.8977 14.7898C41.4659 15.661 40.8371 16.3314 40.0114 16.8011C39.1856 17.267 38.1818 17.5 37 17.5ZM34.8182 16.25H36.9091C37.8712 16.25 38.6686 16.0644 39.3011 15.6932C39.9337 15.322 40.4053 14.7936 40.7159 14.108C41.0265 13.4223 41.1818 12.6061 41.1818 11.6591C41.1818 10.7197 41.0284 9.91098 40.7216 9.23295C40.4148 8.55114 39.9564 8.02841 39.3466 7.66477C38.7367 7.29735 37.9773 7.11364 37.0682 7.11364H34.8182V16.25ZM48.3864 17.6818C47.5455 17.6818 46.8201 17.4962 46.2102 17.125C45.6042 16.75 45.1364 16.2273 44.8068 15.5568C44.4811 14.8826 44.3182 14.0985 44.3182 13.2045C44.3182 12.3106 44.4811 11.5227 44.8068 10.8409C45.1364 10.1553 45.5947 9.62121 46.1818 9.23864C46.7727 8.85227 47.4621 8.65909 48.25 8.65909C48.7045 8.65909 49.1534 8.73485 49.5966 8.88636C50.0398 9.03788 50.4432 9.28409 50.8068 9.625C51.1705 9.96212 51.4602 10.4091 51.6761 10.9659C51.892 11.5227 52 12.2083 52 13.0227V13.5909H45.2727V12.4318H50.6364C50.6364 11.9394 50.5379 11.5 50.3409 11.1136C50.1477 10.7273 49.8712 10.4223 49.5114 10.1989C49.1553 9.97538 48.7348 9.86364 48.25 9.86364C47.7159 9.86364 47.2538 9.99621 46.8636 10.2614C46.4773 10.5227 46.1799 10.8636 45.9716 11.2841C45.7633 11.7045 45.6591 12.1553 45.6591 12.6364V13.4091C45.6591 14.0682 45.7727 14.6269 46 15.0852C46.2311 15.5398 46.5511 15.8864 46.9602 16.125C47.3693 16.3598 47.8447 16.4773 48.3864 16.4773C48.7386 16.4773 49.0568 16.428 49.3409 16.3295C49.6288 16.2273 49.8769 16.0758 50.0852 15.875C50.2936 15.6705 50.4545 15.4167 50.5682 15.1136L51.8636 15.4773C51.7273 15.9167 51.4981 16.303 51.1761 16.6364C50.8542 16.9659 50.4564 17.2235 49.983 17.4091C49.5095 17.5909 48.9773 17.6818 48.3864 17.6818ZM55.3807 5.86364V17.5H54.0398V5.86364H55.3807ZM61.4957 17.6818C60.6548 17.6818 59.9295 17.4962 59.3196 17.125C58.7135 16.75 58.2457 16.2273 57.9162 15.5568C57.5904 14.8826 57.4276 14.0985 57.4276 13.2045C57.4276 12.3106 57.5904 11.5227 57.9162 10.8409C58.2457 10.1553 58.7041 9.62121 59.2912 9.23864C59.8821 8.85227 60.5715 8.65909 61.3594 8.65909C61.8139 8.65909 62.2628 8.73485 62.706 8.88636C63.1491 9.03788 63.5526 9.28409 63.9162 9.625C64.2798 9.96212 64.5696 10.4091 64.7855 10.9659C65.0014 11.5227 65.1094 12.2083 65.1094 13.0227V13.5909H58.3821V12.4318H63.7457C63.7457 11.9394 63.6473 11.5 63.4503 11.1136C63.2571 10.7273 62.9806 10.4223 62.6207 10.1989C62.2647 9.97538 61.8442 9.86364 61.3594 9.86364C60.8253 9.86364 60.3632 9.99621 59.973 10.2614C59.5866 10.5227 59.2893 10.8636 59.081 11.2841C58.8726 11.7045 58.7685 12.1553 58.7685 12.6364V13.4091C58.7685 14.0682 58.8821 14.6269 59.1094 15.0852C59.3404 15.5398 59.6605 15.8864 60.0696 16.125C60.4787 16.3598 60.9541 16.4773 61.4957 16.4773C61.848 16.4773 62.1662 16.428 62.4503 16.3295C62.7382 16.2273 62.9863 16.0758 63.1946 15.875C63.4029 15.6705 63.5639 15.4167 63.6776 15.1136L64.973 15.4773C64.8366 15.9167 64.6075 16.303 64.2855 16.6364C63.9635 16.9659 63.5658 17.2235 63.0923 17.4091C62.6188 17.5909 62.0866 17.6818 61.4957 17.6818ZM70.9446 8.77273V9.90909H66.4219V8.77273H70.9446ZM67.7401 6.68182H69.081V15C69.081 15.3788 69.1359 15.6629 69.2457 15.8523C69.3594 16.0379 69.5033 16.1629 69.6776 16.2273C69.8556 16.2879 70.0431 16.3182 70.2401 16.3182C70.3878 16.3182 70.509 16.3106 70.6037 16.2955C70.6984 16.2765 70.7741 16.2614 70.831 16.25L71.1037 17.4545C71.0128 17.4886 70.8859 17.5227 70.723 17.5568C70.5601 17.5947 70.3537 17.6136 70.1037 17.6136C69.7249 17.6136 69.3537 17.5322 68.9901 17.3693C68.6302 17.2064 68.331 16.9583 68.0923 16.625C67.8575 16.2917 67.7401 15.8712 67.7401 15.3636V6.68182ZM76.527 17.6818C75.6861 17.6818 74.9607 17.4962 74.3509 17.125C73.7448 16.75 73.277 16.2273 72.9474 15.5568C72.6217 14.8826 72.4588 14.0985 72.4588 13.2045C72.4588 12.3106 72.6217 11.5227 72.9474 10.8409C73.277 10.1553 73.7353 9.62121 74.3224 9.23864C74.9134 8.85227 75.6027 8.65909 76.3906 8.65909C76.8452 8.65909 77.294 8.73485 77.7372 8.88636C78.1804 9.03788 78.5838 9.28409 78.9474 9.625C79.3111 9.96212 79.6009 10.4091 79.8168 10.9659C80.0327 11.5227 80.1406 12.2083 80.1406 13.0227V13.5909H73.4134V12.4318H78.777C78.777 11.9394 78.6785 11.5 78.4815 11.1136C78.2884 10.7273 78.0118 10.4223 77.652 10.1989C77.2959 9.97538 76.8755 9.86364 76.3906 9.86364C75.8565 9.86364 75.3944 9.99621 75.0043 10.2614C74.6179 10.5227 74.3205 10.8636 74.1122 11.2841C73.9039 11.7045 73.7997 12.1553 73.7997 12.6364V13.4091C73.7997 14.0682 73.9134 14.6269 74.1406 15.0852C74.3717 15.5398 74.6918 15.8864 75.1009 16.125C75.5099 16.3598 75.9853 16.4773 76.527 16.4773C76.8793 16.4773 77.1974 16.428 77.4815 16.3295C77.7694 16.2273 78.0175 16.0758 78.2259 15.875C78.4342 15.6705 78.5952 15.4167 78.7088 15.1136L80.0043 15.4773C79.8679 15.9167 79.6387 16.303 79.3168 16.6364C78.9948 16.9659 78.5971 17.2235 78.1236 17.4091C77.6501 17.5909 77.1179 17.6818 76.527 17.6818Z" fill="#2A3647"/>
    </svg>
    `;

  ////EDIT BUTTON
  document.getElementById("editContactDivId").innerHTML = `
    <svg onclick="editSingleCard(${i})" width="62" height="24" viewBox="0 0 62 24" fill="none" >
    <mask id="mask0_192987_4281" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_192987_4281)">
    <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
    </g>
    <path d="M33.4091 17.5V5.86364H40.4318V7.11364H34.8182V11.0455H40.0682V12.2955H34.8182V16.25H40.5227V17.5H33.4091ZM46.0852 17.6818C45.358 17.6818 44.7159 17.4981 44.1591 17.1307C43.6023 16.7595 43.1667 16.2367 42.8523 15.5625C42.5379 14.8845 42.3807 14.0833 42.3807 13.1591C42.3807 12.2424 42.5379 11.447 42.8523 10.7727C43.1667 10.0985 43.6042 9.57765 44.1648 9.21023C44.7254 8.8428 45.3731 8.65909 46.108 8.65909C46.6761 8.65909 47.125 8.75379 47.4545 8.94318C47.7879 9.12879 48.0417 9.34091 48.2159 9.57955C48.3939 9.81439 48.5322 10.0076 48.6307 10.1591H48.7443V5.86364H50.0852V17.5H48.7898V16.1591H48.6307C48.5322 16.3182 48.392 16.5189 48.2102 16.7614C48.0284 17 47.7689 17.214 47.4318 17.4034C47.0947 17.589 46.6458 17.6818 46.0852 17.6818ZM46.267 16.4773C46.8049 16.4773 47.2595 16.3371 47.6307 16.0568C48.0019 15.7727 48.2841 15.3807 48.4773 14.8807C48.6705 14.3769 48.767 13.7955 48.767 13.1364C48.767 12.4848 48.6723 11.9148 48.483 11.4261C48.2936 10.9337 48.0133 10.5511 47.642 10.2784C47.2708 10.0019 46.8125 9.86364 46.267 9.86364C45.6989 9.86364 45.2254 10.0095 44.8466 10.3011C44.4716 10.589 44.1894 10.9811 44 11.4773C43.8144 11.9697 43.7216 12.5227 43.7216 13.1364C43.7216 13.7576 43.8163 14.322 44.0057 14.8295C44.1989 15.3333 44.483 15.7348 44.858 16.0341C45.2367 16.3295 45.7064 16.4773 46.267 16.4773ZM52.7273 17.5V8.77273H54.0682V17.5H52.7273ZM53.4091 7.31818C53.1477 7.31818 52.9223 7.22917 52.733 7.05114C52.5473 6.87311 52.4545 6.65909 52.4545 6.40909C52.4545 6.15909 52.5473 5.94508 52.733 5.76705C52.9223 5.58902 53.1477 5.5 53.4091 5.5C53.6705 5.5 53.8939 5.58902 54.0795 5.76705C54.2689 5.94508 54.3636 6.15909 54.3636 6.40909C54.3636 6.65909 54.2689 6.87311 54.0795 7.05114C53.8939 7.22917 53.6705 7.31818 53.4091 7.31818ZM60.3196 8.77273V9.90909H55.7969V8.77273H60.3196ZM57.1151 6.68182H58.456V15C58.456 15.3788 58.5109 15.6629 58.6207 15.8523C58.7344 16.0379 58.8783 16.1629 59.0526 16.2273C59.2306 16.2879 59.4181 16.3182 59.6151 16.3182C59.7628 16.3182 59.884 16.3106 59.9787 16.2955C60.0734 16.2765 60.1491 16.2614 60.206 16.25L60.4787 17.4545C60.3878 17.4886 60.2609 17.5227 60.098 17.5568C59.9351 17.5947 59.7287 17.6136 59.4787 17.6136C59.0999 17.6136 58.7287 17.5322 58.3651 17.3693C58.0052 17.2064 57.706 16.9583 57.4673 16.625C57.2325 16.2917 57.1151 15.8712 57.1151 15.3636V6.68182Z" fill="#2A3647"/>
    </svg>
    `;
}

function returnLargeCardSubtasksHTML(i) {
  document.getElementById("subtasksLargeCardContainerId").innerHTML = "";
  let card = toDoCardsJSON[i];
  if (!card || !card.subtaskJson) {
    return "";
  }
  for (let j = 0; j < toDoCardsJSON[i].subtaskJson.length; j++) {
    if (toDoCardsJSON[i].subtaskJson[j].subtaskDone) {
      document.getElementById(
        "subtasksLargeCardContainerId"
      ).innerHTML += /*html*/ `
            <div class="subTaskSingleChildClass">
                   <label class="container" >${toDoCardsJSON[i].subtaskJson[j].subtaskText} 
                       <input type="checkbox" checked="checked" onclick="flipSubtaskCheckBool(${i},${j})">
                       <span class="checkmark" ></span>
                     </label>
               </div>
            `;
    } else {
      document.getElementById(
        "subtasksLargeCardContainerId"
      ).innerHTML += /*html*/ `
                <div  class="subTaskSingleChildClass">
                   <label class="container" >${toDoCardsJSON[i].subtaskJson[j].subtaskText}
                       <input type="checkbox" onclick="flipSubtaskCheckBool(${i},${j})">
                       <span class="checkmark"></span>
                     </label>
               </div>
            `;
    }
  }
}

function flipSubtaskCheckBool(i, j) {
  toDoCardsJSON[i].subtaskJson[j].subtaskDone =
    !toDoCardsJSON[i].subtaskJson[j].subtaskDone;

  putData("/toDoJson", toDoCardsJSON);

  return toDoCardsJSON[i].subtaskJson[j].subtaskDone;
}

function returnLargeCardAssignedHTML(i) {
  document.getElementById("assignedLargeCardContainerId").innerHTML = "";

  if (toDoCardsJSON[i].assignedToArray) {
    for (let j = 0; j < toDoCardsJSON[i].assignedToArray.length; j++) {
      document.getElementById(
        "assignedLargeCardContainerId"
      ).innerHTML += /*html*/ `
                 <span class="circleAndNameSpanClass2">
                <!-- InitialsCircle -->
                <span class="contactSvgCircleClass2" style="background-color: ${
                  toDoCardsJSON[i].assignedToArray[j].assignedRGB
                };">${returnInitialsFromTwoWordString(
        toDoCardsJSON[i].assignedToArray[j].assignedFullName
      )}</span>
                <!-- Full contact name -->
                <span>${
                  toDoCardsJSON[i].assignedToArray[j].assignedFullName
                }</span>
            </span>
                `;
    }
  }
}

function closeLargeCardOverlay() {
  document.getElementById("mainLargeCardOverlayId").style.display = "none";
  enableScrolling();
  renderAllCardToBoard();
}

function submitEditingCard() {
  // Get all the input elements
  const input1 = document.getElementById("titleInputId");
  const input2 = document.getElementById("datePickerInputId");

  // Validate each input element
  const isInput1Valid = input1.checkValidity();
  const isInput2Valid = input2.checkValidity();

  // If any input is invalid, prevent form submission and show validation messages
  if (!isInput1Valid || !isInput2Valid) {
    // Optionally, display custom error messages
    if (!isInput2Valid) input2.reportValidity();
    if (!isInput1Valid) input1.reportValidity();
  } else {
    temporaryNewTaskSingleCardObject["title"] =
      document.getElementById("titleInputId").value;
    temporaryNewTaskSingleCardObject["description"] = document.getElementById(
      "descriptionTextAreaId"
    ).value;
    temporaryNewTaskSingleCardObject["dueDate"] =
      document.getElementById("datePickerInputId").value;
    toDoCardsJSON[currentLargeCardIndex] = temporaryNewTaskSingleCardObject;
    putData("/toDoJson", toDoCardsJSON);
    openLargeCardOverlay(currentLargeCardIndex);
  }
}

function handleLargeCardOverlayClick(event) {
  // Check if the click happened outside the child element
  if (event.target.id === "mainLargeCardOverlayId") {
    closeLargeCardOverlay();
  }
}

function disableScrolling() {
  document.body.style.overflow = "hidden";
}

function enableScrolling() {
  document.body.style.overflow = "auto";
}

function fitAddTaskCssAttributesToBoardTemplate() {
  const element = document.querySelector("." + "addTaskMainTemplateDivClass");
  if (element) {
    element.style.height = "auto";
    element.style.width = "unset";
  } else {
    console.warn(`No element found with class ${className}`);
  }
}

function deleteSingleCard(i) {
  toDoCardsJSON.splice(i, 1);
  putData("/toDoJson", toDoCardsJSON);
  closeLargeCardOverlay();
  renderAllCardToBoard();
  enableScrolling();
}

function editSingleCard(i) {
  //When copying: temporaryNewTaskSingleCardObject = toDoCardsJSON[i] - this actually creates a direct reference to each other.
  //Copy without reference: temporaryNewTaskSingleCardObject = structuredClone(toDoCardsJSON[i]) OR temporaryNewTaskSingleCardObject = { ...toDoCardsJSON[i] };
  //Attention, this is a difference between referencetype and valuetype!
  temporaryNewTaskSingleCardObject = structuredClone(toDoCardsJSON[i]);
  document.getElementById("popupMainDivId").innerHTML = returnAddTaskSiteHTML();
  renderAddTaskSiteFromTempArray();
  document.getElementById("popupMainDivId").scrollTop = 0;
  setStyleAdaptationForSingleCardHTML();
  setDateFromTempArray();
}

function setStyleAdaptationForSingleCardHTML() {
  theBigSinfulCssAdaptFunction1();
  theBigSinfulCssAdaptFunction2();
}

function theBigSinfulCssAdaptFunction1() {
  ///CSS Klassen anpassen: Media queries...
  let singleLineInputClass = document.querySelectorAll(".singleLineInputClass");
  singleLineInputClass.forEach(function (element) {
    element.style.minWidth = "unset";
  });
  let textarea = document.querySelectorAll("textarea");
  textarea.forEach(function (element) {
    element.style.minWidth = "unset";
  });
  let drobbtn = document.querySelectorAll(".drobbtn");
  drobbtn.forEach(function (element) {
    element.style.minWidth = "unset";
  });
  let select = document.querySelectorAll("select");
  select.forEach(function (element) {
    element.style.minWidth = "unset";
  });
  let addTaskMainTemplateDivClass = document.querySelectorAll(
    ".addTaskMainTemplateDivClass"
  );
  addTaskMainTemplateDivClass.forEach(function (element) {
    element.style.maxHeight = "94vh";
    element.style.padding = "10px 10px";
  });
  let prioButtonDivClass = document.querySelectorAll(".prioButtonDivClass");
  prioButtonDivClass.forEach(function (element) {
    element.style.gap = "2px";
  });
  let priorityButtonClass = document.querySelectorAll(".priorityButtonClass");
  priorityButtonClass.forEach(function (element) {
    element.style.fontSize = "14px";
  });
}

function theBigSinfulCssAdaptFunction2() {
  //mainContainerOverlay width 100% influences AddTask Overlay
  document.getElementById("mainLargeCardOverlayId").style.width = "100%";
  //clear und create button display none, okay button display
  document.getElementById("clearCreateDivId1").style.display = "none";
  document.getElementById("clearCreateDivId2").style.display = "none";
  document.getElementById("clearCreateDivId3").style.display = "block";
  document.getElementById("divSeperatorId1").style.display = "none";
  let addTaskDetailsParentDivClass = document.querySelectorAll(
    ".addTaskDetailsParentDivClass"
  );
  addTaskDetailsParentDivClass.forEach(function (element) {
    element.style.display = "unset";
  });
  let leftSideChildDivClass = document.querySelectorAll(
    ".leftSideChildDivClass"
  );
  leftSideChildDivClass.forEach(function (element) {
    element.style.width = "unset";
  });
  let rightSideChildDivClass = document.querySelectorAll(
    ".rightSideChildDivClass"
  );
  rightSideChildDivClass.forEach(function (element) {
    element.style.width = "unset";
  });
}

function setDateFromTempArray() {
  let dateInput = document.getElementById("datePickerInputId");
  if (dateInput) {
    dateInput.value = temporaryNewTaskSingleCardObject.dueDate;
  }
}

function returnLargeCardOverlayHTML() {
  return /*html*/ `
<div class="headLineCloseButton">
           <span class="userStory" id="largeCardOverlayCategorySpanId">User Story</span>
           <svg width="32" height="32" viewBox="0 0 32 32" fill="none" onclick="closeLargeCardOverlay()">
               <mask id="mask0_192516_3247" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
               <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
               </mask>
               <g mask="url(#mask0_192516_3247)">
               <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88332 22.4834 9.69999 22.3C9.51665 22.1167 9.42499 21.8834 9.42499 21.6C9.42499 21.3167 9.51665 21.0834 9.69999 20.9L14.6 16L9.69999 11.1C9.51665 10.9167 9.42499 10.6834 9.42499 10.4C9.42499 10.1167 9.51665 9.88338 9.69999 9.70005C9.88332 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
               </g>
               </svg>
       </div>
           <div class="BoardOverlayHeadLinDivClass">
               <span id="largeCardTitleSpanId">Kochwelt Page & Recipe Recommender</span>
           </div>
       <div class="mainPopupDivClass">
           <div class="descriptionDivClass2">
               <span id="largeCardDescriptionSpanId">Build start page with recipe recommendation</span>
           </div>
           <div class="dateDivClass">
               <span class="dueDateSpan">Due date:</span>
               <span class="dateFormatSpan" id="largeCardDateSpanId">21/06/2024</span>
           </div>
           <div class="priorityDivClass">
               <span>Priority:</span>
               <span id="largeCardPrioSpanId"></span>
           </div>
           <div class="assignetToNamesClass">
               <span>Assigned To:</span><br>
               <div id="assignedLargeCardContainerId">

            <div class="assignedToName1">
               <svg width="42" height="42" viewBox="0 0 42 42" fill="none" >
                   <rect width="42" height="42" rx="21" fill="white"/>
                   <circle cx="21" cy="21" r="20" fill="#462F8A" stroke="white" stroke-width="2"/>
                   <path d="M12.8166 16.2727H14.0779L17.0439 23.517H17.1461L20.112 16.2727H21.3734V25H20.3848V18.3693H20.2995L17.5723 25H16.6177L13.8904 18.3693H13.8052V25H12.8166V16.2727ZM23.4924 25V16.2727H26.5435C27.1515 16.2727 27.6529 16.3778 28.0478 16.5881C28.4426 16.7955 28.7367 17.0753 28.9299 17.4276C29.123 17.777 29.2196 18.1648 29.2196 18.5909C29.2196 18.9659 29.1529 19.2756 29.0194 19.5199C28.8887 19.7642 28.7154 19.9574 28.4995 20.0994C28.2864 20.2415 28.0549 20.3466 27.8049 20.4148V20.5C28.0719 20.517 28.3404 20.6108 28.6103 20.7812C28.8801 20.9517 29.106 21.196 29.2878 21.5142C29.4696 21.8324 29.5605 22.2216 29.5605 22.6818C29.5605 23.1193 29.4611 23.5128 29.2623 23.8622C29.0634 24.2116 28.7495 24.4886 28.3205 24.6932C27.8915 24.8977 27.3333 25 26.6458 25H23.4924ZM24.5492 24.0625H26.6458C27.3361 24.0625 27.8262 23.929 28.1159 23.6619C28.4086 23.392 28.5549 23.0653 28.5549 22.6818C28.5549 22.3864 28.4796 22.1136 28.329 21.8636C28.1784 21.6108 27.964 21.4091 27.6855 21.2585C27.4071 21.1051 27.0776 21.0284 26.6969 21.0284H24.5492V24.0625ZM24.5492 20.108H26.5094C26.8276 20.108 27.1145 20.0455 27.3702 19.9205C27.6287 19.7955 27.8333 19.6193 27.9838 19.392C28.1373 19.1648 28.214 18.8977 28.214 18.5909C28.214 18.2074 28.0804 17.8821 27.8134 17.6151C27.5463 17.3452 27.123 17.2102 26.5435 17.2102H24.5492V20.108Z" fill="white"/>
                   </svg>
               <span class="namesSpan">Emmanuel Mauer</span>
            </div>
         </div>
           </div>
       </div>
           <div class="subTasksDivClass">
               <span class="SubTaskSpanClass">Subtasks</span>
            <div id="subtasksLargeCardContainerId">
               <div  class="subTaskSingleChildClass">
                   <label class="container">Implement Recipe Recommendation
                       <input type="checkbox" checked="checked">
                       <span class="checkmark"></span>
                     </label>
               </div>
               <div  class="subTaskSingleChildClass">
                   <label class="container">Start Page Layout
                       <input type="checkbox">
                       <span class="checkmark"></span>
                     </label>
               </div>
            </div>
           </div>
           <div class="deleteEditContactDivClass">
               <div id="deleteContactDivId" >  
               </div>
               <div id="editContactDivId">
               </div>
           </div>
`;
}

function findTask() {
  let searchInput = document
    .getElementById("findTaskInputId")
    .value.toLowerCase();

  // If the search input is empty, render all cards to the board
  if (searchInput == "") {
    renderAllCardToBoard();
    return;
  }

  // Reset all boards
  document.getElementById("toDoStatusDivId").innerHTML = "";
  document.getElementById("inProgressStatusDivId").innerHTML = "";
  document.getElementById("awaitFeedbackStatusDivId").innerHTML = "";
  document.getElementById("doneStatusDivId").innerHTML = "";

  // Iterate through the cards to find matching tasks
  for (let i = 0; i < toDoCardsJSON.length; i++) {
    let card = toDoCardsJSON[i];
    let title = card.title ? card.title.toLowerCase() : "";
    let description = card.description ? card.description.toLowerCase() : "";

    // Search through assigned contacts' full names
    let assignedContacts = card.assignedToArray
      ? card.assignedToArray
          .map((contact) => contact.assignedFullName.toLowerCase())
          .join(" ")
      : "";

    // Check if the search input is found in the title, description, or assigned contacts
    if (
      title.includes(searchInput) ||
      description.includes(searchInput) ||
      assignedContacts.includes(searchInput)
    ) {
      // Render the card in the appropriate section
      if (card.toDoStatus == "To do") {
        document.getElementById("toDoStatusDivId").innerHTML +=
          returnSingleCardHTML(i);
      }
      if (card.toDoStatus == "In progress") {
        document.getElementById("inProgressStatusDivId").innerHTML +=
          returnSingleCardHTML(i);
      }
      if (card.toDoStatus == "Await feedback") {
        document.getElementById("awaitFeedbackStatusDivId").innerHTML +=
          returnSingleCardHTML(i);
      }
      if (card.toDoStatus == "Done") {
        document.getElementById("doneStatusDivId").innerHTML +=
          returnSingleCardHTML(i);
      }
      returnAssignedContactCircle(i); // Render the assigned contacts
    }
  }
}
