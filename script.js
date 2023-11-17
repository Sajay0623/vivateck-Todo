// Sample initial tasks
let tasks = JSON.parse(localStorage.getItem('todos')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completeTask')) || [];
  console.log(tasks)

  let activeTask = document.getElementById("activeTask")
    activeTask.addEventListener("click" , ()=>{
        const completedTaskContainer = document.getElementById('completed-task-container');
        completedTaskContainer.innerHTML = '';
        renderTasks()
    })
  let completeTask = document.getElementById("completeTask")
  completeTask.addEventListener("click" , ()=>{
    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = '';
    renderCompletedTasks();
})

// Function to render tasks
function renderTasks() {
    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', task.completed ? 'completed' : "a");
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="openEditModal(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="markCompleted(${task.id})">${task.completed ? 'Undo' : 'Completed'}</button>
            </div>
        `;
        taskContainer.appendChild(taskElement);
    });
}

// Function to add a new task
const newTaskInput = document.getElementById('new-task');
newTaskInput.addEventListener("onKeypress" , (e) => {
    if (e.key === 'Enter') addTask();
  })
function addTask() {
     
    
    const newText = newTaskInput.value.trim();

    if (newText !== '') {
        const newTask = {
            id: tasks.length + 1,
            text: newText,
        };

        tasks.push(newTask);
        newTaskInput.value = '';
        localStorage.setItem('todos', JSON.stringify(tasks))
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('todos', JSON.stringify(tasks))
    renderTasks();
}

// Function to edit a task
// function editTask(taskId) {
//     const newText = prompt('Edit the task:', tasks.find(task => task.id === taskId).text);

//     if (newText !== null) {
//         const editedTask = tasks.find(task => task.id === taskId);
//         editedTask.text = newText.trim();
//         renderTasks();
//     }
// }
function markCompleted(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
        console.log(taskIndex)
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;

        if (tasks[taskIndex].completed) {
            const completedTask = tasks.splice(taskIndex, 1)[0];
            completedTasks.push(completedTask);
            localStorage.setItem("completeTask" , JSON.stringify(completedTasks))

        }
        
        renderTasks();
        
    }
}

// Function to move a task to the completed list
function moveTaskToCompleted(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    const completedTask = tasks.splice(taskIndex, 1)[0];
    completedTasks.push(completedTask);
     
    renderTasks();
    
}

// Function to render completed tasks
function renderCompletedTasks() {
    const completedTaskContainer = document.getElementById('completed-task-container');
    completedTaskContainer.innerHTML = '';

    completedTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', 'completed');
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="moveCompletedTaskBack(${task.id})">Undo</button>
            </div>
        `;
        completedTaskContainer.appendChild(taskElement);
    });
}

// Function to move a completed task back to the main list
function moveCompletedTaskBack(taskId) {
    const taskIndex = completedTasks.findIndex(task => task.id === taskId);
    const movedTask = completedTasks.splice(taskIndex, 1)[0];
    tasks.push(movedTask);
    renderTasks();
    renderCompletedTasks();
}

let editedTaskId = null;

// Function to open the edit modal
function openEditModal(taskId) {
    const editedTask = tasks.find(task => task.id === taskId);

    if (editedTask) {
        editedTaskId = taskId;
        document.getElementById('edited-task').value = editedTask.text;
        document.getElementById('editModal').style.display = 'block';
    }
}

// Function to close the edit modal
function closeEditModal() {
    document.getElementById('edited-task').value = '';
    document.getElementById('editModal').style.display = 'none';
    editedTaskId = null;
}

// Function to save the edited task
function saveEditedTask() {
    const editedText = document.getElementById('edited-task').value.trim();

    if (editedText !== '' && editedTaskId !== null) {
        const editedTaskIndex = tasks.findIndex(task => task.id === editedTaskId);

        if (editedTaskIndex !== -1) {
            tasks[editedTaskIndex].text = editedText;
            closeEditModal();
            renderTasks();
        }
    }
}




function exportToExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tasks);
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    XLSX.writeFile(wb, 'tasks.xlsx');
}

// Initial rendering of tasks
renderTasks();
