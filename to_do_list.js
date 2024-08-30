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

function changeSlide() {
  "use strict";
  const slideTimeout = 5000;
  const prev = document.querySelector("#prev");
  const next = document.querySelector("#next");
  const $slides = document.querySelectorAll(".slide");
  let intervalId;
  let currentSlide = 1;

  function slideTo(index) {
    currentSlide = index >= $slides.length || index < 1 ? 0 : index;
    $slides.forEach(
      ($elt) => ($elt.style.transform = `translateX(-${currentSlide * 100}%)`)
    );
  }

  function showSlide() {
    slideTo(currentSlide);
    currentSlide++;
  }

  prev.addEventListener("click", () => slideTo(--currentSlide));
  next.addEventListener("click", () => slideTo(++currentSlide));
  intervalId = setInterval(showSlide, slideTimeout);

  $slides.forEach(($elt) => {
    let startX;
    let endX;

    $elt.addEventListener(
      "mouseover",
      () => {
        clearInterval(intervalId);
      },
      false
    );

    $elt.addEventListener(
      "mouseout",
      () => {
        intervalId = setInterval(showSlide, slideTimeout);
      },
      false
    );

    $elt.addEventListener("touchstart", (event) => {
      startX = event.touches[0].clientX;
    });

    $elt.addEventListener("touchend", (event) => {
      endX = event.changedTouches[0].clientX;
      if (startX > endX) {
        slideTo(currentSlide + 1);
      } else if (startX < endX) {
        slideTo(currentSlide - 1);
      }
    });
  });
}
changeSlide();

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
