let taskList = document.querySelector(".pending_list");
let completedList = document.querySelector(".completed_list");
function addtask() {
    let inputTask = document.querySelector("#add_task");
    if(inputTask.value.trim()===""){
        return;
    }
    let checkBox=document.createElement("input");
    checkBox.type="checkbox";
    checkBox.style.marginLeft="20px";
    checkBox.onclick=function(){
        li.remove();
        completedList.insertAdjacentElement("afterbegin",li);
        checkBox.disabled=true;
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
    delBtn.textContent="Delete";
    delBtn.onclick=function(){
        li.remove();
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
    li.appendChild(checkBox);
    li.appendChild(delBtn);
    li.appendChild(editBtn);
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
    delHabit.textContent="Delete";
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
        waterIndicator.style.color="#30ed63";
    }else
    {
        if(totalWater<3000){
            waterIndicator.style.color="red";
        }
        else if(totalWater===3000){ 
            waterIndicator.style.color="#fbfb51";
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

let today = new Date();
let options = {day: "numeric",month: "long",year: "numeric"
};
document.querySelector(".date").textContent =today.toLocaleDateString("en-IN", options);

let sleepBtn = document.getElementById("calcsleepbtn");
sleepBtn.addEventListener('click' , ()=>{
    console.log("click")
    let bedtime = document.getElementById("bedtime").value;
    let waketime = document.getElementById("waketime").value;
    if(!bedtime || !waketime){
        document.getElementById("sleep-duration").innerText = `Enter both the time first`;
        return;
    }
    let time1 = bedtime.split(":");
    let time2 = waketime.split(":");
    let firsttime = Number(time1[0]) * 60 + Number(time1[1]);
    let secondtime = Number(time2[0]*60 + Number(time2[1]));

    let time = secondtime - firsttime;
    if(time >= 0){
        document.getElementById("sleep-duration").innerText = `${Math.floor(time/60)}hrs and ${time%60} min`;

    }else{
        time += 24*60;
        document.getElementById("sleep-duration").innerText = `${Math.floor(time/60)}hrs and ${time%60} min`;
    }
});
let timerCard = document.getElementById("timer");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let startTimer = document.getElementById("start-timer");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");

let time = 1500;
let timer = null;
function start(){
    clearInterval(timer);
    timer = setInterval(()=>{ 
    if(time > 0){
        time = time - 1;
        let min = Math.floor(time / 60);
        let sec = Math.floor(time % 60);
        if(min < 10){
            minutes.innerText = "0${min}";
        }else{
            minutes.innerText = min;
        }

        if(sec < 10){
            seconds.innerText = "0${sec}";
        }else{
            seconds.innerText = sec;
        }
    }else{
        clearInterval(timer);
    }
    },1000);
}
startTimer.addEventListener('click' , start);
pause.addEventListener('click' , ()=>{
    clearInterval(timer);
})

reset.addEventListener('click' , ()=>{
    time = 1500;
    minutes.innerText = "25";
    seconds.innerText = "00";
    clearInterval(timer);
    timer = null;
});

let boxes=document.querySelectorAll(".box");
let count=0;
let streak=0;
let streakCount=document.querySelector(".streak_count");
boxes.forEach(function(box){
box.addEventListener("click", function () {
  const done = box.style.backgroundColor === "rgb(22, 181, 22)";
  if (done) {
    box.style.backgroundColor = "gray";
    count--;
  } else {
     box.style.backgroundColor = "rgb(22, 181, 22)"
    count++;
  }
  streakCount.textContent = Math.floor(count / 7);
});
});