let taskList = document.querySelector(".pending_list");
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
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
    let newText = prompt("Edit task", li.firstChild.textContent);
    if (newText === null || newText.trim() === "") {
        return;
    }
    li.firstChild.textContent = newText;
    }
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    li.appendChild(checkBox);
    taskList.appendChild(li);
    inputTask.value = ""; 
}
completedList.ondragover=function(comp){
    comp.preventDefault();
}
completedList.ondrop = function () {
    window.draggedItem.remove();
    completedList.insertAdjacentElement("afterbegin", window.draggedItem);
}

let completedHabitList=document.querySelector(".habit_completed_list");
let habitList=document.querySelector(".habit_pending_list");
function addhabit(){
    let inputhabit=document.querySelector("#add_habit");
    if(inputhabit.value.trim()===""){
        return;
    }
    let checkBox=document.createElement("input");
    
    checkBox.type="checkbox";
    checkBox.onclick=function(){
        li.remove();
        completedHabitList.insertAdjacentElement("afterbegin",li);
        checkBox.disabled=true;
    }
    let editHabit=document.createElement("button");
    editHabit.textContent="Edit";
    editHabit.onclick =function(){
        editText=prompt("Edit Habit",li.firstChild.textContent);
        if(editText===null || editText.trim()===""){
            return;
        }
        li.firstChild.textContent=editText;
    }
    let delHabit=document.createElement("button");
    delHabit.textContent="X";
    delHabit.style.padding="0rem";
    delHabit.style.margin="0.5rem";
    delHabit.style.fontSize="smaller" ;
    delHabit.onclick=function(){
        li.remove();
    }
    let li=document.createElement("li");
    li.textContent=inputhabit.value;
    li.draggable=true;
    li.ondragstart=function(){
        window.draggedItem=li;
    }
    completedHabitList.ondragover=function(dr){
        dr.preventDefault();
    }
    completedHabitList.ondrop=function(){
        window.draggedItem.remove();
        completedHabitList.insertAdjacentElement("afterbegin",window.draggedItem);
    }
    li.appendChild(checkBox);
    li.appendChild(editHabit);
    li.appendChild(delHabit);
    habitList.appendChild(li);
    inputhabit.value="";
}

let totalWater=0;
let waterIndicator=document.querySelector(".water_intak");
let btn=document.querySelector(".water_add_btn");
waterIndicator.style.color="red";
btn.addEventListener("click",function(){
    totalWater=totalWater+250;
    let liter=(totalWater/1000).toFixed(2);
    if(totalWater===4000){
        totalWater=0.00;
        waterIndicator.innerHTML="Completed";
        waterIndicator.style.color="#22a846";
    }else
    {
        if(totalWater<3000){
            waterIndicator.style.color="red";
        }
        else if(totalWater===3000){ 
            waterIndicator.style.color="#ffc107";
        }
        waterIndicator.textContent=`${liter} /4L`;
    }
});

fetch("https://www.drivebird.com/api/quotes/random")
    .then(response => response.json())
    .then(data => {
        let quote = data.data[0];
        document.querySelector(".quote").textContent =
            `"${quote.quote}"`;

        document.querySelector(".author").textContent =
            `— ${quote.author}`;
    })
    .catch(error => {
        console.log("Error:", error);
    });

