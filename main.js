let textInput = document.getElementById("text-input");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let filterList=[];
let taskList = [];
let mode = "all";
let heartBurst = document.getElementById("heart-burst");

textInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
        createHearts(event);
    }
});
addBtn.addEventListener("click", function(event) {
    addTask();
    createHearts(event);
});


function createHearts(event) {
    let rect = addBtn.getBoundingClientRect();
    let btnCenterX = rect.left + rect.width / 2;
    let btnCenterY = rect.top + rect.height / 2;

    for (let i = 0; i < 5; i++) {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = btnCenterX + "px";
        heart.style.top = btnCenterY + "px";
        
        let angle = Math.random() * Math.PI * 2;
        let distance = Math.random() * 60 + 60;
        heart.style.setProperty('--trans-x', Math.cos(angle) * distance + 'px');
        heart.style.setProperty('--trans-y', Math.sin(angle) * distance + 'px');
        
        heartBurst.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}


for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
            filter(event);
            moveUnderLine(event.target);
        });
    }


// 밑줄 이동 함수 수정
function moveUnderLine(clickedTab) {
    underLine.style.left = clickedTab.offsetLeft + "px";
    underLine.style.width = clickedTab.offsetWidth + "px";
}


function addTask() {

    if (textInput.value.trim() === "") {
        alert("할일을 입력해주세요!");
        return;
    }
    let task = {
        id: randomId(),
        taskContent: textInput.value,
        isComplete: false,
    }
        taskList.push(task);
        textInput.value = ""; // 입력 필드를 비웁니다.
        render();
    
}

function render() {
    let list =[];
    if(mode ==="all"){
        list = taskList;
    }else if(mode ==="not-done" || mode ==="done" ){
        list = filterList;
    }


    let resultHTML = "";

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `
            <div class="task taskCheckedBg">
                <div class="taskDone">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')" class="btn btn-warning"><i class="fas fa-undo"></i></button> 
                    <button onclick="deleteTask('${list[i].id}')" class="btn trash-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>`;
        } else {
            resultHTML += `
            <div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')" class="btn btn-secondary"><i class="fas fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
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
    updateFilteredTasks();

}


function updateFilteredTasks(){
    // 우리가 보고 싶어하는 목록만 골라서 화면에 다시 보여줘요.
    filterList = taskList.filter(task => {
        if(mode === "all") return true;
        return mode === "done" ? task.isComplete : !task.isComplete;
    });
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
}
function filter(event){
    console.log(filter)
    filterList = [];
    mode =event.target.id;
    
    if( mode ==="all"){
        render();
    }else if(mode ==="not-done"){
        for(let i =0; i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            
            }
        }
       render();
    }else if(mode ==="done"){
        for(let i =0; i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            
            }
        }
       render();
    }
}

function randomId() {
    return '_' + Math.random().toString(36).substring(2, 9);
   
}
