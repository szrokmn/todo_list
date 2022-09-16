const Input = document.getElementById("text-input");
const addBtn = document.getElementById("addBtn");
const todoDiv = document.getElementById("todo-id");

let taskCounter = 0;

addBtn.addEventListener("click", () => {
    if(textInput.value) {
        const task = textInput.value;
        
        textInput.value="";
        textInput.focus();
    }else{
        alert("Please enter text");
    }
})