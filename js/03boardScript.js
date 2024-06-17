let

                function boardToDoTemplate(categoryCard, categoryColorCode, titleCard, descriptionCard, ID, prioCard){
                    return /*html*/`
                    <div id="${ID}" draggable="true" ondragstart="startDragging(${ID})" 
                    onclick="openTaskOverview(${ID}, '${categoryCard}')" class="board_task_container" >
                        <div id="innerContainer${ID}" class="board_task_container_inner">
                            <div class="board_task_container_category" style="background-color: ${categoryColorCode}">${categoryCard}</div>
                            <div class="board_task_container_title_and_description">
                                <div class="board_task_container_title">${titleCard}</div>
                                <div class="board_task_container_description">${descriptionCard}</div>
                            </div>
                            <div class="board_task_progress">
                                <div id="progressParent${ID}">
                                <div class="board_task_progressbar" id="progressbar${ID}"></div>
                                </div>
                                <div class="board_task_progress_text" id="progressbarText${ID}"></div>
                            </div>
                            <div class="board_task_assignments">
                                <div class="board_task_working">
                                    <div class="icons_container" id="board_icons_username${ID}"></div>
                                    <div class="board_prio"><img src="../assets/img/${prioCard}.png" /></div>
                                </div>                            
                            </div>
                        </div>
                    </div> 
                `
                }