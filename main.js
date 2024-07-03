let textInput = document.getElementById("text-input");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".task-tabs div");


let taskList = [];
for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
            filter(event)
        });
    }

addBtn.addEventListener("click", addTask);

function addTask() {
    let task = {
        id: randomId(),
        taskContent: textInput.value,
        isComplete: false,
    }

    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {
            resultHTML += `
            <div class="task taskCheckedBg">
                <div class="taskDone">${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')" class="btn btn-warning"><i class="fas fa-undo"></i></button> <!-- 추가됐습니다!!!!! -->
                    <button onclick="deleteTask('${taskList[i].id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>`;
        } else {
            resultHTML += `
            <div class="task">
                <div>${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')" class="btn btn-secondary"><i class="fas fa-check"></i></button>
                    <button onclick="deleteTask('${taskList[i].id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; // 상태를 토글합니다.
            break;
        }
    }
    render();
}

function deleteTask(id) {
    for(let i =0; i<taskList.length; i++){
            if(taskList[i].id == id){
                taskList.splice(i,1);
                break;
            }

    }
    render();
    // taskList = taskList.filter(function(task) {
    //     return task.id !== id;
    // });
    // render();
}
function filter(event){
    let mode =event.target.id
    let filterList=[]
    if( mode ==="all"){
    render();
    }else if(mode ==="not-done"){
        for(let i =0; i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            
            }
        }
       
    }else if(mode ==="done"){

    }
}

function randomId() {
    return '_' + Math.random().toString(36).substring(2, 9);
}
