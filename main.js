//유저가 값을 입력한다.
//+클릭하면 아이템이 더해진다
//delete 누르면 할일이 삭제된다.
//check 누르면 밑줄이 그어진다
//1.check 누르면 클린하는 순간 true false
//진행중 끝남 탭을 누르면 언더바가 이동한다 true
//끝남탭은 끝난 아이템만 진행중탭은 진행중 false

let textInput = document.getElementById("text-input");
let addBtn =document.getElementById("add-btn");
let taskList =[];


addBtn.addEventListener("click",addTask);

function addTask(){
    
    let task ={
      
        taskContent : textInput.value,
        isComplete:false,
        
    }


    taskList.push(task);
    console.log(taskList)
    render();
}

function render(){
    let resultHTML ="";
    for(let i= 0; i < taskList.length; i++){
        resultHTML +=
        `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete()">check</button>
                <button onclick="toggleDelete()">delete</button>
            </div>
        </div>`;
       
    }
    document.getElementById("task-board").innerHTML = resultHTML;
   }

   function toggleComplete(){


   }