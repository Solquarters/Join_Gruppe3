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

function resize(e) {
    const newHeight = initialHeight + (e.clientY - initialY);
    if (newHeight > 64) { // Ensure the textarea does not shrink below its initial height
        textarea.style.height = newHeight + 'px';
    }
}

// Auto Resize main input field
function autoResize(idName) {
    const inputTextArea = document.getElementById(idName);
    inputTextArea.style.height = "auto";
    inputTextArea.style.height = inputTextArea.scrollHeight + 10 + "px";
}

//Call whenever a task is created 
//   function resetTextAreaSize(idName, height) {
//     inputTextArea = document.getElementById(idName);
//     inputTextArea.style.height = height + "px";
//   }
  
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