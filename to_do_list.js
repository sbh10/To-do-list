let taskList = document.getElementById("taskList");
let taskinput = document.getElementById("taskinput");

//FONCTION POUR CREER LES BOUTONS DE MOFIFICATION DES TACHES
function createTaskElements(li) {
  //INSERER LE BOUTON POUR AJOUTER UNE TACHE
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
}

//AJOUTER UNE TACHE
function addTask() {
  let taskText = taskinput.value;
  if (taskText === "") {
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = taskText;

  createTaskElements(li);
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
  if (task.style.textDecoration === "line-through") {
    count--; // Ajuste le compteur si une tâche complétée est supprimée
  }
  taskList.removeChild(task);
  updateCounter();
  saveTasks();
}

//FONCTION POUR RAYER UNE TACHE
function toggleStrikethrough(li) {
  const isStrikethrough = li.style.textDecoration !== "line-through";
  {
    li.style.textDecoration = isStrikethrough ? "line-through" : "none";
  }
  // Met à jour le compteur en fonction de l'état barré
  count += isStrikethrough ? 1 : -1;
  updateCounter();
  saveTasks();
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

//FONCTION POUR COMPTER LE NOMBRE DE TACHES REALISEES
let count = 0;

function updateCounter() {
  document.getElementById("counter").textContent =
    "Bravo, tu as réalisé " +
    count +
    " tâche" +
    (count !== 1 ? "s" : "") +
    " !";
}

function toggleStrikethrough(li) {
  const isStrikethrough = li.style.textDecoration !== "line-through";

  // Appliquer ou retirer le style barré
  li.style.textDecoration = isStrikethrough ? "line-through" : "none";
  count += isStrikethrough ? 1 : -1;
  // Mettre à jour le compteur en fonction de l'état barré
  updateCounter(isStrikethrough);

  saveTasks();
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

//SAUVEGARDER DANS LOCAL STORAGE
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.style.textDecoration === "line-through",
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      li.style.textDecoration = task.completed ? "line-through" : "none";

      createTaskElements(li); // Crée les boutons pour la tâche
      taskList.appendChild(li);

      if (task.completed) {
        count++;
      }
    });
    updateCounter(); // Met à jour le compteur après le chargement
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});
