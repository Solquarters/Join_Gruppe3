const BASE_URL =
  "https://testprojekt01-812cb-default-rtdb.europe-west1.firebasedatabase.app/";
  
let contactsJSON = [];

let toDoCardsJSON = [];

let defaultGuestAccount = [
  {
    accountName: "Guest",
    email: "account@guest.com",
    password: "guestpassword",
    loggedIn: false,
  },
];

// Fetch user login data from local storage
let userLoginJson =
  JSON.parse(localStorage.getItem("userLoginJson")) || defaultGuestAccount;

let inBoardAddTask = false;
let currentLargeCardIndex = -1;

// ROMANS EDIT START
function renderAddTaskHTMLForBoardOverlay() {
  document.getElementById("addEmptyTaskChildOverlayId").innerHTML =
    returnAddTaskSiteHTML();
}

// ADD TASK HTML TEMPLATE
function addTaskSiteHTML() {
  document.getElementById("addTaskMotherDivId").innerHTML =
    returnAddTaskSiteHTML();
}

function returnAddTaskSiteHTML() {
  return /*HTML*/ `
   <div class="successMainOverlayParent" id="successOverlayId">
    <div class="successMessageMainDiv">
            <p>Added new card to the board!</p>
           
            <p>Redirecting to board...</p>
            
            <div class="loader" style="margin: 18px 0px"></div>
    </div>
   </div>
   <div class="addTaskMainTemplateDivClass">

   
  

       <h1>Add Task</h1>
       <div class="addTaskDetailsParentDivClass">

        

           <div class="leftSideChildDivClass">
               <span>Title<span style="color: red;">*</span></span>
               <input id="titleInputId" type="text" class="singleLineInputClass" placeholder="Enter a title" required>
               <br>
               <br>
               Description
               <div class="textarea-container">
                   <textarea id="descriptionTextAreaId" oninput="autoResize('descriptionTextAreaId')" placeholder="Write a task description"></textarea>
                   <div class="resizeHandleClass"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M18.9 0V1.69C18.9017 2.31796 18.7788 2.94002 18.5385 3.52019C18.2982 4.10036 17.9452 4.62712 17.5 5.07L5.07 17.5C4.62712 17.9452 4.10036 18.2982 3.52019 18.5385C2.94002 18.7788 2.31796 18.9017 1.69 18.9H0L18.9 0Z" fill="#D1D1D1"/>
                       <path d="M18.9001 6.31006V8.00006C18.9006 8.62786 18.7772 9.2496 18.537 9.82961C18.2967 10.4096 17.9444 10.9365 17.5001 11.3801L11.3801 17.5001C10.9365 17.9444 10.4096 18.2967 9.82961 18.537C9.2496 18.7772 8.62786 18.9006 8.00006 18.9001H6.31006L18.9001 6.31006Z" fill="#D1D1D1"/>
                       <path d="M18.8999 12.4302V14.1202C18.9005 14.748 18.7771 15.3697 18.5369 15.9497C18.2966 16.5297 17.9442 17.0566 17.4999 17.5002C17.0564 17.9445 16.5295 18.2969 15.9495 18.5371C15.3695 18.7773 14.7477 18.9007 14.1199 18.9002H12.4299L18.8999 12.4302Z" fill="#D1D1D1"/>
                       </svg>
                       </div>
               </div>
               <br>
               <span>Assigned to</span>    
               <div class="dropdown">
                   <input type="text" id="contactsInputId" placeholder="Select contacts to assign" class="singleLineInputClass dropbtn backGroundArrowClass" 
                   onclick="toggleDropdown(this)" onmouseover="changeInputArrow(this)" onmouseleave="changeBackInputArrow(this)" oninput="searchContactsDropdown(); openDropdownOnInput(this)" >
                   
                   <div id="dropdownContactAssignId" class="dropdownContactDivClass">
                   </div>

               </div>
              
               <div class="userContactCirclesDivClass" id="assignedUsersCircleDivId">
                   
               </div>
           </div>

           <!-- Add seperator at main site, no seperator at overlay! id => display none -->
           <div class="verticalDivSeperatorClass" id="divSeperatorId1"></div>

           <div class="rightSideChildDivClass">
               <span>Due date<span style="color: red;">*</span></span><br>
              
               <div class="textarea-container">
                   <input id="datePickerInputId" type="date"  min="" onchange="updateDateInTempArray()" class="singleLineInputClass" placeholder="dd/mm/yyyy" required max="9999-12-31">
                   

               </div>
               <br>
               <br>
               Prio <br>
               <div class="prioButtonDivClass">
                   

                   <button id="prioButtonId1" onclick="setPriority('prioButtonId1','prioIconfillId1','prioIconfillId2')"  class="priorityButtonClass">Urgent &nbsp
                       <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00" id="prioIconfillId1"/>
                           <path d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z" fill="#FF3D00" id="prioIconfillId2"/>
                           </svg>
                   </button>

                   <button id="prioButtonId2" onclick="setPriority('prioButtonId2','prioIconfillId3','prioIconfillId4')"class="priorityButtonClass">Medium &nbsp 
                       <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M19.7596 7.91693H1.95136C1.66071 7.91693 1.38197 7.80063 1.17645 7.59362C0.970928 7.3866 0.855469 7.10584 0.855469 6.81308C0.855469 6.52032 0.970928 6.23955 1.17645 6.03254C1.38197 5.82553 1.66071 5.70923 1.95136 5.70923H19.7596C20.0502 5.70923 20.329 5.82553 20.5345 6.03254C20.74 6.23955 20.8555 6.52032 20.8555 6.81308C20.8555 7.10584 20.74 7.3866 20.5345 7.59362C20.329 7.80063 20.0502 7.91693 19.7596 7.91693Z" fill="#FFA800" id="prioIconfillId3"/>
                           <path d="M19.7596 2.67376H1.95136C1.66071 2.67376 1.38197 2.55746 1.17645 2.35045C0.970928 2.14344 0.855469 1.86267 0.855469 1.56991C0.855469 1.27715 0.970928 0.996386 1.17645 0.789374C1.38197 0.582363 1.66071 0.466064 1.95136 0.466064L19.7596 0.466064C20.0502 0.466064 20.329 0.582363 20.5345 0.789374C20.74 0.996386 20.8555 1.27715 20.8555 1.56991C20.8555 1.86267 20.74 2.14344 20.5345 2.35045C20.329 2.55746 20.0502 2.67376 19.7596 2.67376Z" fill="#FFA800" id="prioIconfillId4"/>
                           </svg>
                           
                   </button>
                   
                   <button id="prioButtonId3" onclick="setPriority('prioButtonId3','prioIconfillId5','prioIconfillId6')" class="priorityButtonClass">Low &nbsp
                       <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                       <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229" id="prioIconfillId5"/>
                       <path d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z" fill="#7AE229" id="prioIconfillId6"/>
                       </svg>
                   </button> <br>

               </div>
               <br>
               <br>


            
             Category<span style="color: red;">*</span> 
                   <form id="categoryMainFormId">
                   <select id="categorySelectId" required class="singleLineInputClass backGroundArrowClass categorySelectClass" onchange="this.style.color='black'; changeCategoryInTempArray(this.value)" onmouseover="changeInputArrow(this)" onmouseleave="changeBackInputArrow(this)" onclick="toggleDropdown2(this)" required style="color: gray;">
                       <option  value="" disabled selected hidden  id="categoryDropdownPlaceholderId">Select Task Category</option>
                       <option value="Technical Task" onclick="changeFontColorOfCategoryInput()">Technical Task</option>
                       <option value="User Story" onclick="changeFontColorOfCategoryInput()">User Story</option>
                   </select>
                   </form>

              

               <br>
               <br>

               Subtasks
               <textarea name="" id="subtaskTextareaId" class="addSubtaskTextInputClass" placeholder="Add new subtask" oninput="displayAddAndDeleteSubtasksButtons()"></textarea>
               <div class="resizeHandleClass2" >
                   <div class="subtaskFirstIconDiv">
                   <div class="littleCircleDivClass2" id="deleteSubtaskInputId" style="display: none;" onclick="clearSubtaskInput()">
                       <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                           </svg>
                           
                   </div>

                   <div class="littleCircleDivClass2" id="addSubtaskInputId" style="display: none;" onclick="renderAndSafeSubtask()">
                       <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M5.79923 9.15L14.2742 0.675C14.4742 0.475 14.7117 0.375 14.9867 0.375C15.2617 0.375 15.4992 0.475 15.6992 0.675C15.8992 0.875 15.9992 1.1125 15.9992 1.3875C15.9992 1.6625 15.8992 1.9 15.6992 2.1L6.49923 11.3C6.29923 11.5 6.0659 11.6 5.79923 11.6C5.53256 11.6 5.29923 11.5 5.09923 11.3L0.79923 7C0.59923 6.8 0.503397 6.5625 0.51173 6.2875C0.520064 6.0125 0.62423 5.775 0.82423 5.575C1.02423 5.375 1.26173 5.275 1.53673 5.275C1.81173 5.275 2.04923 5.375 2.24923 5.575L5.79923 9.15Z" fill="black"/>
                           </svg>  
                   </div>
               </div>
               </div>

                   <div class="subtasksDivContainerClass" id="subtasksDivContainerId"></div>
       </div>
       </div>
       <div class="clearCreateTaskButtonDivClass" >
           <span><span style="color: red;">*</span>This field is required</span>
           <div class="clearCreateTaskButtonDivChildClass" style="padding: 0px 0px 20px 0px">
               <button class="clearCreateButtonClass1" onclick="clearAddTaskForm()" id="clearCreateDivId1">Clear&nbsp
                   <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                       </svg>  
               </button>
              <button class="clearCreateButtonClass2" onclick="submitAddTaskForm()" id="clearCreateDivId2">Create Task&nbsp
               <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M5.79923 9.15L14.2742 0.675C14.4742 0.475 14.7117 0.375 14.9867 0.375C15.2617 0.375 15.4992 0.475 15.6992 0.675C15.8992 0.875 15.9992 1.1125 15.9992 1.3875C15.9992 1.6625 15.8992 1.9 15.6992 2.1L6.49923 11.3C6.29923 11.5 6.0659 11.6 5.79923 11.6C5.53256 11.6 5.29923 11.5 5.09923 11.3L0.79923 7C0.59923 6.8 0.503397 6.5625 0.51173 6.2875C0.520064 6.0125 0.62423 5.775 0.82423 5.575C1.02423 5.375 1.26173 5.275 1.53673 5.275C1.81173 5.275 2.04923 5.375 2.24923 5.575L5.79923 9.15Z" fill="white"/>
                   </svg> 
              </button> 
              <button class="clearCreateButtonClass2" onclick="submitEditingCard()" id="clearCreateDivId3" style="display:none">Ok&nbsp
               <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M5.79923 9.15L14.2742 0.675C14.4742 0.475 14.7117 0.375 14.9867 0.375C15.2617 0.375 15.4992 0.475 15.6992 0.675C15.8992 0.875 15.9992 1.1125 15.9992 1.3875C15.9992 1.6625 15.8992 1.9 15.6992 2.1L6.49923 11.3C6.29923 11.5 6.0659 11.6 5.79923 11.6C5.53256 11.6 5.29923 11.5 5.09923 11.3L0.79923 7C0.59923 6.8 0.503397 6.5625 0.51173 6.2875C0.520064 6.0125 0.62423 5.775 0.82423 5.575C1.02423 5.375 1.26173 5.275 1.53673 5.275C1.81173 5.275 2.04923 5.375 2.24923 5.575L5.79923 9.15Z" fill="white"/>
                   </svg> 
              </button> 
           </div>
       </div>

   </div>
</div>


`;
}

