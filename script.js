const addButton = document.querySelector("#add");
const taskAdderContainer = document.querySelector(".taskAdder");
const textAreaContainer = document.querySelector("#textarea");
const priotityColors2 = document.querySelector(".priotityColors2");
const allColorsOfTaskAdder = document.querySelectorAll(".color2");
const deleteButton = document.getElementById("delete");


let taskArray = [];
let selectedColor = "red";
addButton.addEventListener("click", hide);

let isDeleteActive = false;

deleteButton.addEventListener("click", function () {
    console.log("clickk")
    isDeleteActive = !isDeleteActive;
    if (isDeleteActive) {
        // console.log("isActive");
        deleteButton.setAttribute("fill", "red");
    } else {
        // console.log("is not Active");
        deleteButton.setAttribute("fill", "black");
    }
})


priotityColors2.addEventListener("click", function (event) {
    const selectElement = event.target;

    if (selectElement.classList[0] == "priotityColors2") {
        return;
    }
    selectedColor = selectElement.classList[1];

    allColorsOfTaskAdder.forEach(function (element) {
        element.classList.remove("border");
    })

    selectElement.classList.add("border");


})


textAreaContainer.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key !== "Enter") {
        return;
    }
    const text = textAreaContainer.value;
    textAreaContainer.value = "";
    let taskObj = {
        task: text,
        color: selectedColor,
        id: Date.now(),
    }
    taskArray.push(taskObj);
    ticketMaker(taskArray);
    hide();
})



const ticketContainer = document.querySelector(".taskContainer");
function ticketMaker(tArray) {
    ticketContainer.innerHTML = "";
    tArray.forEach(function (taskObj) {
        let { task, color , id } = taskObj;
        const ticketEle = document.createElement("div");
        ticketEle.classList.add("ticket");
        ticketEle.innerHTML = `<div class="taskColor ${color}"></div>
      <div class="ticketTaskContainer">
        <p> ${task} </p>
        <div class="lockContainer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path
              d="M6 10V20H19V10H6ZM18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM7 11H9V13H7V11ZM7 14H9V16H7V14ZM7 17H9V19H7V17Z">
            </path>
          </svg>
        </div>
      </div>`
        ticketEle.addEventListener("dblclick", function () {
            if (isDeleteActive == false) return;
            // UI Layer
            ticketContainer.removeChild(ticketEle);
            // DataBase Layer
            let filteredTask = taskArray.filter(function (taskObj) {
                return taskObj.id != id;
            });
            taskArray = filteredTask;
        })
        ticketContainer.appendChild(ticketEle);
    })
}

function hide() {
    taskAdderContainer.classList.toggle("hide");
}
console.log(taskArray);