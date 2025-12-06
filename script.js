document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // false prevents saving again
  }

  function addTask(taskText = null, save = true) {
    if (taskText === null) {
      taskText = taskInput.value.trim();
    }

    if (taskText === "") {
      if (taskInput.value.trim() === "") {
        alert("Please enter a task");
      }
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    removeBtn.onclick = function () {
      taskList.removeChild(li);
      removeFromLocalStorage(taskText);
    };

    li.appendChild(removeBtn);

    taskList.appendChild(li);

    if (taskInput.value.trim() !== "") taskInput.value = "";

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  function removeFromLocalStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  addButton.addEventListener("click", () => addTask());

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  loadTasks();
});
