// Sample initial tasks
let tasks = JSON.parse(localStorage.getItem('todos')) || [];
  console.log(tasks)
// Function to render tasks
function renderTasks() {
    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <div>
            <button onclick="toggleCompletionTodo(${task.id})">${task.completed ? 'Undo' : 'Completed'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
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
function editTask(taskId) {
    const newText = prompt('Edit the task:', tasks.find(task => task.id === taskId).text);

    if (newText !== null) {
        const editedTask = tasks.find(task => task.id === taskId);
        editedTask.text = newText.trim();
        renderTasks();
    }
}
function toggleCompletionTodo(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
}

function exportToExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tasks);
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    XLSX.writeFile(wb, 'tasks.xlsx');
}

// Initial rendering of tasks
renderTasks();
