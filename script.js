const addButton = document.querySelector("#add");
const taskAdderContainer = document.querySelector(".taskAdder");
const textAreaContainer = document.querySelector("#textarea");
const priotityColors2 = document.querySelector(".priotityColors2");
const allColorsOfTaskAdder = document.querySelectorAll(".color2");
const deleteButton = document.getElementById("delete");
const priorityColorContainer = document.querySelector(".priotityColors");
const allTaskButton = document.querySelector("#all");

let taskArray = [];
let selectedColor = "red";
let allColors = ["red", "blue", "green", "orange"];

let taskFromLocalStorage = localStorage.getItem("TaskArray");

if (taskFromLocalStorage) {
    taskArray = JSON.parse(taskFromLocalStorage);
    ticketMaker(taskArray);
}

priorityColorContainer.addEventListener("click", function (event) {
    const selectedEle = event.target;
    if (selectedEle.classList[0] == "priotityColors") {
        return;
    }
    const priorityColors = selectedEle.classList[1];

    const filteredTask = taskArray.filter(function (taskObj) {
        return taskObj.color == priorityColors;
    });
    ticketMaker(filteredTask);
});

allTaskButton.addEventListener("click", function () {
    ticketMaker(taskArray);
})

const lockIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path></svg>';
const unlockIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="red"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path></svg>';

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
    updateLocalStorage();
    ticketMaker(taskArray);
    hide();
})
const ticketContainer = document.querySelector(".taskContainer");

function ticketMaker(tArray) {
    ticketContainer.innerHTML = "";
    tArray.forEach(function (taskObj) {
        let { task, color, id } = taskObj;
        const ticketEle = document.createElement("div");
        ticketEle.classList.add("ticket");
        ticketEle.innerHTML = `<div class="taskColor ${color}"></div>
      <div class="ticketTaskContainer">
        <p class="text"> ${task} </p>
        <div class="lockContainer">
           ${lockIcon}
        </div>
      </div>` ;
        const taskColorEle = ticketEle.querySelector(".taskColor");
        const lockContainer = ticketEle.querySelector(".lockContainer");
        const taskTextEle = ticketEle.querySelector(".text");

        let isEditable = false;
        lockContainer.addEventListener("click", function () {
            isEditable = !isEditable;
            if (isEditable) {
                lockContainer.innerHTML = unlockIcon;
                taskTextEle.setAttribute("contentEditable", "true");
            } else {
                lockContainer.innerHTML = lockIcon;
                taskTextEle.setAttribute("contentEditable", "false");
                let newTaskText = taskTextEle.innerHTML;
                taskObj.task = newTaskText;
            }
        })

        taskColorEle.addEventListener("click", function () {
            let currentColor = taskObj.color;
            let currentColorIndex = allColors.indexOf(currentColor);
            let nextColorIndex = 0;

            if (currentColorIndex != allColors.length - 1) {
                nextColorIndex = currentColorIndex + 1;
            }

            let nextColor = allColors[nextColorIndex];
            // UI Layer
            taskColorEle.classList.remove(currentColor);
            taskColorEle.classList.add(nextColor);
            // Data Layer
            taskObj.color = nextColor;
            updateLocalStorage();
        })


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
        updateLocalStorage();
    })
}

addButton.addEventListener("click", hide);
function hide() {
    taskAdderContainer.classList.toggle("hide");
}
console.log(taskArray);

function updateLocalStorage() {
    localStorage.setItem("TaskArray", JSON.stringify(taskArray))
}