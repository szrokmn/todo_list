const textInput = document.getElementById("text-input");
const addBtn = document.getElementById("addBtn");
const todoDiv = document.getElementById("todo-id");

let taskCounter = 0;
let savedTasks = {};

// savedTasks = {
//     1: {
//         text : "task text",
//         status: false
//     },
//     2: {
//         text : "task text",
//         status: true
//     }
// }

window.addEventListener("load", () => {
    if (localStorage.getItem("tasks")) {
        savedTasks = JSON.parse(localStorage.getItem("tasks"));
        taskCounter = Object.keys(savedTasks).length;
        for (key in savedTasks) {
            todoDiv.innerHTML += createTask(savedTasks[key].text, key, savedTasks[key].status);
        }
    }
});

addBtn.addEventListener("click", () => {
    if (textInput.value) {
        const task = textInput.value;
        taskCounter++;
        savedTasks[taskCounter] = {
            text: task,
            status: false,
        };
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        todoDiv.innerHTML += createTask(task, taskCounter, false);
        textInput.value = "";
        textInput.focus();
    } else {
        alert("Bir todo metni girin.");
    }
});

document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        addBtn.click();
    }
});

todoDiv.addEventListener("click", (e) => {
    const task = getParentByClass(e.target, "task");
    const taskText = task.innerText.trim();
    const taskID = task.id.replace("task-", "");
    if (e.target.classList.toString().includes("btn-close")) {
        task.remove();

        delete savedTasks[taskID];

        if (Object.keys(savedTasks).length > 0) {
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
        } else {
            localStorage.removeItem("tasks");
            taskCounter = 0;
        }
    } else {
        if (task.querySelector(".fa-circle-check")) {
            const newTask = createTask(taskText, taskID, false);
            savedTasks[taskID].status = false;
            localStorage.setItem("tasks", JSON.stringify(savedTasks));

            const newTaskElement = document.createElement("div");
            newTaskElement.innerHTML = newTask;

            todoDiv.replaceChild(newTaskElement.firstChild, task);
        } else {
            const newTask = createTask(taskText, taskID, true);
            savedTasks[taskID].status = true;
            localStorage.setItem("tasks", JSON.stringify(savedTasks));

            const newTaskElement = document.createElement("div");
            newTaskElement.innerHTML = newTask;

            todoDiv.replaceChild(newTaskElement.firstChild, task);
        }
    }
});

function createTask(taskText, taskNo, done = false) {
    if (done) {
        return `<div class="bg-success rounded text-light d-flex flex-row justify-content-between align-items-center task mt-1" id="task-${taskNo}"><span><i class="fa-regular fa-circle-check"></i> &nbsp;</span>${taskText}<button class="btn-close btn-close-white task-close"></button></div>`;
    } else {
        return `<div class="bg-danger rounded text-light d-flex flex-row justify-content-between align-items-center task mt-1" id="task-${taskNo}"><span><i class="fa-regular fa-circle"></i> &nbsp;</span>${taskText}<button class="btn-close btn-close-white task-close"></button></div>`;
    }
}

function getParentByClass(el, className) {
    do {
        if (el.classList.contains(className)) {
            return el;
        } else {
            el = el.parentNode;
        }
    } while (el && el.parentNode);
}
