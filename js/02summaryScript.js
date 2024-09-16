async function initSummarySite() {
  try {
    toDoCardsJSON = await loadData("/toDoJson");
    contactsJSON = await loadData("/contactsJson");
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    renderToDoInfos();
    renderBoardInfos();
    displayNextToDo();
  }
}

function renderToDoInfos() {
  let toDoNumber = 0;
  let doneNumber = 0;
  let doneMiddleNumber = 0;
  let inProgressNumber = 0;
  let awaitFeedbackNumber = 0;

  for (let i = 0; i < toDoCardsJSON.length; i++) {
    if (toDoCardsJSON[i].toDoStatus == "To do") {
      toDoNumber = toDoNumber + 1;
    }
    if (toDoCardsJSON[i].toDoStatus == "Done") {
      doneNumber = doneNumber + 1;
    }
    if (toDoCardsJSON[i].prio == "Urgent") {
      doneMiddleNumber = doneMiddleNumber + 1;
    }
    if (toDoCardsJSON[i].toDoStatus == "In progress") {
      inProgressNumber = inProgressNumber + 1;
    }
    if (toDoCardsJSON[i].toDoStatus == "Await feedback") {
      awaitFeedbackNumber = awaitFeedbackNumber + 1;
    }
  }
  document.getElementById("summaryToDoNumberId").innerText = toDoNumber;
  document.getElementById("summaryDoneNumberId").innerText = doneNumber;
  document.getElementById("summaryUrgentNumberId").innerText = doneMiddleNumber;
  document.getElementById("summaryInProgressNumberId").innerText =
    inProgressNumber;
  document.getElementById("summaryAwaitFeedbackNumberId").innerText =
    awaitFeedbackNumber;
}

function renderBoardInfos() {
  let boardAllToDoNumbers = toDoCardsJSON.length;
  document.getElementById("summaryBoardAllNumberId").innerText =
    boardAllToDoNumbers;
}

function findEarliestDueDate() {
  let earliestDate = new Date(toDoCardsJSON[0].dueDate);
  for (let i = 0; i < toDoCardsJSON.length; i++) {
    let currentDate = new Date(toDoCardsJSON[i].dueDate);
    if (currentDate < earliestDate) {
      earliestDate = currentDate;
    }
  }
  return earliestDate;
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("de-DE", options);
}

function displayNextToDo() {
  let earliestDate = findEarliestDueDate();
  let formattedDate = earliestDate
    ? formatDate(earliestDate)
    : "Keine Termine vorhanden";
  document.getElementById("due-date").textContent = formattedDate;
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the current time in German Standard Time (GMT+1 or GMT+2 depending on daylight saving time)
  let currentDate = new Date();
  let currentHour = currentDate.getUTCHours() + 2; // Add 1 hour to convert UTC to GMT+1

  // Adjust for daylight saving time (DST) in Central European Time (CET)
  let startDST = new Date(currentDate.getFullYear(), 2, 31).getUTCDay();
  let endDST = new Date(currentDate.getFullYear(), 9, 31).getUTCDay();
  if (
    currentDate >= startDST &&
    currentDate <= endDST &&
    currentDate.getTimezoneOffset() < 0
  ) {
    currentHour += 1; // Add another hour if DST is in effect
  }

  // Determine the appropriate greeting
  let greeting;
  if (currentHour >= 4 && currentHour < 12) {
    greeting = "Good Morning,";
  } else if (currentHour >= 12 && currentHour <= 17) {
    greeting = "Good Day,";
  } else if (currentHour >= 18 && currentHour <= 21) {
    greeting = "Good Evening,";
  } else if (currentHour >= 22 || (currentHour >= 0 && currentHour <= 3)) {
    greeting = "Good Night,";
  }
  document.getElementById("daytimeGreetingSpanId").innerHTML = greeting;

  ///Get current user name
  let currentUserIndex = userLoginJson.findIndex((u) => u.loggedIn == true);
  document.getElementById("userNameGreetingId").innerHTML =
    userLoginJson[currentUserIndex].accountName;

  ////Mobile:
  document.getElementById("childGreetingOverlayId").innerHTML = /*html*/ `
    <h1 class="welcome-headline">${greeting}</h1>
    <span class="welcome-under-headline" style="text-align: center;">${userLoginJson[currentUserIndex].accountName}</span>
    `;

  displayGreetingOverlay();
});

function displayGreetingOverlay() {
  let overlay = document.getElementById("mainGreetingOverlayId");

  setTimeout(function () {
    overlay.style.opacity = "0";

    setTimeout(function () {
      overlay.style.display = "none";
    }, 1500);
  }, 1000);
}
