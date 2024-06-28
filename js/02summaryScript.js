




function renderSummaryInfos(){
let toDoAnzahl = 0;

for(let i = 0; i < toDoCardsJSON.length; i++){

    if(toDoCardsJSON[i].toDoStatus == "To do"){
        toDoAnzahl = toDoAnzahl+1;
    }
    
    // if(toDoCardsJSON[i].toDoStatus == "andere Kategorie"){}



}

document.getElementById('summaryToDoNumberId').innerText = toDoAnzahl;



}