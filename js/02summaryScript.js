async function initSummarySite(){
    try {
        toDoCardsJSON = await loadData("/toDoJson");
        contactsJSON = await loadData("/contactsJson");
      
    } catch (error) {
        console.error('Error loading data:', error);
    }
    finally{
        renderToDoInfos();
        renderBoardInfos();
        displayNextToDo()
    }
}

function renderToDoInfos() {
    let toDoNumber = 0;
    let doneNumber = 0;
    let doneMiddleNumber = 0;
    let inProgressNumber = 0;
    let awaitFeedbackNumber = 0;

    for(let i = 0; i < toDoCardsJSON.length; i++){

        if(toDoCardsJSON[i].toDoStatus == "To do"){
            toDoNumber = toDoNumber+1;
        }
        if(toDoCardsJSON[i].toDoStatus == "Done"){
            doneNumber = doneNumber+1;
        } 
        if(toDoCardsJSON[i].prio == "Urgent"){
            doneMiddleNumber = doneMiddleNumber+1;
        }
        if(toDoCardsJSON[i].toDoStatus == "In progress"){
            inProgressNumber = inProgressNumber+1;
        }
        if(toDoCardsJSON[i].toDoStatus == "Await feedback"){
            awaitFeedbackNumber = awaitFeedbackNumber+1;
         }
}
document.getElementById('summaryToDoNumberId').innerText = toDoNumber;
document.getElementById('summaryDoneNumberId').innerText = doneNumber;
document.getElementById('summaryUrgentNumberId').innerText = doneMiddleNumber;
document.getElementById('summaryInProgressNumberId').innerText = inProgressNumber;
document.getElementById('summaryAwaitFeedbackNumberId').innerText = awaitFeedbackNumber;
}

 function renderBoardInfos() {
    let boardAllToDoNumbers = toDoCardsJSON.length;
    document.getElementById('summaryBoardAllNumberId').innerText = boardAllToDoNumbers;
}

function findEarliestDueDate() {
    let earliestDate = new Date(toDoCardsJSON[0].dueDate);
    for(let i = 0; i < toDoCardsJSON.length; i++){
        let currentDate = new Date(toDoCardsJSON[i].dueDate);
        if (currentDate < earliestDate) {
            earliestDate = currentDate;
        }
    }
    return earliestDate;
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
}

function displayNextToDo(){
    let earliestDate = findEarliestDueDate();
    let formattedDate = earliestDate ? formatDate(earliestDate) : 'Keine Termine vorhanden';
    document.getElementById('due-date').textContent = formattedDate;
}




document.addEventListener("DOMContentLoaded", function() {

    let currentUserIndex = userLoginJson.findIndex(u => u.loggedIn == true);
    document.getElementById('userNameGreetingId').innerHTML = userLoginJson[currentUserIndex].accountName;

});


