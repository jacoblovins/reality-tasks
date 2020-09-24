/* eslint-disable prettier/prettier */
const taskForm = $("<form>");
taskForm.id = "taskForm";
const taskInput = $("<input>");
taskInput.id = "taskInput";
taskForm.append(taskInput);
const blockRow = $("<ul>");
taskForm.submit(handleFormSubmit);



function buildTable(tasks){
  blockRow.empty();
  console.log(tasks);
  
  for (let i = 0; i < tasks.length; i++) {
    const todoText = $("<li class='todo col-md-9' id=" + tasks[i].id + ">" + tasks[i].task_name + "</li>");
    const delBtn = $("<button class='col-md-1 btn delBtn d-flex justify-content-center align-items-center'><i class='fas fa-trash-alt'></i></button>");
    blockRow.append(todoText, delBtn);
    delBtn.click(deleteTask);
  }
  
  $(".container").append(taskForm, blockRow);
}


function getTodo() {
  // const tasks = [];
  $.get("/api/tasks").then((data) => { 
    console.log(data);
    // tasks.push(data);
    buildTable(data);
  });
}

function handleFormSubmit(event) {
  // event.preventDefault();
  console.log("submit");
  // Wont submit the post if we are missing a body, title, or author
  // Constructing a newPost object to hand to the database
  const newTask = {
    task_name: taskInput.val(),
    tasktype: "office"
  };
 
  submitPost(newTask);
  
}

function submitPost(task) {
  console.log(task);
  $.post("/api/tasks", task).then(getTodo());
}


function deleteTask() {
  console.log("delete");
  const currentTask = $(this).prev();
  console.log(currentTask[0].id);
  // If the text area is not empty confirm the user wants to delete the event
  if ($(this).siblings(".todo").val() !== "") {
    const ask = confirm("Are you sure you want to delete this event?");

    if (ask) {

      $.ajax({
        method: "DELETE",
        url: "/api/tasks/" + currentTask[0].id
      }).then(getTodo());

    } else {
      return;
    }
  } else {
    return;
  }
}


getTodo();