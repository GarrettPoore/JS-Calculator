var last_action = "";
var working_value = null;
var last_value = null;
var working_operator = "";
var error = false;

function on_clear_clicked() {
  last_action = "";
  working_value = null;
  last_value = null;
  working_operator = "";
  error = false;
  $("#main_display").text("0");
  $("#sub_display").text("");
}

function on_clear_entry_clicked() {
  if (!error) {
    if (last_action == "calculate") {
      working_value = 0;
    }
    $("#main_display").text("0");
    last_action = "clear_entry";
  } else {
    on_clear_clicked();
  }
}

function on_calculate_clicked() {
  if (!error) {
    //Only calculate if there are 2 values to use
    if (working_value !== null) {
      if (last_action == "calculate" || last_action == "clear_entry") {
        //If calculate or clear entry were just used, then soft reset the sub display
        $("#sub_display").text(working_value + " " + working_operator + " " + last_value);
        working_value = calculate(last_value);
        if (working_value !== null) {
          $("#main_display").text(working_value);
        }
      } else {
        //Otherwise, the sub display will show the whole current expression
        var value = $("#main_display").text();
        working_value = calculate(value);
        if (working_value !== null) {
          $("#main_display").text(working_value);
          $("#sub_display").append(" " + value);
          last_value = value;
        }
      }
    }
    last_action = "calculate";
  }
}

function on_operator_clicked(operator) {
  if (!error) {
    //If the last action was an operator, then overwrite it
    if (last_action == "operator") {
      //Slice off the last character (the operator) and replace it
      var text = $("#sub_display").text().slice(0,-1);
      $("#sub_display").text(text + operator);
      working_operator = operator;
    } else if (last_action == "calculate") {
      //If calculate was just used, then that will soft reset the sub display
      var value = $("#main_display").text();
      $("#sub_display").text(value + " " + operator);
      working_operator = operator;
    } else {
      //Otherwise, move the current value in the main display into the working_value
      var value = $("#main_display").text();
      if (working_value === null) {
        //This will be for the very first number
        working_operator = operator;
        working_value = value;
        $("#sub_display").text(value + " " + operator);
      } else {
        //Otherwise if we're halfway through an operation, calculate what the new
        //value in the main_display should be
        working_value = calculate(value);
        working_operator = operator;
        if (working_value !== null) {
          //Calculate returns null on an error
          $("#main_display").text(working_value);
          $("#sub_display").append(" " + value + " " + operator);
        }
      }
    }
    last_action = "operator";
  }
}

function on_value_clicked(value) {
  if (!error) {
    //If the last action was a value then add the next number to the end of it
    if (last_action == "value") {
      var currentDisplay = $("#main_display").text();
      if (currentDisplay === "0") {
        if (value == ".") {
          value = "0.";
        }
        $("#main_display").text(value);
      } else {
        $("#main_display").append(value);
      }
    } else {
      //Otherwise, set the main display to the new number
      if (value == ".") {
        //Leading period should have a 0 in front of it
        value = "0."
      }
      $("#main_display").text(value);
    }
    last_action = "value";
  }
}

function calculate(value) {
  working_value = Number(working_value);
  value = Number(value);
  switch(working_operator) {
    case "+":
      return working_value + value;
    case "-":
      return working_value - value;
    case "*":
      return working_value * value;
    case "/":
      if (value !== 0) {
        return working_value / value;
      } else {
        $("#main_display").text("Cannot divide by 0");
        error = true;
        return null;
      }
  }
}
