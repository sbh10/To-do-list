let taskList = document.getElementById("taskList");
let taskinput = document.getElementById("taskinput");

//AJOUTER UNE TACHE
function addTask() {
  let taskText = taskinput.value;
  if (taskText === "") {
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = taskText;

  //INSERER LE BOUTON '+' POUR AJOUTER UNE TACHE
  let editButton = document.createElement("button");
  editButton.innerHTML =
    '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
  editButton.onclick = function () {
    editTask(li);
  };

  //INSERER LE BOUTON POUR SUPPRIMER UNE TACHE
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML =
    '<ion-icon name="trash-outline" class="delete"></ion-icon>';
  deleteButton.onclick = function () {
    deleteTask(li);
  };

  //INSERER LE BOUTON POUR COCHER UNE TACHE
  let uncheckButton = document.createElement("button");
  uncheckButton.innerHTML =
    '<ion-icon name="square-outline" class="uncheck"></ion-icon>';
  uncheckButton.onclick = function () {
    toggleStrikethrough(li);
  };

  //POUR RELIER A LA LISTE PRINCIPALE
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  li.appendChild(uncheckButton);
  taskList.appendChild(li);

  taskinput.value = "";
  saveTasks();
}
//AJOUTER UNE TACHE EN TAPANT LA TOUCHE 'ENTREE" SUR LE CLAVIER
taskinput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

//FONCTION POUR MODIFIER UNE TACHE
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

//FONCTION POUR SUPPRIMER UNE TACHE
function deleteTask(task) {
  taskList.removeChild(task);
  saveTasks();
}

//FONCTION POUR RAYER UNE TACHE
function toggleStrikethrough(li) {
  if (li.style.textDecoration === "line-through") {
    li.style.textDecoration = "none";
  } else {
    li.style.textDecoration = "line-through";
  }
  saveTasks();
}

//FONCTION POUR ENREGISTRER UNE TACHE
function saveTasks() {
  let tasks = [];
  taskList.querySelectorAll("li").forEach(function (li) {
    tasks.push(li.textContent.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//FONCTION POUR MASQUER/DEMASQUER LES TACHES RAYEES
let tasksHidden = false;

function hideStrikethroughTasks() {
  const taskList = document.getElementById("taskList");
  const filteredTasksDiv = document.getElementById("filteredTasks");

  // Alterner entre masquage et affichage
  if (tasksHidden) {
    // Réafficher toutes les tâches
    taskList.querySelectorAll("li").forEach(function (li) {
      li.style.visibility = "visible";
    });
    // Réinitialiser le message
    filteredTasksDiv.innerHTML = "";
    tasksHidden = false;
  } else {
    // Masquer les tâches barrées
    let strikethroughTasks = [];
    taskList.querySelectorAll("li").forEach(function (li) {
      if (li.style.textDecoration === "line-through") {
        strikethroughTasks.push(li.textContent.trim());
        li.style.visibility = "hidden";
      }
    });

    tasksHidden = true;
  }
}

//FONCTION POUR TRIER LES TACHES PAR STATUT (rayée en haut/non-rayée en bas de liste)
function sortTasksByStrikethrough() {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.querySelectorAll("li"));

  // Trier les tâches en mettant celles avec 'line-through' à la fin
  tasks.sort((a, b) => {
    const aHasLineThrough = a.style.textDecoration === "line-through";
    const bHasLineThrough = b.style.textDecoration === "line-through";

    // Retourne 1 si a doit être après b, -1 sinon
    return aHasLineThrough - bHasLineThrough;
  });

  // Réorganiser les tâches dans le DOM en fonction de l'ordre trié
  tasks.forEach((task) => taskList.appendChild(task));
}

//FONCTION POUR CHANGER LA COULEUR DES ILLUSTRATIONS QUI INDIQUENT L'HUMEUR
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
