
function initializeBoard(){
    renderSingleCard();
}

function renderSingleCard(){
    
    ///Reset all boards
    document.getElementById('toDoStatusDivId').innerHTML = '';
    document.getElementById('inProgressStatusDivId').innerHTML = '';
    document.getElementById('awaitFeedbackStatusDivId').innerHTML = '';
    document.getElementById('doneStatusDivId').innerHTML = '';

    //Get data from toDoCardsJSON
    for(let i = 0; i < Object.keys(toDoCardsJSON).length; i++ ){

       console.log(toDoCardsJSON[i]["toDoStatus"]); 

       if(toDoCardsJSON[i]["toDoStatus"] == "To do"){
        document.getElementById('toDoStatusDivId').innerHTML += returnSingleCardHTML(i);
       }

       if(toDoCardsJSON[i]["toDoStatus"] == "In progress"){
        document.getElementById('inProgressStatusDivId').innerHTML += returnSingleCardHTML(i);
       }

       if(toDoCardsJSON[i]["toDoStatus"] == "Await feedback"){
        document.getElementById('awaitFeedbackStatusDivId').innerHTML += returnSingleCardHTML(i);
       }

       if(toDoCardsJSON[i]["toDoStatus"] == "Done"){
        document.getElementById('doneStatusDivId').innerHTML += returnSingleCardHTML(i);
       }

       createPrioSvg(i);

    // switch(toDoCardsJSON[i]["toDoStatus"]) {
    //     case "To do":
    //         document.getElementById('toDoStatusDivId').innerHTML += returnSingleCardHTML(i);
    //       break;

    //     case "In progress":
    //         document.getElementById('inProgressStatusDivId').innerHTML += returnSingleCardHTML(i);
    //       break;

    //       case "Await feedback":
    //         document.getElementById('awaitFeedbackStatusDivId').innerHTML += returnSingleCardHTML(i);
    //       break;

    //       case "Done":
    //         document.getElementById('doneStatusDivId').innerHTML += returnSingleCardHTML(i);
    //       break;

    //     default:
    //       // code block
    //   }


    }
}


function returnSingleCardHTML(i){

    return /*html*/`

    <div class="mainSingleCardDivClass">

        <div class="cardContainerInnert">
            <div id="cardHeadlineId${i}" class="cardHeadlineClass">
                <span id="">${toDoCardsJSON[i]["category"]}</span>
            </div>
            <div id="containerformularId${i}" class="containerformularDivClass">
                <span id="">${toDoCardsJSON[i]["title"]}</span>
            </div>

            <div id="descriptionDivId${i}" class="descriptionDivClass">
                <span id="descriptionSpanId${i}">${toDoCardsJSON[i]["description"]}</span>
            </div>

            <br>Progress Bar PLACEHOLDER<br>
            
            <div class="contactPrioDiv">
                <div id="contacts${i}" class="contactCirclesDivClass">
                    <div class="persons">
                        <img id="img1" src="./assets/img/Group 9 (1).svg">
                        <img id="img2" src="./assets/img/Group 9.svg">
                        <img id="img3" src="./assets/img/Profile badge.svg">
                    </div>
                </div>

                <div>
                    <div id="prioDivId${i}" class="prioDiv">
                        <!-- HIER DYNAMISCH SVG HIER EINFÜGEN, JE NACH CATEGORY -->
                        <!-- <img src="./assets/img/Priority symbols (1).svg"> -->
                        Prio:${toDoCardsJSON[i]["prio"]}
                    </div>
                </div>     
            </div>
        </div>
    </div>
    `; 

    

}
function createPrioSvg(i) {
        
        if(toDoCardsJSON[i]["prio"] == "Low"){
            document.getElementById(`prioDivId${i}`).innerHTML = `<img src="./assets/img/Priority symbols low.svg">`;
           }

           if(toDoCardsJSON[i]["prio"] == "Medium"){
            document.getElementById(`prioDivId${i}`).innerHTML = `<img src="./assets/img/Priority symbols medium.svg">`;
           }

           if(toDoCardsJSON[i]["prio"] == "Urgent"){
            document.getElementById(`prioDivId${i}`).innerHTML = `<img src="./assets/img/Priority symbols urgent.svg">`;
           }
           
}



// ROMAN EDIT 
function openEmptyAddTaskOverlay(){
    document.getElementById('addEmptyTaskMainOverlayId').style.display="flex";
        //ZUGRIFF AUF GLOBAL SCRIPT
        renderAddTaskHTMLForBoardOverlay();
    
        emptyTempJson();
        renderContactsDropdownMenuContent();
        setCurrentDateInputMinValue();
        renderProfileCirclesFromTempArray();
        renderSubtaskFromTempArray();
        renderAddTaskSiteFromTempArray();
    }
    
    
    function closeAddTaskOverlay(){
        document.getElementById('addEmptyTaskMainOverlayId').style.display="none";
    }