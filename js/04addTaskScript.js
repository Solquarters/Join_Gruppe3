const textarea = document.getElementById('descriptionTextAreaId');
const handle = document.querySelector('.resizeHandleClass');

let initialHeight;
let initialY;

///////////////////////////
///Text area drag is buggy - when mouseup outside the textarea handler problems can occur!
//////////////////////////
handle.addEventListener('mousedown', function(e) {
    // e.preventDefault();
    initialHeight = textarea.offsetHeight;
    initialY = e.clientY;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});
function stopResize() {
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
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
  
function setPriority(ButtonId,SVGfillId1,SVGfillId2){
    for(let i= 1; i < 4; i++){
        let prioButtonId = `prioButtonId${i}`;
        document.getElementById(prioButtonId).style.backgroundColor = "white";
        document.getElementById(prioButtonId).style.color = "black";

        switch(i) {
            case 1:
            document.getElementById('prioIconfillId1').style.fill="#FF4207";
            document.getElementById('prioIconfillId2').style.fill="#FF4207";
            break;
            case 2:
            document.getElementById('prioIconfillId3').style.fill="#FFA800";
            document.getElementById('prioIconfillId4').style.fill="#FFA800";
            break;
            case 3:
            document.getElementById('prioIconfillId5').style.fill="#7AE229";
            document.getElementById('prioIconfillId6').style.fill="#7AE229";
            break;
          }
    }
    switch(ButtonId) {
        case "prioButtonId1":
            document.getElementById(ButtonId).style.backgroundColor = "#FF3D00";
            break;
        case "prioButtonId2":
            document.getElementById(ButtonId).style.backgroundColor = "#FFA800";
            break;
        case "prioButtonId3":
            document.getElementById(ButtonId).style.backgroundColor = "#7AE229";
            break;
      }
    document.getElementById(ButtonId).style.color ="white";
    document.getElementById(SVGfillId1).style.fill="white";
    document.getElementById(SVGfillId2).style.fill="white"; 
}




function selectOption(element) {
    let checkboxChecked = element.querySelector('.checkbox-checked');
    let checkboxUnchecked = element.querySelector('.checkbox-unchecked');

    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        checkboxChecked.style.display = 'none';
        checkboxUnchecked.style.display = 'block';
    } else {
        element.classList.add('selected');
        checkboxChecked.style.display = 'block';
        checkboxUnchecked.style.display = 'none';
    }
}

///////////////////////////
// Dropdown Menu Contact script
function toggleDropdown(thisElement) {
    let dropdownButton = document.querySelector('.dropbtn');
    let dropdownContent = document.getElementById("dropdownContactAssignId");
    dropdownButton.classList.toggle("active");
    dropdownContent.classList.toggle("show");

    
    
    if (thisElement.classList.contains('open')) {
        thisElement.style.backgroundImage = "url('./assets/img/addTaskImg/inputArrowDownHover.svg')";}
        else{
            thisElement.style.backgroundImage = "url('./assets/img/addTaskImg/inputArrowUp.svg')";
        }
        thisElement.classList.toggle('open');
}

// Close the dropdown if the user clicks outside of it, except when clicking on the checkboxes
window.onclick = function(event) {

    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdownContactDivClass')) {
        let dropdowns = document.getElementsByClassName("dropdownContactDivClass");
        let dropdownButtons = document.getElementsByClassName("dropbtn");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        for (let i = 0; i < dropdownButtons.length; i++) {
            let activeButton = dropdownButtons[i];
            if (activeButton.classList.contains('active')) {
                activeButton.classList.remove('active');
            }
        }
        //On click outside the input - change background arrow to default state
        contactInputId = document.getElementById('contactsInputId');
        contactInputId.classList.remove('open')
        contactInputId.style.backgroundImage = "url('./assets/img/addTaskImg/inputArrowDown.svg')";

        
    }

    //On click outside the category input - change background arrow to default state
    if(!event.target.matches('.categorySelectClass')){
        categorySelectId = document.getElementById('categorySelectId');
        categorySelectId.classList.remove('open')
        categorySelectId.style.backgroundImage = "url('./assets/img/addTaskImg/inputArrowDown.svg')";
    }

}

function toggleCategoryDropdown() {
    let dropdownButton = document.querySelector('.dropbtn');
    let dropdownContent = document.getElementById("dropdownCategoryAssignId");
    dropdownButton.classList.toggle("active");
    dropdownContent.classList.toggle("show");
}


function displayAddAndDeleteSubtasksButtons(){
    document.getElementById('deleteSubtaskInputId').style.display="flex";
    document.getElementById('addSubtaskInputId').style.display="flex";

    if(document.getElementById('subtaskTextareaId').value == 0){
        document.getElementById('deleteSubtaskInputId').style.display="none";
        document.getElementById('addSubtaskInputId').style.display="none";
    }
}


function clearSubtaskInput(){
    document.getElementById('subtaskTextareaId').value = '';
    displayAddAndDeleteSubtasksButtons();
}

function renderAndSafeSubtask(){
    if(document.getElementById('subtaskTextareaId').value == 0)
        {return;}
    /////////////Safe to Task JSON HERE/////////////
    document.getElementById('subtasksDivContainerClass').innerHTML += 
    //////////////PEN AND DELETE ICONS ////////////// TEXTAREA, make editable onclick
    // onclick pen and trashbin
    /*html*/ `
    <div onclick="this.contentEditable='true';" class="subtaskDynamicDivClass" onmouseover="showIcons(this)" onmouseout="hideIcons(this)">
    <div id="subtaskTextDivId">&nbsp&nbsp•&nbsp   ${document.getElementById('subtaskTextareaId').value} </div>
    <div class="iconsClass">
            <img src="./assets/img/addTaskImg/smallEditSVG.svg" alt=""  onclick="editParentDivText()">
            <img src="./assets/img/addTaskImg/smallDeleteSVG.svg" alt="" onclick="deleteSubtask(this)" >
        </div>
    </div>
    `
    document.getElementById('subtaskTextareaId').value = '';

    document.getElementById('deleteSubtaskInputId').style.display="none";
    document.getElementById('addSubtaskInputId').style.display="none";
    }

   function showIcons(element) {
    document.querySelectorAll('.iconsClass').forEach(icons => icons.style.display = 'none');
    element.querySelector('.iconsClass').style.display = 'flex';
}

    function hideIcons(element) {
    element.querySelector('.iconsClass').style.display = 'none';
}


function deleteSubtask(element){
    const grandparent = element.parentElement.parentElement;
    grandparent.remove();

}

function editParentDivText() {
    // Find the subtaskTextDivId within the parent div
    let subtaskTextDiv = document.getElementById('subtaskTextDivId');
    
    // Make the subtaskTextDiv editable
    subtaskTextDiv.contentEditable = 'true';
    
    // Set focus on the subtaskTextDiv and move cursor to the end of the text content
    let range = document.createRange();
    let selection = window.getSelection();
    range.selectNodeContents(subtaskTextDiv);
    range.collapse(false); // collapse range to end
    selection.removeAllRanges();
    selection.addRange(range);
}


function changeInputArrow(inputElement){
    if (!inputElement.classList.contains('open')) {
    inputElement.style.backgroundImage = "url('./assets/img/addTaskImg/inputArrowDownHover.svg')";}
}

function changeBackInputArrow(inputElement){

    if (!inputElement.classList.contains('open')) {
        inputElement.style.backgroundImage = "url('./assets/img/addTaskImg/inputArrowDown.svg')";
      }
   
}