const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const taskContainer = document.getElementById("task-container");
const taskDiv = document.getElementById("add-or-edit-task-div");
const closeTaskDiv = document.getElementById("close-task-editor");
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const addNewTaskBtn = document.getElementById("add-new-task-btn");
const submitButton = document.getElementById("submit-btn")

let currentTask = {};
const taskData = JSON.parse(localStorage.getItem("data")) || [];


const showNewTask = () => {
taskDiv.classList.toggle("hidden");
addNewTaskBtn.classList.toggle("hidden");
taskContainer.style.display = "none";
}

const addTask = () => {
   if (!titleInput.value.trim()) {
   alert("Please provide a title");
   return;
   }
   const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id)
   const [year, month, day] = dateInput.value.split("-")

   const taskObj = {
    id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: removeSpecialChars(titleInput.value),
    date: `${year}-${month}-${day}`,
    description: removeSpecialChars(descriptionInput.value) 
    }
    if (dataArrIndex === -1) {
      taskData.unshift(taskObj);
    }
    else {
      taskData[dataArrIndex] = taskObj;
    }
    updateTaskContainer();
    taskContainer.style.display = "grid";
    reset();
    localStorage.setItem("data", JSON.stringify(taskData));
}

function removeSpecialChars(str) {
    const regex = /[^a-zA-Z0-9/s]/g;
    return str.replace(regex, "");
}

closeTaskDiv.addEventListener("click", () => {
   const formInputContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    if (formInputContainValues) {
        confirmCloseDialog.showModal();
        return;
    }
    else {
        taskDiv.classList.toggle("hidden");
        addNewTaskBtn.classList.toggle("hidden"); 
        taskContainer.style.display = "grid";
        reset()
    }
})


const updateTaskContainer = () => {
    taskContainer.innerHTML = ``;

    taskData.forEach(
        ({ id, title, date }) => {
            (taskContainer.innerHTML += `
        <div class="task-div" id="${id}">
          <p class="title">Title: <strong>${title}</strong></p>
          <p class="date">Date: <strong>${date !== "-" + undefined + "-" + undefined ? date : "not set"}</strong></p>
          <button onclick="deleteTask(this)" class="delete-task-btn-container">Delete Task</button>
          <button onclick="editTask(this)" class="edit-task-btn-container">Edit Task</button>
        </div>
        `)
    }
  );
};

const reset = () => {
    taskDiv.classList.toggle("hidden");
    addNewTaskBtn.classList.toggle("hidden");
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    currentTask = {};
}

const deleteTask = (buttonEl) => {
    
const dataArrIndex = taskData.findIndex((item) => 
    item.id === buttonEl.parentElement.id
);
    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
}

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => 
    item.id === buttonEl.parentElement.id
    );
    currentTask = taskData[dataArrIndex]

    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;
    showNewTask();
}

addNewTaskBtn.addEventListener("click", showNewTask);

updateTaskContainer();

discardBtn.addEventListener("click",() => {
    reset();
    taskContainer.style.display = "grid";
})

taskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addTask(currentTask);
})