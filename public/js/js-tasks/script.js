//global variables
const dayDiv = $("#currentDay");
const dayContainer = $(".container");
const currentHour = parseInt(moment().format("H"));

$(document).ready(() => {
  // show date in header
  dayDiv.text(moment().format("dddd, MMMM Do YYYY"));

  getTodo();

  //  for loop to build table from row
  function buildTable(data) {
    for (let i = 8; i <= 17; i++) {
      buildRow(i);
    }
  }

  // building a row for each hour
  function buildRow(hour) {
    // variables
    const timeObj = moment(hour, "H");
    const parent = $("<div class='row time-block'>");
    let timeClass = "past";

    // assigning colors to each row to signify past, present, or future
    if (currentHour === hour) {
      timeClass = "present";
    } else if (currentHour < hour) {
      timeClass = "future";
    }
    // time div
    const time = $("<div class='hour col-1'>");
    time.text(timeObj.format("h A"));

    //textarea
    const textarea = $("<textarea id='user-input' class='description col-10'>");
    textarea.addClass(timeClass);
    textarea.attr("data-value", hour);

    // creating save button
    const saveBtn = $("<button class='saveBtn col-1'>");
    saveBtn.text("SAVE");

    // setting divs to parent containers
    parent.append(time, textarea, saveBtn);
    dayContainer.append(parent);

    // save
    saveBtn.on("click", saveData);
  }

  function saveData() {
    const event = $(this)
      .prev()
      .val();
    const hour = $(this)
      .prev()
      .attr("data-value");

    $.post("/api/todo", {
      hour,
      event
    }).then(getTodo);
  }

  function getTodo() {
    $.get("/api/todo").then(buildTable);
  }
});
