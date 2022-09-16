const Input = document.getElementById("text-input");
const addBtn = document.getElementById("addBtn");
const todoDiv = document.getElementById("todo-id");

let taskCounter = 0;

addBtn.addEventListener("click", () => {
    if(textInput.value) {
        const task = textInput.value;
        taskCounter++;
        todoDiv.innerHTML += createTask(task, taskCounter);
        textInput.value="";
        textInput.focus();
    }else{
        alert("Please enter text");
    }
});
todo
function createTask(taskText, taskNo){
    return `<div
    class="bg-danger rounded text-light d-flex flex-row justify-content-between align-items-center task" id="task-${taskNo}"><span><i class="fa-regular fa-circle"></i> &nbsp;</span>${taskText}Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, voluptates.<button class="btn-close btn-close-white task-close"></button>
</div>`
}