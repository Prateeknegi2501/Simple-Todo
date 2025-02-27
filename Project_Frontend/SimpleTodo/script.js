document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo_input");
  const addBtn = document.getElementById("add_task");
  const todoList = document.getElementById("todoList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || "";
  tasks.forEach((task) => renderTodo(task));

  addBtn.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;
    const newText = {
      id: Date.now(),
      text: todoText,
      isCompleted: false,
    };
    tasks.push(newText);
    saveTodo();
    renderTodo(newText);
    todoInput.value = "";
  });

  function renderTodo(task) {
    let li = document.createElement("li");
    li.setAttribute("todo-id", task.id);
    if (task.isCompleted === true) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("completed");
      saveTodo();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTodo();
    });
    todoList.appendChild(li);
  }

  function saveTodo() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
