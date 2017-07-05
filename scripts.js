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
    on_operator_clicked(event.target.value);
  });

  $(".value").click(function(event){
    on_value_clicked(event.target.value);
  });

  $(document).keypress(function(event){
    console.log(event);
    var key = event.which;
    switch (key) {
      case 13:
        //Enter
        on_calculate_clicked();
        break;
      case 42:
        //Asterisk
        on_operator_clicked("*");
        break;
      case 43:
        //Plus
        on_operator_clicked("+");
        break;
      case 45:
        //Hyphen
        on_operator_clicked("-");
        break;
      case 46:
        //Period
        on_value_clicked(".");
        break;
      case 47:
        //Forward Slash
        on_operator_clicked("/");
        break;
      default:
      //0-9 are 48-57
      var num = key - 48;
      if (num >= 0 && num <= 9) {
        on_value_clicked(num);
      }
    }
  });

  //Other values used above are not uniform across different platforms in keydown
  $(document).keydown(function(event){
    switch (event.which) {
      case 8:
        //Backspace
        //TODO - 1+1, enter, bs, anything else, enter, gets weird results
        if (last_action != "calculate" && last_action != "operator") {
          var text = $("#main_display").text();
          if (text !== "0"){
            if (text.length > 1) {
              text = text.slice(0,-1);
              $("#main_display").text(text);
            } else {
              $("#main_display").text("0");
            }
          }
        }
        break;
      case 46:
        //Delete
        if (last_action == "calculate"){
          on_clear_clicked();
        } else {
          on_clear_entry_clicked();
        }
        break;
    }
  });
});
