let taskList = document.getElementById("taskList");
let taskinput = document.getElementById("taskinput");

function addTask() {
  let taskText = taskinput.value;
  if (taskText === "") {
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = taskText;

  let editButton = document.createElement("button");
  editButton.innerHTML =
    '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
  editButton.onclick = function () {
    editTask(li);
  };

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML =
    '<ion-icon name="trash-outline" class="delete"></ion-icon>';
  deleteButton.onclick = function () {
    deleteTask(li);
  };

  let uncheckButton = document.createElement("button");
  uncheckButton.innerHTML =
    '<ion-icon name="square-outline" class="uncheck"></ion-icon>';
  uncheckButton.onclick = function () {
    toggleStrikethrough(li);
  };

  li.appendChild(editButton);
  li.appendChild(deleteButton);
  li.appendChild(uncheckButton);
  taskList.appendChild(li);

  taskinput.value = "";
  saveTasks();
}

taskinput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function editTask(task) {
  let taskTextElement = task.firstChild;
  let taskText = taskTextElement.textContent;

  let newTaskText = prompt("Modifier la tâche :", taskText);

  if (newTaskText === null || newTaskText === "") {
    return;
  }

  taskTextElement.textContent = newTaskText;
  saveTasks();
}

function deleteTask(task) {
  taskList.removeChild(task);
  saveTasks();
}

function toggleStrikethrough(li) {
  if (li.style.textDecoration === "line-through") {
    li.style.textDecoration = "none";
  } else {
    li.style.textDecoration = "line-through";
  }
  saveTasks();
}

function saveTasks() {
  let tasks = [];
  taskList.querySelectorAll("li").forEach(function (li) {
    tasks.push(li.textContent.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterStrikethroughTasks() {
  let strikethroughTasks = [];

  taskList.querySelectorAll("li").forEach(function (li) {
    if (li.style.textDecoration === "line-through") {
      strikethroughTasks.push(li.textContent.trim());
    }
  });
  return strikethroughTasks;
}

function showStrikethroughTasks() {
  let filteredTasksDiv = document.getElementById("filteredTasks");
  let strikethroughTasks = filterStrikethroughTasks();

  // Effacer le contenu précédent
  filteredTasksDiv.innerHTML = "";

  if (strikethroughTasks.length === 0) {
    filteredTasksDiv.innerHTML = "<p>Il faut s'y mettre !</p>";
  } else {
    let ul = document.createElement("ul");
    strikethroughTasks.forEach(function (task) {
      let li = document.createElement("li");
      li.textContent = task;
      ul.appendChild(li);
    });
    filteredTasksDiv.appendChild(ul);
  }
}

function filterNonStrikethroughTasks() {
  let nonStrikethroughTasks = [];

  taskList.querySelectorAll("li").forEach(function (li) {
    if (li.style.textDecoration !== "line-through") {
      nonStrikethroughTasks.push(li.textContent.trim());
    }
  });

  return nonStrikethroughTasks;
}

// Nouvelle fonction pour afficher les tâches non barrées
function showNonStrikethroughTasks() {
  let filteredTasksDiv = document.getElementById("filteredTasks");
  let nonStrikethroughTasks = filterNonStrikethroughTasks();

  // Effacer le contenu précédent
  filteredTasksDiv.innerHTML = "";

  if (nonStrikethroughTasks.length === 0) {
    filteredTasksDiv.innerHTML = "<p>Bravo ! Tu as tout fait.</p>";
  } else {
    let ul = document.createElement("ul");
    nonStrikethroughTasks.forEach(function (task) {
      let li = document.createElement("li");
      li.textContent = task;
      ul.appendChild(li);
    });
    filteredTasksDiv.appendChild(ul);
  }
}

function changeColor(idButton, color) {
  const button = document.getElementById(idButton);
  if (button.style.backgroundColor === "transparent") {
    button.style.backgroundColor = color;
  } else {
    button.style.backgroundColor = "transparent";
  }
}

//CI-DESSOUS EST A GARDER EN COMM JUSQU'\A COMPRENDRE LOCAL STORAGE

// function loadTasks() {
//   const tasks = localStorage.getItem("tasks");
//   return tasks ? JSON.parse(tasks) : [];
// }

// function displayTasks(tasks) {
//    const displayedTasks = JSON.parse(localStorage.getItem("tasks"));
//     if (displayedTasks) {
//     tasks.forEach(dispTask => addTask(dispTask));
//     }
// }
//     document.addEventListener('DOMContentLoaded', loadTasks);

//     loadTasks();
//     //displayTasks();

//CI-DESSOUS EST A GARDER JUSQu'a COMPRENDRE DRAGGABLE
// let draggableElement = document.addEventListener('DOMContentLoaded', function () {
//     const draggableElement = document.querySelector('taskinput')

//     let isDragging = false;
//     let offsetY = 0;

//     draggableElement.addEventListener('mousedown', (event) => {
//         isDragging = true;
//         offsetY = e.clientY - draggableElement.getBoundingClientRect().top;
//         draggableElement.style.cursor = 'grabbing';

//     });

//     document.addEventListener('mousemove', (event) => {
//         if (isDragging) {
//             draggableElement.style.top = `${e.clientY - offsetY}px`;
//         }
//     });

//     document.addEventListener('mouseup', () => {
//         isDragging = false;
//         draggableElement.style.cursor = 'grab';
//     });
//     saveTasks()
// });
