/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */

// Creat form, input, and unordered list elements for the iframe
const taskForm = $("<form>");
taskForm.id = "taskForm";
const taskInput = $("<input>");
taskInput.id = "taskInput";
taskForm.append(taskInput);
const blockRow = $("<ul>");
taskForm.submit(handleFormSubmit);
let MemberId;

// Create a list of tasks to display
function buildTable(tasks){
  blockRow.empty();
  
  for (let i = 0; i < tasks.length; i++) {
    const todoText = $("<li class='todo' id=" + tasks[i].id + ">" + tasks[i].task_name + "</li>");
    const delBtn = $("<button class='btn delBtn d-flex justify-content-center align-items-center'><i class='fas fa-trash-alt'></i></button>");
    blockRow.append(todoText, delBtn);
    delBtn.click(deleteTask);
  }
  $(".container").append(taskForm, blockRow);
}

// AJAX get requests to get all tasks based on the user and building and write them to the iframe
function getTodo() {
  $.get("/api/tasks/school").then((data) => { 
    buildTable(data);
  });

  $.get("/api/user_data").then((data) => { 
    MemberId = data.id;
  });
}

// Constructing a newTask object to hand to the database
function handleFormSubmit() {
  const newTask = {
    task_name: taskInput.val(),
    taskType: "school",
    MemberId: MemberId
  };
  submitPost(newTask);
}

// Post request when form is submitted
function submitPost(task) {
  $.post("/api/tasks", task).then(()=>{
    getTodo();
  });
}

// WHen delete button is clicked
function deleteTask() {
  const currentTask = $(this).prev();
  // Confirm the user wants to delete the event
  const ask = confirm("Are you sure you want to delete this event?");

  if (ask) {
    console.log(currentTask)
    $.ajax({
      method: "DELETE",
      url: "/api/tasks/" + currentTask[0].id
    }).then(getTodo());

  } else {
    return;
  }
}
getTodo();