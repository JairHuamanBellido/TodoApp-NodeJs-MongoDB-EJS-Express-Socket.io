const socket = io('http://localhost:3000');

let taskInput = document.getElementById('taskInput');
let btn = document.getElementById('btn');
let taskContainer = document.getElementById('all-task');
let modalNewTask = document.getElementById('modalNewTask');
let modalDeleteTask = document.getElementById('modalDeleteTask');
let modalEditTask = document.getElementById('modalEditTask');
let inputEditTask = document.getElementById('editTaskField');
let _id;
createTask = (task) => {

    let toDoContainer = document.createElement('div');


    toDoContainer.setAttribute("id", task.obj._id + "");
    toDoContainer.setAttribute("class", "task-info")
    toDoContainer.innerHTML = `
    <div class="task-element">
        <div onclick="changeTask(this)" class="check-task" id="${task.obj._id}value"> </div>
        <p id="${task.obj._id}Task"> ${task.obj.task} </p>
        </div>

        <div class="task-options">
        <p onclick="openEditTask(this)" class="edit"><i class="fas fa-pen"></i></p>
        <p onclick="openDeleteTask(this)" class="delete"><i class="fas fa-trash"></i></p>

    </div>  
    `;

    taskContainer.appendChild(toDoContainer);
}

btn.addEventListener('click', () => {

    socket.emit('new task', { task: taskInput.value });
    taskInput.value = "";
})
socket.on('new task recevied', function (data) {

    console.log(data.obj);
    createTask(data);
});


changeTask = (element) => {

    let id = element.parentElement.parentElement.getAttribute("id");

    // DEBUG
    console.log("Id: " + id);


    socket.emit('change value', {
        id: id
    });
}

openDeleteTask = (element) => {
    let id = element.parentElement.parentElement.getAttribute("id");
    modalDeleteTask.style.display = "flex";

    document.getElementById('btn-deleteTask').addEventListener('click', () => {
        socket.emit('delete task', { id: id });
        document.getElementById(id + "").remove();
    })

}

openEditTask = (element) => {
    let id = element.parentElement.parentElement.getAttribute("id");
    modalEditTask.style.display = "flex";
    console.log(id);

    socket.emit('search task', { id: id });

}


closeModal = (element) => {
    element.parentElement.parentElement.parentElement.style.display = "none";
}

openModal = () => {
    modalNewTask.style.display = "flex";
}



socket.on('change value', (data) => {


    let element = document.getElementById(data.id + "value");
    console.log(element);
    console.log(`Respuesta ${data.id}`);

    (data.complete) ? element.setAttribute("class", "completeTask") :
        element.setAttribute("class", "check-task");

})

socket.on('change task', (data) => {
    console.log(data.obj._id);
    inputEditTask.value = data.obj.task;
    _id = data.obj._id;
})

socket.on('modify task' , (data)=>{
    document.getElementById(data.id + "Task").textContent = data.task;
    inputEditTask.value = "";

    console.log("Modified");

})

document.getElementById('btn-editTask').addEventListener('click', () => {
    
    if (inputEditTask.value !== "") {
        socket.emit('change task', { id: _id, task: inputEditTask.value });
    }
    else {
        alert("You have to write a task");
    }
})