//TODO handle divide by 0 more (null checks to stop anything from working)

function on_clear_clicked() {
  console.log("Clear clicked");
}

function on_clear_entry_clicked() {
  console.log("Clear Entry clicked");
}

function on_calculate_clicked() {
  console.log("Calculate clicked");
  last_action = "calculate";
}

function on_operator_clicked(event) {
  var operator = event.target.value;
  console.log(operator + " clicked");
  if (last_action == "operator") {
    //TODO - Trim last char from sub display and replace it
  } else {
    var value = $("#main_display").text();
    if (working_value === 0) {
      working_operator = operator;
      working_value = value;
      $("#sub_display").text(value + " " + operator);
    } else {
      working_value = calculate(value);
      working_operator = operator;
      if (working_value !== null) {
        $("#main_display").text(working_value);
        $("#sub_display").append(" " + value + " " + operator);
      }
    }
  } 
  last_action = "operator";
}

function on_value_clicked(event) {
  var val = event.target.value;
  console.log(val + " clicked");
  if (last_action == "value") {
    $("#main_display").append(val);
  } else {
    $("#main_display").text(val);
  }
  last_action = "value";
}
