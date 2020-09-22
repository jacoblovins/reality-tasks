const hourString = moment().format("H");
const hourNum = parseInt(hourString);

// Add current date to the top of the page
$("#currentDay").text(moment().format("dddd, MMM Do"));

// Get hour and am or pm for time block label
function hourLabel(i) {
  let timeOfDay = "";
  if (i < 12) {
    timeOfDay = i + "am";
  } else if (i > 12) {
    timeOfDay = i - 12 + "pm";
  } else {
    timeOfDay = i + "pm";
  }
  return timeOfDay;
}

// Set time blocks
for (let i = 9; i <= 17; i++) {
  const blockRow = $("<div class='row'>");
  const hour = $("<div class='col-md-1 hour'>" + hourLabel(i) + "</div>");
  const todoText = $(
    "<textarea class='todo col-md-9' id=' + i + '></textarea>"
  );
  const delBtn = $(
    "<button class='col-md-1 btn delBtn d-flex justify-content-center align-items-center'><i class='fas fa-trash-alt'></i></button>"
  );
  const saveBtn = $(
    "<button class='col-md-1 btn saveBtn d-flex justify-content-center align-items-center'><i class='fas fa-save'></i></button>"
  );
  blockRow.append(hour, todoText, delBtn, saveBtn);
  $(".container").append(blockRow);
  hourLabel(i);
  saveTodos();
}

// Compare the current hour with each of the timeblock's hours
$(".col-md-9").each(function() {
  const dataTime = $(this).attr("id");
  const dataNum = parseInt(dataTime);

  // assign colors based on time
  if (hourNum < dataNum) {
    $(this).addClass("future");
  } else if (hourNum === dataNum) {
    $(this).addClass("present");
  } else {
    $(this).addClass("past");
  }
});

//Retrieving events from local storage
function saveTodos() {
  $(".todo").each(function() {
    const inputId = $(this).attr("id");
    $(this).val(localStorage.getItem(inputId));
  });
}

//Saving events into local storage
$(".saveBtn").click(function() {
  const scheduleInputs = $(this)
    .siblings(".todo")
    .val();
  const inputsLocation = $(this)
    .siblings(".todo")
    .attr("id");
  localStorage.setItem(inputsLocation, scheduleInputs);
});

// Delete events from textarea and localstorage individually
$(".delBtn").click(function() {
  // If the text area is not empty confirm the user wants to delete the event
  if (
    $(this)
      .siblings(".todo")
      .val() !== ""
  ) {
    const ask = confirm("Are you sure you want to delete this event?");

    // If user confirms, clear text area and clear item from local storage
    if (ask) {
      $(this)
        .siblings(".todo")
        .val("");
      localStorage.removeItem(
        $(this)
          .siblings(".todo")
          .attr("id")
      );
    } else {
      return;
    }
  } else {
    return;
  }
});
