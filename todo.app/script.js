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

let currentTask = {};
const taskData = [];

const addNewTask = () => {
taskDiv.classList.toggle("hidden");
addNewTaskBtn.classList.toggle("hidden");

}

addNewTaskBtn.addEventListener("click", addNewTask)