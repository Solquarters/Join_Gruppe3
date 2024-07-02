function renderSummaryInfos(){
    renderToDoInfos();
    renderDoneInfos();
    renderUrgentInfos();
    renderInProgressInfos();
    renderAwaitFeedbackInfos();
    renderBoardInfos();
}

function renderToDoInfos() {
    let toDoNumber = 0;

    for(let i = 0; i < toDoCardsJSON.length; i++){

        if(toDoCardsJSON[i].toDoStatus == "To do"){
            toDoNumber = toDoNumber+1;
        }
}
document.getElementById('summaryToDoNumberId').innerText = toDoNumber;
}

function renderDoneInfos() {
    let doneNumber = 0;

    for(let i = 0; i < toDoCardsJSON.length; i++){

        if(toDoCardsJSON[i].toDoStatus == "Done"){
            doneNumber = doneNumber+1;
        } 
    }
document.getElementById('summaryDoneNumberId').innerText = doneNumber;
}

function renderUrgentInfos() {
    let doneMiddleNumber = 0;

    for(let i = 0; i < toDoCardsJSON.length; i++){
    
        if(toDoCardsJSON[i].prio == "Urgent"){
            doneMiddleNumber = doneMiddleNumber+1;
        }
    
    }
document.getElementById('summaryUrgentNumberId').innerText = doneMiddleNumber;
}

function renderInProgressInfos() {
   let inProgressNumber = 0;

   for(let i = 0; i < toDoCardsJSON.length; i++){

    if(toDoCardsJSON[i].toDoStatus == "In progress"){
        inProgressNumber = inProgressNumber+1;
    }
}
document.getElementById('summaryInProgressNumberId').innerText = inProgressNumber;
}

function renderAwaitFeedbackInfos() {
    let awaitFeedbackNumber = 0;
 
    for(let i = 0; i < toDoCardsJSON.length; i++){
 
     if(toDoCardsJSON[i].toDoStatus == "Await feedback"){
        awaitFeedbackNumber = awaitFeedbackNumber+1;
     }
 }
 document.getElementById('summaryAwaitFeedbackNumberId').innerText = awaitFeedbackNumber;
 }

 function renderBoardInfos() {
    let boardAllToDoNumbers = toDoCardsJSON.length;
    document.getElementById('summaryBoardAllNumberId').innerText = boardAllToDoNumbers;
}





function findEarliestDueDate(toDoCards) {
    if (!toDoCards || toDoCards.length === 0) {
        return null;
    }

    let earliestDate = new Date(toDoCards[0].dueDate.split('.').reverse().join('-'));

    toDoCards.forEach(card => {
        let currentDate = new Date(card.dueDate.split('.').reverse().join('-'));
        if (currentDate < earliestDate) {
            earliestDate = currentDate;
        }
    });

    return earliestDate;
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
}

let earliestDate = findEarliestDueDate(toDoCardsJSON);
let formattedDate = earliestDate ? formatDate(earliestDate) : 'Keine Termine vorhanden';

document.getElementById('due-date').textContent = formattedDate;
