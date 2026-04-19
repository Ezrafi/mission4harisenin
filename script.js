// Ambil elemen dari HTML
const taskInput = document.getElementById('task-input');
const priorityInput = document.getElementById('priority-input');
const submitBtn = document.getElementById('submit-btn');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
const deleteAllBtn = document.getElementById('delete-all-btn');
const dateDisplay = document.getElementById('current-date');

// Tampilkan Tanggal Hari Ini
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateDisplay.innerText = new Date().toLocaleDateString('id-ID', options);

let tasks = [];

// Fungsi Tambah Tugas
submitBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    const priority = priorityInput.value;
    
    if (taskText === "") return alert("Isi tugas terlebih dahulu!");

    const newTask = {
        id: Date.now(),
        text: taskText,
        priority: priority,
        date: new Date().toLocaleString('id-ID'),
        isDone: false
    };

    tasks.push(newTask);
    taskInput.value = ""; // Kosongkan input
    renderTasks();
});

// Fungsi untuk menggambar list ke layar
function renderTasks() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item priority-${task.priority}`;
        
        taskDiv.innerHTML = `
            <input type="checkbox" ${task.isDone ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <div class="task-info">
                <strong class="${task.isDone ? 'completed' : ''}">${task.text}</strong>
                <p>${task.date} | Prioritas: ${task.priority}</p>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Hapus</button>
        `;

        if (task.isDone) {
            doneList.appendChild(taskDiv);
        } else {
            todoList.appendChild(taskDiv);
        }
    });
}

// Fungsi pindah ke DONE
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) task.isDone = !task.isDone;
        return task;
    });
    renderTasks();
}

// Fungsi hapus satu
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Fungsi hapus semua
deleteAllBtn.addEventListener('click', () => {
    if(confirm("Hapus semua daftar?")) {
        tasks = [];
        renderTasks();
    }
});