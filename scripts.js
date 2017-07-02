var last_action = "";
var working_value = 0;
var working_operator = "";

$(document).ready(function(){
  $("#clear").click(function(){
    on_clear_clicked();
  });

  $("#clear_entry").click(function(){
    on_clear_entry_clicked();
  });

  $("#calculate").click(function(){
    on_calculate_clicked();
  });

  $(".operator").click(function(event){
    on_operator_clicked(event);
  });

  $(".value").click(function(event){
    on_value_clicked(event);
  });
});

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
        return null;
      }
  }
}