function findIndexOfFirstCategoryInMainJson(categoryInput) {
  return toDoCardsJSON.findIndex((item) => item.toDoStatus === categoryInput);
}

function returnInitialsFromTwoWordString(stringInput) {
  if (stringInput) {
    // Trim any leading or trailing spaces from the input
    stringInput = stringInput.trim();

    // Split the string by spaces
    let nameArray = stringInput.split(" ");

    // Filter out any empty strings from the array (in case of multiple spaces)
    nameArray = nameArray.filter((name) => name.length > 0);

    // Handle different cases based on the length of the nameArray
    if (nameArray.length === 0) {
      return ""; // No words in the string
    } else if (nameArray.length === 1) {
      return nameArray[0][0].toUpperCase(); // Single word, return its first letter
    } else if (nameArray.length >= 2) {
      // Two or more words, return the initials of the first two words
      let initials =
        nameArray[0][0].toUpperCase() + nameArray[1][0].toUpperCase();
      return initials;
    }
  } else {
    return ""; // If stringInput is falsy (e.g., null or undefined), return an empty string
  }
}

/////Database

async function putData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

///Fetching data
async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseAsJson = await response.json();
  return responseAsJson;
}

function logout() {
  for (let i = 0; i < userLoginJson.length; i++) {
    userLoginJson[i].loggedIn = false;
  }
  localStorage.setItem("userLoginJson", JSON.stringify(userLoginJson));
  window.location.href = "07logIn.html";
}

function getFullNameStringFromContacts(i) {
  return contactsJSON[i].firstName + " " + contactsJSON[i].lastName;
}

async function removeAssignedNameFromToDoCards(i) {
  let assignedFullNameString = getFullNameStringFromContacts(i);

  // Iterate through each card in toDoCardsJSON
  toDoCardsJSON.forEach((card, index) => {
    // Filter the assignedToArray by removing the object with the matching assignedFullName
    const originalLength = card.assignedToArray.length;
    card.assignedToArray = card.assignedToArray.filter(
      (assigned) => assigned.assignedFullName !== assignedFullNameString
    );

    // Debugging - Log if something was removed
    if (card.assignedToArray.length !== originalLength) {
      console.log(`Removed ${assignedFullNameString} from card index ${index}`);
    }
  });

  // Update the toDoCardsJSON via putData if needed
  try {
    await putData("/toDoJson", toDoCardsJSON);
  } catch (error) {
    console.error("Error updating toDoCardsJSON:", error);
  }
}
