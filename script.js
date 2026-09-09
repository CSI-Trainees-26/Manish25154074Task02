let taskList = document.querySelector(".task_list");
let completedList = document.querySelector(".completed_list");
function addtask() {
    let inputTask = document.querySelector("#add_task");
    if(inputTask.value.trim()===""){
        return;
    }
    let li = document.createElement("li");
    li.textContent = inputTask.value;
    li.draggable=true;
    li.ondragstart=function(){
        window.draggedItem=li;
    }
    let delBtn=document.createElement("button");
    delBtn.style.padding="0rem";
    delBtn.style.margin="0.5rem";
    delBtn.style.fontSize="smaller" ;
    delBtn.textContent="X";
    delBtn.onclick=function(){
        li.remove();
    }
    let checkBox=document.createElement("input");
    checkBox.type="checkbox";
    checkBox.onclick=function(){
        li.remove();
        completedList.insertAdjacentElement("afterbegin",li);
        checkBox.disabled=true;
    }
    li.appendChild(delBtn);
    li.appendChild(checkBox);
    taskList.insertAdjacentElement("afterbegin", li);
    inputTask.value = ""; 
}
completedList.ondragover=function(e){
    e.preventDefault();
}
completedList.ondrop = function () {
    window.draggedItem.remove();
    completedList.insertAdjacentElement("afterbegin", window.draggedItem);
}
