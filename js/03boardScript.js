
function initializeBoard(){
    renderAllCardToBoard();
}

function renderAllCardToBoard(){
    
    ///Reset all boards
    document.getElementById('toDoStatusDivId').innerHTML = '';
    document.getElementById('inProgressStatusDivId').innerHTML = '';
    document.getElementById('awaitFeedbackStatusDivId').innerHTML = '';
    document.getElementById('doneStatusDivId').innerHTML = '';

    //Get data from toDoCardsJSON
    for(let i = 0; i < Object.keys(toDoCardsJSON).length; i++ ){

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

    //    returnPrioSvgHTML(i);

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

let currentDraggedElement;

function returnSingleCardHTML(i){
    
    return /*html*/`
    <div class="mainSingleCardDivClass" id="singleCardId${i}"
    draggable="true" ondragstart="startDragging(${i})" onclick="openLargeCardOverlay(${i})">

        <div class="cardContainerInnert">
            ${returnCategoryHTML(i)}
            <div id="containerformularId${i}" class="containerformularDivClass">
                <span >${toDoCardsJSON[i]["title"]}</span>
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
                        
                        ${returnPrioSvgHTML(i)}
                    </div>
                </div>     
            </div>
        </div>
    </div>
    `; 
}




function returnCategoryHTML(i){
    if(toDoCardsJSON[i]["category"] == "User Story"){
        return /*html*/ `<div id="cardHeadlineId${i}" class="cardHeadlineClass userStoryClass">
                <span id="">${toDoCardsJSON[i]["category"]}</span>
            </div>`;
    }
    else if(toDoCardsJSON[i]["category"] == "Technical Task"){
        return /*html*/ `<div id="cardHeadlineId${i}" class="cardHeadlineClass technicalTaskClass">
        <span id="">${toDoCardsJSON[i]["category"]}</span>
        </div>`;

    }

}


/////////////////////////////DRAG AND DROP FUNCTION START

function startDragging(index) {
    currentDraggedElement = index;
}
function allowDrop(ev) {
    ev.preventDefault();
}
function moveTo(categoryInput) {
    moveDraggedCardToCategoryInsideJson(categoryInput);

    /////////////////////RENDERE ALLE KARTEN NEU HIER
    // updateHTML();


    document.querySelectorAll('.drag-area-highlight').forEach(function(element) {
        element.classList.remove('drag-area-highlight');
    });

    renderAllCardToBoard();
}







function moveDraggedCardToCategoryInsideJson(categoryInput){
    let tempObject = toDoCardsJSON[currentDraggedElement];

    tempObject.toDoStatus = categoryInput;

    let indexOfFirstCategoryinJson = findIndexOfFirstCategoryInMainJson(categoryInput);
    toDoCardsJSON.splice(currentDraggedElement, 1);

    if(indexOfFirstCategoryinJson >= 1){
        toDoCardsJSON.splice(indexOfFirstCategoryinJson-1, 0, tempObject);
    }
    else{
        toDoCardsJSON.splice(0, 0, tempObject);
    }
}



function highlight(mainCategoryDivId) {
    document.getElementById(mainCategoryDivId).classList.add('drag-area-highlight');
}

function removeHighlight(mainCategoryDivId) {
    document.getElementById(mainCategoryDivId).classList.remove('drag-area-highlight');
}


function handleDragLeave(event, mainCategoryDivId) {
    let rect = document.getElementById(mainCategoryDivId).getBoundingClientRect();
    let x = event.clientX;
    let y = event.clientY;

    // Check if the mouse is outside the parent element
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {

        document.querySelectorAll('.drag-area-highlight').forEach(function(element) {
            element.classList.remove('drag-area-highlight');
        });
    }
}



function findIndexOfFirstCategoryInMainJson(categoryInput) {
    return toDoCardsJSON.findIndex(item => item.toDoStatus === categoryInput);
}


/////////////////////////////DRAG AND DROP FUNCTION END

function returnPrioSvgHTML(i) {
        
        if(toDoCardsJSON[i]["prio"] == "Low"){
            return `<img src="./assets/img/Priority symbols low.svg">`;
           }

           if(toDoCardsJSON[i]["prio"] == "Medium"){
            return `<img src="./assets/img/Priority symbols medium.svg">`;
           }

           if(toDoCardsJSON[i]["prio"] == "Urgent"){
            return `<img src="./assets/img/Priority symbols urgent.svg">`;
           }
           
}



///////////// ROMAN EDIT 
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

        // eventListenerAddTaskOnClickWindowEvent();


        disableScrolling();
        /////SET CSS AND MEDIA QUERY HERE? 
        fitAddTaskCssAttributesToBoardTemplate();
    }
    
    
    function closeAddTaskOverlay(){
        document.getElementById('addEmptyTaskMainOverlayId').style.display="none";
        enableScrolling();
    }

    function handleOverlayClick(event) {
        // Check if the click happened outside the child element
        if (event.target.id === 'addEmptyTaskMainOverlayId') {
            closeAddTaskOverlay();
        }
    }


    
    function openLargeCardOverlay(i){
        document.getElementById('mainLargeCardOverlayId').style.display= "flex";
        disableScrolling();

        ////OVERLAY INHALT MIT JSON TO DO AN STELLE i BEFÜLLEN
        ///////////////SOLLTE EIGENTLICH INS TEMPOBJECT gepackt werden
        /////Bei Edit - AddTask mit TempObject befüllen
        ///SaveChanges - TempArray zu JSON pushen, zu Large Card rendern
        let categorySpan = document.getElementById('largeCardOverlayCategorySpanId')
        categorySpan.innerText = toDoCardsJSON[i].category;
        if(toDoCardsJSON[i]["category"] == "User Story"){
            categorySpan.style.backgroundColor="blue";
        }
        else if(toDoCardsJSON[i]["category"] == "Technical Task"){
            categorySpan.style.backgroundColor="#1FD7C1"; 
        }

        document.getElementById('largeCardTitleSpanId').innerText = toDoCardsJSON[i].title;

        document.getElementById('largeCardDescriptionSpanId').innerText = toDoCardsJSON[i].description;
       
        document.getElementById('largeCardDateSpanId').innerText = toDoCardsJSON[i].dueDate;
        
        document.getElementById('largeCardPrioSpanId').innerHTML = /*html*/`${toDoCardsJSON[i].prio}&nbsp${returnPrioSvgHTML(i)}`;
        

        ///EIGENE FUNKTION: GEHE DURCH JSONTODO[i].assignedTo Array und rendere den Kreis und den Namen
        returnLargeCardAssignedHTML(i);

        //Eigene Funktion 2 : GEHE DURCH JSONTODO[i].subtask Array und rendere text und bool
        /// subtasksLargeCardContainerId
        returnLargeCardSubtasksHTML(i);
    }

function returnLargeCardSubtasksHTML(i){
    document.getElementById('subtasksLargeCardContainerId').innerHTML = '';
    for(let j = 0; j < toDoCardsJSON[i].subtaskJson.length; j++){

        if(toDoCardsJSON[i].subtaskJson[j].subtaskDone){
            document.getElementById('subtasksLargeCardContainerId').innerHTML += /*html*/`
            <div class="subTaskSingleChildClass">
                   <label class="container" >${toDoCardsJSON[i].subtaskJson[j].subtaskText} 
                       <input type="checkbox" checked="checked" onclick="flipSubtaskCheckBool(${i},${j})">
                       <span class="checkmark" ></span>
                     </label>
               </div>
            `;
        }
        else{
            document.getElementById('subtasksLargeCardContainerId').innerHTML += /*html*/`
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

function flipSubtaskCheckBool(i,j){
    toDoCardsJSON[i].subtaskJson[j].subtaskDone = !toDoCardsJSON[i].subtaskJson[j].subtaskDone;
    return toDoCardsJSON[i].subtaskJson[j].subtaskDone; 
}


    function returnLargeCardAssignedHTML(i){
        document.getElementById('assignedLargeCardContainerId').innerHTML = '';
        for(let j = 0; j < toDoCardsJSON[i].assignedToArray.length; j++){
            document.getElementById('assignedLargeCardContainerId').innerHTML += /*html*/`
             <span class="circleAndNameSpanClass2">
            <!-- InitialsCircle -->
            <span class="contactSvgCircleClass2" style="background-color: ${toDoCardsJSON[i].assignedToArray[j].assignedRGB};">${returnInitialsFromTwoWordString(toDoCardsJSON[i].assignedToArray[j].assignedFullName)}</span>
            <!-- Full contact name -->
            <span>${toDoCardsJSON[i].assignedToArray[j].assignedFullName}</span>
        </span>
            `;
        }
    }

    function returnInitialsFromTwoWordString(stringInput) {
        let words = stringInput.split(' ');
        if (words.length === 1) {return words[0][0].toUpperCase();}
        let initials = words[0][0].toUpperCase() + words[1][0].toUpperCase();
        return initials;
      }
    
    function closeLargeCardOverlay(){
        document.getElementById('mainLargeCardOverlayId').style.display= "none";
        enableScrolling();
    }
   
    function handleLargeCardOverlayClick(event){
    // Check if the click happened outside the child element
    if (event.target.id === 'mainLargeCardOverlayId') {
        closeLargeCardOverlay();
        }
    }
  




    function disableScrolling() {
        document.body.style.overflow = 'hidden';
    }
    
    function enableScrolling() {
        document.body.style.overflow = 'auto';
    }

    function fitAddTaskCssAttributesToBoardTemplate(){

        const element = document.querySelector('.' + 'addTaskMainTemplateDivClass');
    
 
    if (element) {
   
     element.style.height = 'auto';
        } else {
     console.warn(`No element found with class ${className}`);
        }

    }






///////////// ROMAN EDIT ENDE
