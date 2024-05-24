let ul = document.querySelector("ul");
let form = document.querySelector("form");
let input = document.querySelector("input");

// Initialize an array to store the to-do items
const todos = [];

// Create a function to render the to-do items on the page
const renderTodos = () => {
  ul.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerText = todo.text;
    li.className = "list-group-item rounded-0";

    // Create an edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "btn btn-success btn-sm m-2 rounded-0 float-end";
    li.appendChild(editBtn);

    // Create a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn btn-danger btn-sm rounded-0 m-2 float-end";
    li.appendChild(deleteBtn);

    // Add event listeners to the buttons
    editBtn.addEventListener("click", () => {
      // Toggle editing mode on the to-do item
      const isEditing = todo.isEditing;
      todo.isEditing =!isEditing;
      renderTodos();
    });

    deleteBtn.addEventListener("click", () => {
      // Remove the to-do item from the array
      todos.splice(index, 1);
      renderTodos();
    });

    // Check if the to-do item is in editing mode
    if (todo.isEditing) {
      // Add an input field to the li
      const input = document.createElement("input");
      input.value = todo.text;
      input.className = "form-control rounded-0 m-2";
      li.appendChild(input);

      // Add an update button to the li
      const updateBtn = document.createElement("button");
      updateBtn.innerText = "Update";
      updateBtn.className = "btn btn-primary btn-sm rounded-0 m-2 float-end";
      updateBtn.addEventListener("click", () => {
        // Update the text of the to-do item
        todo.text = input.value;
        todo.isEditing = false;
        renderTodos();
      });
      li.appendChild(updateBtn);
    }

    ul.appendChild(li);
  });
};

// Add event listeners to the form to handle adding to-dos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value;
  if (!text) return;
  todos.push({ text, isEditing: false });
  input.value = "";
  renderTodos();
});

// Render the initial to-dos
renderTodos();